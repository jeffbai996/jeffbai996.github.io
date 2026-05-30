import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        React: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^(React|[A-Z][A-Za-z0-9]*)$',
      }],
      'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
