import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'
import createStore from './store'
import createRouter from './router'
import './assets/styles/index.less'
Vue.config.productionTip = false;
Vue.use(Meta)
if (!Vue.prototype.$isServer) {
  require('lib-flexible')
}

// console.log('VUE_ENV', process.env.VUE_ENV);

export default function () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}