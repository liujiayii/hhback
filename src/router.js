import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login/login'

Vue.use(Router)
let defaultRouter = [{
  path: '/',
  redirect: '/login',
  children: []
},
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '',
    component: () => import('@/views/temp/temp'),
    name: '',
    children: [
      {
        component: () => import('@/views/exception/404'),
        name: "404",
        path: "/404",
      },{
        component: () => import('@/views/exception/403'),
        name: "403",
        path: "/403",
      },{
        component: () => import('@/views/exception/500'),
        name: "500",
        path: "/500",
      }
    ]
  }, {
    path: '*',
    redirect: '/404'
  }]

export default new Router({
  routes: defaultRouter
})
