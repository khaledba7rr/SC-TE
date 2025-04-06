module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Since React 17 JSX transform doesn't require React to be in scope
    '@typescript-eslint/no-unused-vars': ['error'],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
  },
}
