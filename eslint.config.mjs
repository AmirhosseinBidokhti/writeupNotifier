import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{mjs,cjs,ts}'] },
  {
    ignores: ['**/dev/*', '**/dist/*', '**/tests/*', 'tsconfig.json', 'dist', '*config*']
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
