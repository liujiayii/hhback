import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/iview.js'
import echarts from 'echarts'

axios.defaults.baseURL = 'http://192.168.1.110:8080/'
Vue.prototype.$ajax = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
