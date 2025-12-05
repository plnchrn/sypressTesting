import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals'; // Импортируем пакет globals

export default [
  {
    ignores: [
        'dist/**/*',
      'src/ston/ton.js'
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        ...globals.node, // Используем globals.node вместо tseslint.environments.node
        ...globals.browser, // Используем globals.browser вместо tseslint.environments.browser
        ...globals.es2021, // Современные возможности ES2021
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      // 'import/no-duplicates': 'off',
      // '@typescript-eslint/no-namespace': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];