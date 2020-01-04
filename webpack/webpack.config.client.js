// const merge = require('lodash.merge');
// const webpack = require('webpack')
const baseConfig = require('./webpack.config.base');
const path = require('path');
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const apiPrefix = ['/app_v3', '/w'];
const proxy = {};
apiPrefix.forEach(item => {
  proxy[item] = {
    target: 'https://m.zuzuche.com',
    changeOrigin: true
  }
});
const config = {
  publicPath: 'http://127.0.0.1:4200/',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    /*historyApiFallback: {
      rewrites: [
        { from: /.*!/, to: path.posix.join('/', 'index.html') },
      ],
    },*/
    port: 4200,
    proxy
  },
  configureWebpack: {
    entry: path.join(__dirname, `../src/client-entry.js`),
    plugins: [
     /* new webpack.DefinePlugin({
        'process.env.VUE_ENV': '"client"'
      }),*/
      new VueClientPlugin()
    ]
  }
}
module.exports = Object.assign({}, baseConfig, config);