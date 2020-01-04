const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')
const serverConfig = require('@vue/cli-service/webpack.config')
// const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs
let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})


const handleSSR = async ctx => {
  console.log('bundle');
  if (!bundle) {
    ctx.body = '你等一会，别着急......'
    return
  }

  const clientBoundle = await axios.get('http://127.0.0.1:4200/vue-ssr-client-manifest.json')
  const clientManifest = clientBoundle.data
  const template = fs.readFileSync(path.join(__dirname, '../ssr-template.ejs'), 'utf-8')

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,    // 关闭自动注入
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
// router.use(historyApiFallback({ whiteList: ['/app_v3', '/w'] }));
router.get('*', handleSSR)

module.exports = router
