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
  NProgress.start()
  if (!window.sessionStorage.getItem('userInfo') && to.path !== '/login') {
    return next({path: '/login'})
  }
  if (registerRouteFresh || (form.path === '/login')) {
    if (window.sessionStorage.getItem('SkyLarkBack')) {
      store.state.menu = generator(JSON.parse(window.sessionStorage.getItem('SkyLarkBack')))
      store.state.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      router.addRoutes(store.state.menu)
    }
    registerRouteFresh = false
    if (to.path === '/404') {
      next({path: window.sessionStorage.getItem('path') || '/home'})
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
window.$Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
