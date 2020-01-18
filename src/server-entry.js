import createApp from './main'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      Promise.all(matchedComponents.map(comp => {
        if (comp.asyncData) {
          // 调用asyncData方法
          return comp.asyncData({
            router,
            store
          })
        }
      })).then((res) => {
        // console.log('res', res);
        context.meta = app.$meta()
        context.state = store.state
        context.router = router
        resolve(app)
      })
    })
  })
}
