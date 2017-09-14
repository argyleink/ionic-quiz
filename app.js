const htmlStandards   = require('reshape-standard')
const cssStandards    = require('spike-css-standards')
const jsStandards     = require('babel-preset-latest')
const pageId          = require('spike-page-id')
const sugarml         = require('sugarml')
const sugarss         = require('sugarss')
const env             = process.env.SPIKE_ENV

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  reshape: htmlStandards({
    parser: sugarml,
    minify: env === 'production'
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: {
    presets: [
      ["env", {
        targets: {
          browsers: ["chrome > 55"]
        }
      }]
    ]
  }
}
