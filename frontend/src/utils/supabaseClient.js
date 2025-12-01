import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Please create a .env file with:')
  console.error('VITE_SUPABASE_URL=your_supabase_url')
  console.error('VITE_SUPABASE_ANON_KEY=your_anon_key')
  throw new Error('Missing Supabase configuration. See console for details.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Store session in localStorage (default)
    storage: window.localStorage,
    // Automatically refresh session before expiry
    autoRefreshToken: true,
    // Persist session across browser sessions
    persistSession: true,
    // Detect session changes across tabs
    detectSessionInUrl: true,
  },
})

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Helper function to get user profile
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

// Helper function to update user profile
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Helper function to record login
export const recordLogin = async (userId, metadata = {}) => {
  try {
    // Update last login time
    await supabase
      .from('user_profiles')
      .update({
        last_login_at: new Date().toISOString(),
        failed_attempts: 0,
        locked_until: null,
      })
      .eq('id', userId)

    // Log the event in audit log
    await supabase
      .from('audit_log')
      .insert({
        user_id: userId,
        event_type: 'login_success',
        ip_address: metadata.ip_address || null,
        user_agent: metadata.user_agent || navigator.userAgent,
      })
  } catch (error) {
    console.error('Error recording login:', error)
    // Don't throw - this is non-critical
  }
}

// Helper function to get full user data (auth user + profile)
export const getFullUserData = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError) throw authError
  if (!user) return null

  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error('Error fetching profile:', profileError)
    // Return user without profile if profile fetch fails
    return {
      id: user.id,
      email: user.email,
      email_verified: user.email_confirmed_at !== null,
      created_at: user.created_at,
    }
  }

  // Combine auth user with profile
  return {
    id: user.id,
    email: user.email,
    email_verified: user.email_confirmed_at !== null,
    phone: user.phone,
    created_at: user.created_at,
    ...profile,
  }
}

export default supabase
