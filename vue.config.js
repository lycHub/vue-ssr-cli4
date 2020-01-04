const LessFunc = require('less-plugin-functions');
const apiPrefix = ['/app_v3', '/w'];
const proxy = {};
apiPrefix.forEach(item => {
  proxy[item] = {
    target: 'https://m.zuzuche.com',
    changeOrigin: true
  }
});
module.exports = {
  devServer: {
    port: 4200,
    proxy
  },
  css: {
    loaderOptions: {
      less: {
        plugins: [new LessFunc()]
      }
    }
  }
}