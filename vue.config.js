const clientConfig = require('./webpack/webpack.config.client')
const serverConfig = require('./webpack/webpack.config.server')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
console.log('TARGET_NODE', TARGET_NODE);
// const isDev = process.env.NODE_ENV === 'development'
module.exports = TARGET_NODE ? serverConfig : clientConfig