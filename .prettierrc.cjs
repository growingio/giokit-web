module.exports = {
  plugins: ['./node_modules/prettier-plugin-svelte'],
  arrowParens: 'always',
  endOfLine: 'auto',
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.svelte',
      options: { parser: 'svelte' }
    }
  ]
};
