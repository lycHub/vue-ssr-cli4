const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')
const path = require('path');
const VueServerPlugin = require('vue-server-renderer/server-plugin')


const config = {
  outputDir: 'server-build',
  configureWebpack: {
    devtool: 'source-map',
    target: 'node',
    entry: path.join(__dirname, `../src/server-entry.js`),
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server-entry.js'
    },
    // externals: Object.keys(require('../package.json').dependencies),
    externals: nodeExternals({
      whitelist: /\.css$/
    }),
    optimization: {
      splitChunks: false
    },
    plugins: [
      new VueServerPlugin()
    ]
  }
}
module.exports = merge(baseConfig, config);