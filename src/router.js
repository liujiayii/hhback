import Vue from 'vue'
import Router from 'vue-router'

import Layout from './views/layout/layout'
import Login from './views/login/login'
import Home from './views/home/home'

const OuYe = () => import('@/views/forum/ouYe')
const ZhiLaiYun = () => import('@/views/forum/zhiLaiYun')
const WoJia = () => import('@/views/forum/woJia')
const WoChi = () => import('@/views/forum/woChi')
const YuQiong = () => import('@/views/forum/yuQiong')
const ShanDian = () => import('@/views/forum/shanDian')

Vue.use(Router)

export default new Router({
  routes: [
    {
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
      path: '/index',
      name: 'index',
      component: Layout,
      children: [
        {
          path: '/home',
          name: '首页',
          component: Home,
          meta: {bread: true},
          children: []
        }
      ]
    }, {
      path: '/forum',
      name: '云阙论坛',
      component: Layout,
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
    }
  ]
})
