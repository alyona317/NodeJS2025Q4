// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {

    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
    },
  },
  {

    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {

    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.config.js'],
  },
);
