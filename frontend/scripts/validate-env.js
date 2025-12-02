#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Ensures all required secrets are set before building
 * Prevents builds with missing or placeholder values
 */

const requiredEnvVars = {
  VITE_GEMINI_API_KEY: {
    required: true,
    description: 'Google Gemini API Key',
    invalidValues: ['your_api_key_here', 'undefined', '']
  },
  VITE_SUPABASE_URL: {
    required: true,
    description: 'Supabase Project URL',
    invalidValues: ['https://YOUR_PROJECT_ID.supabase.co', 'undefined', ''],
    pattern: /^https:\/\/[a-z0-9]+\.supabase\.co$/
  },
  VITE_SUPABASE_ANON_KEY: {
    required: true,
    description: 'Supabase Anonymous Key',
    invalidValues: ['your_anon_key_here', 'undefined', '']
  },
  VITE_GEMINI_ENABLED: {
    required: false,
    description: 'Enable Gemini AI features',
    validValues: ['true', 'false']
  }
};

let errors = [];
let warnings = [];

console.log('🔍 Validating environment variables...\n');

for (const [varName, config] of Object.entries(requiredEnvVars)) {
  const value = process.env[varName];

  // Check if required variable is missing
  if (config.required && !value) {
    errors.push(`❌ ${varName} is required but not set`);
    console.error(`❌ ${varName} is NOT SET`);
    console.error(`   Description: ${config.description}`);
    continue;
  }

  // Check if value is a placeholder/invalid
  if (value && config.invalidValues && config.invalidValues.includes(value)) {
    errors.push(`❌ ${varName} has an invalid placeholder value: "${value}"`);
    console.error(`❌ ${varName} has INVALID VALUE`);
    console.error(`   Current: "${value}"`);
    console.error(`   Description: ${config.description}`);
    continue;
  }

  // Check pattern matching
  if (value && config.pattern && !config.pattern.test(value)) {
    errors.push(`❌ ${varName} does not match expected pattern`);
    console.error(`❌ ${varName} does not match expected pattern`);
    console.error(`   Description: ${config.description}`);
    continue;
  }

  // Check valid values
  if (value && config.validValues && !config.validValues.includes(value)) {
    warnings.push(`⚠️  ${varName} has unexpected value: "${value}"`);
    console.warn(`⚠️  ${varName} has unexpected value`);
    console.warn(`   Current: "${value}"`);
    console.warn(`   Expected: ${config.validValues.join(', ')}`);
    continue;
  }

  // Variable is OK
  console.log(`✅ ${varName} is SET`);
}

console.log('');

// Print summary
if (errors.length > 0) {
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('❌ VALIDATION FAILED');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('\nThe following environment variables are missing or invalid:\n');
  errors.forEach(error => console.error(`  ${error}`));
  console.error('\n⚠️  BUILD CANNOT CONTINUE\n');
  console.error('To fix this:');
  console.error('1. Ensure GitHub Secrets are set in repository settings');
  console.error('2. For local development, copy .env.example to .env and fill in values');
  console.error('3. Never commit .env files to Git\n');
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.warn('⚠️  WARNINGS');
  console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.warn('\nThe following warnings were detected:\n');
  warnings.forEach(warning => console.warn(`  ${warning}`));
  console.warn('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ VALIDATION PASSED');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('All required environment variables are set correctly.');
console.log('Proceeding with build...\n');

process.exit(0);
