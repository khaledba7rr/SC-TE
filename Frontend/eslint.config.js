import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json', // required for type-aware linting
      },
      globals: globals.browser,
    },
  },
];
