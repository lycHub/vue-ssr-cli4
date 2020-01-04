const baseConfig = require('./webpack.config.base');
const path = require('path');
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const webpack = require('webpack')
const config = {
  // publicPath: 'http://127.0.0.1:4200/',
  outputDir: 'server-build',
  configureWebpack: {
    devtool: 'source-map',
    target: 'node',
    entry: path.join(__dirname, `../src/server-entry.js`),
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server-entry.js'
    },
    externals: Object.keys(require('../package.json').dependencies),
    optimization: {
      splitChunks: false
    },
    plugins: [
      new VueServerPlugin()
    ]
  }
}
// module.exports = merge(baseConfig, config);
module.exports = Object.assign({}, baseConfig, config);