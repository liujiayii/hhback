import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import Axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios=Axios

import 'iview/dist/styles/iview.css';
import {Button,Table,Menu,Submenu,MenuItem,Icon,MenuGroup,Form,FormItem,Input,Layout,Sider,Breadcrumb,BreadcrumbItem} from 'iview'
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Layout', Layout)
Vue.component('Sider', Sider)
Vue.component('Input', Input)
Vue.component('FormItem', FormItem)
Vue.component('Form', Form)
Vue.component('MenuGroup', MenuGroup)
Vue.component('Icon', Icon)
Vue.component('MenuItem', MenuItem)
Vue.component('Submenu', Submenu)
Vue.component('Menu', Menu)
Vue.component('Button', Button)
Vue.component('Table', Table)
Vue.config.productionTip = false


// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
 // console.log("请求"+config)
  if(config.method=="post"){
config.data=qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //console.log("响应"+response)
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
