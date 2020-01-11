import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'
import createStore from './store'
import createRouter from './router'
import Vant from 'vant'
import { Lazyload } from 'vant';
import './assets/styles/index.less'
Vue.config.productionTip = false;
Vue.use(Meta)
Vue.use(Vant)
Vue.use(Lazyload);
if (!Vue.prototype.$isServer) {
  require('lib-flexible')
}

// 全局指令
import './directives'

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