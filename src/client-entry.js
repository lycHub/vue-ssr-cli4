import createApp from './main'

const { app, router } = createApp()

/*
* 模板插入initalState后，就会创建window.__INITIAL_STATE__，值为store.state
* */
// if (window.__INITIAL_STATE__) {
//   // replaceState: 合并store.state状态
//   store.replaceState(window.__INITIAL_STATE__)
// }
router.onReady(function () {
  app.$mount('#app')
});
