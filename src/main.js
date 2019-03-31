import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import './plugins/echarts'
import './plugins/axios'

Vue.config.productionTip = false

/*路由守卫*/
router.beforeEach((to, form, next) => {
  if (!window.sessionStorage.getItem('userName') && to.path !== '/login') {
    return next({path: '/login'});
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
