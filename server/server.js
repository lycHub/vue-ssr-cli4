const path = require('path')
const Koa = require('koa')
const Send = require('koa-send')
const koaBody = require('koa-body')
// const koaStatic = require("koa-static");
// const koaMount = require('koa-mount')
const app = new Koa()
// const resolve = file => path.resolve(__dirname, file);
app.keys = ['vue ssr tech']
const isDev = process.env.NODE_ENV === 'development'
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
});

app.use(async (ctx, next) => {
  if (ctx.path.includes('.')) {
    await Send(ctx, ctx.path, {root: path.join(__dirname,'../public/')})
  } else {
    await next()
  }
});

app.use(koaBody())
// app.use(koaMount('/dist', koaStatic(resolve("../dist"))));
// app.use(koaMount('/public', koaStatic(resolve("../public"))));

let pageRouter;

if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/prod-ssr')
  // pageRouter = require('./routers/ssr-no-bundle')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
