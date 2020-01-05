const ejs = require('ejs')

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
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      meta: meta.text(),
      // initalState: context.renderState()
    });
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
