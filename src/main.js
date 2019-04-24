import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './router'
import './config/iview'
import './config/ant'
import './config/axios'

Vue.config.productionTip = false
import {constantRouterComponents} from './router'
/*路由守卫*/
let registerRouteFresh = true
router.beforeEach((to, form, next) => {
  /!*判断如果没有名字就返回登录页，不判断to.path会陷入死循环*!/
  if (!window.sessionStorage.getItem('userName') && to.path !== '/login') {
    return next({path: '/login'})
  } else if (registerRouteFresh || form.path === '/login') {
    const addRouters = JSON.parse(window.sessionStorage.getItem('SkyLarkBack'))
    if (addRouters) {
      for (let i = 0; i < addRouters.length; i++) {
        addRouters[i].component = constantRouterComponents[addRouters[i].component]
        for (let n = 0; n < addRouters[i].children.length; n++) {
          addRouters[i].children[n].component = constantRouterComponents[addRouters[i].children[n].component]
        }
      }
      router.addRoutes(addRouters)
    }
    registerRouteFresh = false
    if (to.path === '/404') {
      return next({path: window.sessionStorage.getItem('path')})
    } else {
      next()
    }
  } else {
    document.title = to.name
    window.sessionStorage.setItem('path', to.path)
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
