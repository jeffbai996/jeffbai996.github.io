-- =====================================================
-- PrayaPass Authentication System - Supabase Schema
-- =====================================================
--
-- This SQL creates the extended user profile table and
-- security policies for the PrayaPass authentication system.
--
-- Run this in your Supabase SQL Editor after creating a project.
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- User Profiles Table
-- =====================================================
-- Extends auth.users with PrayaPass-specific fields
-- This table is automatically populated when a user signs up

CREATE TABLE IF NOT EXISTS public.user_profiles (
  -- Primary key (matches auth.users.id)
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Basic Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  avatar_url TEXT,

  -- PrayaPass Specific Fields
  nric_number TEXT UNIQUE,
  identity_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,

  -- 2FA Settings
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_method TEXT DEFAULT 'EMAIL_OTP' CHECK (
    two_factor_method IN ('EMAIL_OTP', 'SMS_OTP', 'TOTP', 'FACE_VERIFICATION')
  ),
  phone_verified BOOLEAN DEFAULT FALSE,

  -- Face Recognition (for future enhancement)
  face_enrolled BOOLEAN DEFAULT FALSE,
  face_enrolled_at TIMESTAMPTZ,

  -- Account Status
  role TEXT DEFAULT 'CITIZEN' CHECK (
    role IN ('CITIZEN', 'ADMIN', 'STAFF', 'VERIFIED_CITIZEN')
  ),

  -- Security
  failed_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Indexes for Performance
-- =====================================================

-- Index on email (for faster lookups)
CREATE INDEX IF NOT EXISTS idx_user_profiles_nric ON public.user_profiles(nric_number);

-- Index on role (for filtering by user type)
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);

-- Index on created_at (for sorting by registration date)
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at DESC);

-- =====================================================
-- Automatic Profile Creation Trigger
-- =====================================================
-- Automatically creates a user_profile when a new user signs up

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id,
    first_name,
    last_name,
    phone,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists (for re-running this script)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- Automatic Updated At Trigger
-- =====================================================
-- Updates the updated_at timestamp whenever a row is modified

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_user_profile_updated ON public.user_profiles;

CREATE TRIGGER on_user_profile_updated
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================
-- Users can only access their own data

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Service role can do anything (for admin operations)
CREATE POLICY "Service role has full access"
  ON public.user_profiles
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- =====================================================
-- Session Management (Optional)
-- =====================================================
-- Track active sessions for additional security

CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Session Information
  device_id TEXT,
  ip_address INET,
  user_agent TEXT,

  -- Session Status
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster session lookups
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON public.user_sessions(user_id, revoked_at)
  WHERE revoked_at IS NULL;

-- RLS for sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON public.user_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can revoke own sessions"
  ON public.user_sessions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- Audit Log (Optional)
-- =====================================================
-- Track important authentication events

CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Event Information
  event_type TEXT NOT NULL CHECK (
    event_type IN (
      'user_registered',
      'user_verified',
      'login_success',
      'login_failed',
      'password_changed',
      'password_reset_requested',
      '2fa_enabled',
      '2fa_disabled',
      'profile_updated',
      'account_locked',
      'session_revoked'
    )
  ),
  event_details JSONB,

  -- Context
  ip_address INET,
  user_agent TEXT,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for audit log queries
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_event_type ON public.audit_log(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);

-- RLS for audit log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own audit log"
  ON public.audit_log
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert audit logs"
  ON public.audit_log
  FOR INSERT
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- =====================================================
-- Helper Functions
-- =====================================================

-- Function to get user's full profile (auth.users + user_profiles)
CREATE OR REPLACE FUNCTION public.get_user_profile(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'id', u.id,
    'email', u.email,
    'first_name', up.first_name,
    'last_name', up.last_name,
    'phone', up.phone,
    'date_of_birth', up.date_of_birth,
    'address', up.address,
    'avatar_url', up.avatar_url,
    'nric_number', up.nric_number,
    'identity_verified', up.identity_verified,
    'verified_at', up.verified_at,
    'two_factor_enabled', up.two_factor_enabled,
    'two_factor_method', up.two_factor_method,
    'phone_verified', up.phone_verified,
    'face_enrolled', up.face_enrolled,
    'role', up.role,
    'last_login_at', up.last_login_at,
    'created_at', u.created_at
  ) INTO result
  FROM auth.users u
  LEFT JOIN public.user_profiles up ON u.id = up.id
  WHERE u.id = user_uuid;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to record login
CREATE OR REPLACE FUNCTION public.record_login(
  user_uuid UUID,
  ip INET DEFAULT NULL,
  agent TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Update last login time
  UPDATE public.user_profiles
  SET last_login_at = NOW(),
      failed_attempts = 0,
      locked_until = NULL
  WHERE id = user_uuid;

  -- Log the event
  INSERT INTO public.audit_log (user_id, event_type, ip_address, user_agent)
  VALUES (user_uuid, 'login_success', ip, agent);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to record failed login
CREATE OR REPLACE FUNCTION public.record_failed_login(
  user_uuid UUID,
  ip INET DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  attempts INTEGER;
BEGIN
  -- Increment failed attempts
  UPDATE public.user_profiles
  SET failed_attempts = failed_attempts + 1
  WHERE id = user_uuid
  RETURNING failed_attempts INTO attempts;

  -- Lock account after 5 failed attempts
  IF attempts >= 5 THEN
    UPDATE public.user_profiles
    SET locked_until = NOW() + INTERVAL '30 minutes'
    WHERE id = user_uuid;

    INSERT INTO public.audit_log (user_id, event_type, ip_address)
    VALUES (user_uuid, 'account_locked', ip);
  END IF;

  -- Log the failed attempt
  INSERT INTO public.audit_log (user_id, event_type, ip_address)
  VALUES (user_uuid, 'login_failed', ip);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Grant Permissions
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant access to tables
GRANT SELECT, UPDATE ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_sessions TO authenticated;
GRANT UPDATE ON public.user_sessions TO authenticated;
GRANT SELECT ON public.audit_log TO authenticated;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION public.get_user_profile TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_login TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_failed_login TO authenticated;

-- =====================================================
-- Success Message
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'PrayaPass Schema Created Successfully!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables created:';
  RAISE NOTICE '  ✓ public.user_profiles';
  RAISE NOTICE '  ✓ public.user_sessions';
  RAISE NOTICE '  ✓ public.audit_log';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Configure Authentication settings in Supabase dashboard';
  RAISE NOTICE '  2. Update your frontend .env file with Supabase credentials';
  RAISE NOTICE '  3. Test user registration and login';
  RAISE NOTICE '';
  RAISE NOTICE 'For help, see: SUPABASE_MIGRATION_GUIDE.md';
  RAISE NOTICE '========================================';
END $$;
