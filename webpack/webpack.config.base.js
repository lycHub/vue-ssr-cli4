const LessFunc = require('less-plugin-functions');
const merge = require('lodash.merge');
module.exports = {
  css: {
    loaderOptions: {
      less: {
        plugins: [new LessFunc()]
      }
    }
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