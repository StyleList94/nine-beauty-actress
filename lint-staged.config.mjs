/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['oxfmt --write', 'oxlint --fix'],
  '*.{json,md,yml,yaml,css}': 'oxfmt --write',
};
