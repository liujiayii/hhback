import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ajax from 'axios'
import './plugins/iview.js'
import echart from 'echarts'
/*注册Axios*/
const instance = ajax.create({
  baseURL:/*'/'*/ /*'http://192.168.1.103:8080/'*/'http://192.168.1.125:8080/',
  transformRequest: [/*将JSON字符串转换成FormData*/
    function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret;
    }
  ]
})
Vue.prototype.$ajax = instance
Vue.prototype.$echarts = echart
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
