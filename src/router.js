import Vue from 'vue'
import Router from 'vue-router'

import Layout from './views/layout/layout'
import Login from './views/login/login'
import Home from './views/home/home'

const HomePage = () => import('@/views/homePage/homePage')
const About = () => import('@/views/about/about')

const OuYe = () => import('@/views/forum/ouYe')
const ZhiLaiYun = () => import('@/views/forum/zhiLaiYun')
const WoJia = () => import('@/views/forum/woJia')
const WoChi = () => import('@/views/forum/woChi')
const YuQiong = () => import('@/views/forum/yuQiong')
const ShanDian = () => import('@/views/forum/shanDian')

const Order = () => import('@/views/mall/order')
const Custom = () => import('@/views/mall/custom')
const Ware = () => import('@/views/mall/ware')
const Account = () => import('@/views/account/account')

Vue.use(Router)
let defaultRouter = [{
  path: '/',
  redirect: '/login',
  children: []
},
  {
    path: '/login',
    name: 'login',
    component: Login,
    children: []
  }, {
    path: '/',
    name: '',
    component: Layout,
    children: [
      {
        path: '/home',
        name: '首页',
        component: Home,
        Ico: 'md-home',
        meta: {bread: true}
      },
      {
        path: '/homePage',
        name: '主页',
        Ico: 'md-planet',
        component: HomePage,
        meta: {bread: false}
      },
      {
        path: '/about',
        name: '关于我们',
        Ico: 'md-body',
        component: About,
        meta: {bread: false}
      }
    ]
  }, {
    path: '/forum',
    name: '云阙论坛',
    component: Layout,
    Ico: 'md-chatboxes',
    children: [{
      path: 'ouYe',
      name: '讴业普惠',
      component: OuYe,
      children: [],
      meta: {title: '云阙论坛', name: 'forum'}
    }, {
      path: 'zhiLaiYun',
      name: '智莱云',
      component: ZhiLaiYun,
      meta: {title: '云阙论坛', name: 'forum'},
      children: []
    }, {
      path: 'woJia',
      name: '喔家房产',
      component: WoJia,
      meta: {title: '云阙论坛', name: 'forum'},
      children: []
    }, {
      path: 'woChi',
      name: '喔驰汽车',
      component: WoChi,
      meta: {title: '云阙论坛', name: 'forum'},
      children: []
    }, {
      path: 'yuQiong',
      name: '玉琼斋餐饮',
      component: YuQiong,
      meta: {title: '云阙论坛', name: 'forum'},
      children: []
    }, {
      path: 'shanDian',
      name: '闪电传媒',
      component: ShanDian,
      meta: {title: '云阙论坛', name: 'forum'},
      children: []
    }]
  }, {
    path: '/mall',
    name: '云阙商城',
    component: Layout,
    Ico: 'md-basket',
    children: [{
      path: 'order',
      name: '订单处理',
      component: Order,
      children: [],
      meta: {title: '云阙商城', name: 'mall'}
    }, {
      path: 'custom',
      name: '客户档案',
      component: Custom,
      children: [],
      meta: {title: '云阙商城', name: 'mall'}
    }, {
      path: 'ware',
      name: '商品列表',
      component: Ware,
      children: [],
      meta: {title: '云阙商城', name: 'mall'}
    }]
  }, {
    path: '/',
    name: '',
    component: Layout,
    children: [{
      path: '/account',
      name: '账号管理',
      Ico: 'md-person-add',
      component: Account,
      meta: {bread: false}
    }
    ]
  }]
export default new Router({
  routes: defaultRouter
})
export {defaultRouter}
