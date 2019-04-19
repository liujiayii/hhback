import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './config/iview'
import './config/axios'

Vue.config.productionTip = false
const Temp = () => import('@/views/temp/temp')
const HomePage = () => import('@/views/home/home')/*主页*/
const Home = () => import('@/views/website/home')/*官网主页*/
const Version = () => import('@/views/website/version')/*主页*/
const About = () => import('@/views/website/about')/*主页*/
const Contact = () => import('@/views/website/contact')/*主页*/
const Friends = () => import('@/views/website/friends')/*主页*/
const OuYe = () => import('@/views/forum/ouYe')/*主页*/
const ZhiLaiYun = () => import('@/views/forum/zhiLaiYun')/*主页*/
const WoJia = () => import('@/views/forum/woJia')/*主页*/
const WoChi = () => import('@/views/forum/woChi')/*主页*/
const YuQiong = () => import('@/views/forum/yuQiong')/*主页*/
const ShanDian = () => import('@/views/forum/shanDian')/*主页*/
const Ware = () => import('@/views/mall/ware')/*主页*/
const Sort = () => import('@/views/mall/sort')/*主页*/
const Stock = () => import('@/views/mall/stock')/*主页*/
const Discount = () => import('@/views/mall/discount')/*主页*/
const Order = () => import('@/views/mall/order')/*主页*/
const Return = () => import('@/views/mall/return')/*主页*/
const Rate = () => import('@/views/mall/rate')/*主页*/
const Express = () => import('@/views/mall/express')/*主页*/
const Account = () => import('@/views/system/account')/*主页*/
const Access = () => import('@/views/system/access')/*主页*/
const Specs = () => import('@/views/mall/specs')/*主页*/
/*路由守卫*/
let registerRouteFresh = true
router.beforeEach((to, form, next) => {
  if (registerRouteFresh) {
    const addRouters = JSON.parse(window.sessionStorage.getItem('SkyLarkBack'))
    if (addRouters) {
      for (let i = 0; i < addRouters.length; i++) {
        addRouters[i].component = eval(addRouters[i].component)
        for (let n = 0; n < addRouters[i].children.length; n++) {
          addRouters[i].children[n].component = eval(addRouters[i].children[n].component)
        }
      }
      router.addRoutes(addRouters)
    }
    let routerPath = window.sessionStorage.getItem('routerPath')
    if (routerPath && registerRouteFresh) {
      registerRouteFresh = false
      return next({path: routerPath})
    }
  } else {
    /!*解决了addRouter在页面刷新后丢失的问题，感觉不是很好的解决方案*!/
    window.sessionStorage.setItem('routerPath', to.path)
    document.title = to.name
    if (form.path === '/login') {
      const addRouters = JSON.parse(window.sessionStorage.getItem('SkyLarkBack'))
      if (addRouters) {
        for (let i = 0; i < addRouters.length; i++) {
          addRouters[i].component = eval(addRouters[i].component)
          for (let n = 0; n < addRouters[i].children.length; n++) {
            addRouters[i].children[n].component = eval(addRouters[i].children[n].component)
          }
        }
        router.addRoutes(addRouters)
      }
    }
  }
  /!*判断如果没有名字就返回登录页，不判断to.path会陷入死循环*!/
  if (!window.sessionStorage.getItem('userName') && to.path !== '/login') {
    return next({path: '/login'})
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
