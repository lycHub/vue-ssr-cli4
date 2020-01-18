const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const staticCache = require('koa-static-cache');
const proxy = require('koa-server-http-proxy')
const app = new Koa()
const testRoute = require('./routers/test-api')

app.keys = ['vue ssr tech']
const isDev = process.env.NODE_ENV === 'development'

// 挂载静态资源
app.use(staticCache(path.join(__dirname, '../dist'), {
  prefix: '/dist'
}));


/*app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await Send(ctx, ctx.path, {root: path.join(__dirname,'../public/')})
  } else {
    await next()
  }
});*/

// 代理所有前端请求
app.use(proxy('/api', {
  target: 'https://m.zuzuche.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

app.use(koaBody())

let pageRouter;

if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/prod-ssr')
  // pageRouter = require('./routers/ssr-no-bundle')
}

app.use(testRoute.routes()).use(testRoute.allowedMethods())
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())


app.on('error', (err, ctx) => {
  console.error('server error', err);
  ctx.throw(500, ctx.path + '：请求错误');
  if (isDev) {
    ctx.body = err.message
  } else {
    ctx.body = 'please try again later'
  }
});


const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
});
