const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
/*const apiPrefix = ['/app_v3', '/w'];
const proxy = {};
apiPrefix.forEach(item => {
  proxy[item] = {
    target: 'https://m.zuzuche.com',
    changeOrigin: true
  }
});*/
const config = {
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    /*historyApiFallback: {
      rewrites: [
        { from: /.*!/, to: path.posix.join('/', 'index.html') },
      ],
    },*/
    port: 4200,
    proxy: {
      '/api': {
        target: 'https://m.zuzuche.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
module.exports = merge(baseConfig, config);
// module.exports = Object.assign({}, baseConfig, config);
