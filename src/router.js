import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login/login'
import Layout from './views/layout/layout'

Vue.use(Router)
let defaultRouter = [{
  path: '/',
  redirect: '/login'
},
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '',
    component: Layout,
    children: [
      {
        component: () => import('@/views/exception/404'),
        name: "404",
        path: "/404",
      }, {
        component: () => import('@/views/exception/403'),
        name: "403",
        path: "/403",
      }, {
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
// 前端路由表
const constantRouterComponents = {
  Layout,// 基础页面 layout 必须引入
  // 你需要动态引入的页面组件
  HomePage: () => () => import('@/views/home/home'),
  Home: () => import('@/views/website/home'),
  Version: () => import('@/views/website/version'),
  HomePage: () => import('@/views/home/home'),
  Home: () => import('@/views/website/home'),
  Version: () => import('@/views/website/version'),
  About: () => import('@/views/website/about'),
  Contact: () => import('@/views/website/contact'),
  Friends: () => import('@/views/website/friends'),
  OuYe: () => import('@/views/forum/ouYe'),
  ZhiLaiYun: () => import('@/views/forum/zhiLaiYun'),
  WoJia: () => import('@/views/forum/woJia'),
  WoChi: () => import('@/views/forum/woChi'),
  YuQiong: () => import('@/views/forum/yuQiong'),
  ShanDian: () => import('@/views/forum/shanDian'),
  Ware: () => import('@/views/mall/ware'),
  Sort: () => import('@/views/mall/sort'),
  Discount: () => import('@/views/mall/discount'),
  Order: () => import('@/views/mall/order'),
  Return: () => import('@/views/mall/return'),
  Rate: () => import('@/views/mall/rate'),
  Specs: () => import('@/views/mall/specs'),
  Express: () => import('@/views/mall/express'),
  Account: () => import('@/views/system/account'),
  Roles: () => import('@/views/system/roles'),
  Access: () => import('@/views/system/access'),
}

export {constantRouterComponents}
