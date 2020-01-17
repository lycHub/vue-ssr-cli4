const ejs = require('ejs')
const isDev = process.env.NODE_ENV === 'development'
module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  const context = { url: ctx.path }
  try {
    /*
    * context对象会传到entry.server中
    * 相当于执行server-entry并渲染出html字符串
    * */
    console.log('aaaaaaaa');
    const appString = await renderer.renderToString(context)
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb');
    const { title, meta } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      BASE_URL: isDev ? 'http://127.0.0.1:4200/' : '/dist/',
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      meta: meta.text(),
      initalState: context.renderState()
    });
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
