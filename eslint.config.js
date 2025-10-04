import { defineConfig } from 'eslint/config';
import stylish from 'eslint-config-stylish';
import stylishReact from 'eslint-config-stylish/react';
import stylishReactHooks from 'eslint-config-stylish/react-hooks';
import stylishTypeScript from 'eslint-config-stylish/typescript';
import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';
import storybook from 'eslint-plugin-storybook';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig(
  {
    ignores: ['dist', '!.storybook', '*.config.[jt]s', '*.config.m[jt]s'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    extends: [stylish],
    rules: {
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,tsx}'],
    extends: [stylishReact, stylishReactHooks],
  },
  {
    files: ['**/use*.ts'],
    extends: [stylishReactHooks],
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.storybook.json'],
      },
    },
    extends: [stylishTypeScript],
  },
  {
    files: ['.storybook/**/*.ts'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...testingLibrary.configs['flat/react'],
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...vitest.configs.recommended,
  },
  storybook.configs['flat/recommended'],
  eslintConfigPrettier,
);
