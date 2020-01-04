import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home'},
    {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
    },
    {
      path: '/cars',
      name: 'Cars',
      component: () => import(/* webpackChunkName: "cars" */ '../views/cars/Cars.vue')
    },
    { path: '*', redirect: '/home'}
  ]
})

export default router
