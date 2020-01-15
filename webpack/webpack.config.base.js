const LessFunc = require('less-plugin-functions');
const merge = require('webpack-merge');
const path = require('path');
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: isDev ? 'http://127.0.0.1:4200/' : '/dist/',
  css: {
    extract: !isDev,
    loaderOptions: {
      less: {
        plugins: [new LessFunc()]
      }
    }
  },
  configureWebpack: {
    entry: path.join(__dirname, `../src/client-entry.js`),
    plugins: [
      /* new webpack.DefinePlugin({
         'process.env.VUE_ENV': '"client"'
       }),*/
      new VueClientPlugin()
    ]
  },
  chainWebpack(config) {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return merge(options, {
          optimizeSSR: false,
          hotReload: false
        })
      })

    // fix ssr hot update bug
    config.plugins.delete("hmr");
  }
}
