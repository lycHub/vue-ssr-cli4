const Router = require('koa-router')
const testRouter = new Router({ prefix: '/test' })
testRouter.get('/list', (ctx) => {
  ctx.body = {
    code: 0,
    list: ['关于', '张飞', '赵云']
  }
})
module.exports = testRouter
