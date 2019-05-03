import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/ant'
import './config/axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
import {generator} from './router'

/*路由守卫*/
let registerRouteFresh = true
router.beforeEach((to, form, next) => {
  /!*判断如果没有名字就返回登录页，不判断to.path会陷入死循环*!/
  NProgress.start()
  if (!window.sessionStorage.getItem('userName') && to.path !== '/login') {
    return next({path: '/login'})
  }
  if (registerRouteFresh) {
    store.state.menu = JSON.parse(window.sessionStorage.getItem('SkyLarkBack'))
    if (store.state.menu != null) router.addRoutes(generator(store.state.menu))
    registerRouteFresh = false
    if (to.path === '/404') {
      next({path: window.sessionStorage.getItem('path')})
    } else {
      next()
    }
  } else {
    next()
    document.title = to.name
    window.sessionStorage.setItem('path', to.path)
  }
})
router.afterEach(() => {
  NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
