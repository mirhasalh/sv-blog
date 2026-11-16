/** @type {import("prettier").Config} */
const config = {
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  singleAttributePerLine: false,
  bracketSameLine: false,
  printWidth: 250,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: false,
  tabWidth: 2,
  embeddedLanguageFormatting: 'auto',
  vueIndentScriptAndStyle: false,
  parser: 'babel',
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte'
      }
    }
  ],
  tailwindStylesheet: './src/routes/layout.css'
}

export default config
