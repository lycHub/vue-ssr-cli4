import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default function () {
  return new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
      { path: '/', redirect: '/home'},
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
        meta: {
          metaInfo: {
            title: '国际租车_美国租车_欧洲租车_特价预订国外租车_中文服务 - 租租车',
            meta: [
              { name: 'keywords', content: '国际租车,国外租车,美国租车,欧洲租车,澳洲租车,租租车' },
              { name: 'description', content: '租租车为您提供国际租车自驾游网站服务，包括美国、欧洲等国外旅游租车价格、自驾游租车攻略、租车自驾网站、境外租车注意事项、自驾租车公司服务等。助您轻松实现海外自驾游。车型均由国际知名连锁租车公司提供，比去HERTZ AVIS等官网预订优惠10%-30%以上！' },
            ]
          }
        }
      },
      {
        path: '/cars',
        name: 'Cars',
        component: () => import(/* webpackChunkName: "cars" */ '../views/cars/Cars.vue'),
        meta: {
          metaInfo: {
            title: '车辆列表 - 租租车',
            meta: [
              { name: 'keywords', content: '车辆列表 关键字' },
              { name: 'description', content: '车辆列表 描述' },
            ]
          }
        }
      },
      { path: '*', redirect: '/home'}
    ]
  })
}