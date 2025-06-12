import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitestGlobals from "eslint-plugin-vitest-globals";

export default [
  {
    ignores: ['**/dist', '**/eslint.config.js', '**/vite.config.js'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...vitestGlobals.environments.env.globals,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'max-len': [1, 120, 2, { 'ignoreComments': true }],
      'no-console': 'off',
      quotes: ['error', 'single', {
        allowTemplateLiterals: true,
        avoidEscape: true,
      }],
      'camelcase': ['error', { 'properties': 'always' }],
      'semi': ['warn', 'always'],
      'comma-dangle': ['warn', 'only-multiline'],
      'dot-notation': 'warn',
      'space-before-function-paren': 'off',
      'indent': ['warn', 2],
      'no-trailing-spaces': 'warn',
      'array-bracket-spacing': 'warn',
      'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
      'padded-blocks': ['error', 'never'],
      'no-var': 'error',
    },
  },
]
