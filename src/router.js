import Vue from 'vue'
import Router from 'vue-router'

import Temp from './views/temp/temp'
import Login from './views/login/login'
import Home from './views/home/home'

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
    path: '/',
    name: '',
    component: Temp,
    children: [
      {
        path: '/home',
        name: '首页',
        component: Home,
        Ico: 'md-home',
        meta: {bread: true}
      }]
  }, {
    path: '/website',
    name: '云阙官网',
    component: Temp,
    Ico: 'md-paw',
    children: [{
      path: 'homePage',
      name: '主页',
      component: () => import('@/views/website/homePage'),
      meta: {title: '云阙官网'}
    }, {
      path: 'about',
      name: '关于我们',
      component: () => import('@/views/website/about'),
      meta: {title: '云阙官网'}
    }, {
      path: 'contact',
      name: '联系我们',
      component: () => import('@/views/website/contact'),
      meta: {title: '云阙官网'}
    }]
  }, {
    path: '/forum',
    name: '云阙论坛',
    component: Temp,
    Ico: 'md-chatboxes',
    children: [{
      path: 'ouYe',
      name: '讴业普惠',
      component: () => import('@/views/forum/ouYe'),
      meta: {title: '云阙论坛'}
    }, {
      path: 'zhiLaiYun',
      name: '智莱云',
      component: () => import('@/views/forum/zhiLaiYun'),
      meta: {title: '云阙论坛'}
    }, {
      path: 'woJia',
      name: '喔家房产',
      component: () => import('@/views/forum/woJia'),
      meta: {title: '云阙论坛'}
    }, {
      path: 'woChi',
      name: '喔驰汽车',
      component: () => import('@/views/forum/woChi'),
      meta: {title: '云阙论坛'}
    }, {
      path: 'yuQiong',
      name: '玉琼斋餐饮',
      component: () => import('@/views/forum/yuQiong'),
      meta: {title: '云阙论坛'}
    }, {
      path: 'shanDian',
      name: '闪电传媒',
      component: () => import('@/views/forum/shanDian'),
      meta: {title: '云阙论坛'}
    }]
  }, {
    path: '/mall',
    name: '云阙商城',
    component: Temp,
    Ico: 'md-basket',
    children: [{
      path: 'ware',
      name: '商品列表',
      component: () => import('@/views/mall/ware'),
      meta: {title: '云阙商城'}
    }, {
      path: 'sort',
      name: '商品专区',
      component: () => import('@/views/mall/sort'),
      meta: {title: '云阙商城'}
    }, {
      path: 'stock',
      name: '库存管理',
      component: () => import('@/views/mall/stock'),
      meta: {title: '云阙商城'}
    }, {
      path: 'discount',
      name: '满减优惠',
      component: () => import('@/views/mall/discount'),
      meta: {title: '云阙商城'}
    }, {
      path: 'order',
      name: '订单处理',
      component: () => import('@/views/mall/order'),
      meta: {title: '云阙商城'}
    }, {
      path: 'return',
      name: '退货订单',
      component: () => import('@/views/mall/return'),
      meta: {title: '云阙商城'}
    }, {
      path: 'rate',
      name: '商品评价',
      component: () => import('@/views/mall/rate'),
      meta: {title: '云阙商城'}
    }, {
      path: 'express',
      name: '运费管理',
      component: () => import('@/views/mall/express'),
      meta: {title: '云阙商城'}
    }]
  }, {
    path: '/',
    name: '',
    component: Temp,
    children: [{
      path: '/account',
      name: '账号管理',
      Ico: 'md-person-add',
      component: () => import('@/views/account/account'),
      meta: {bread: false}
    }]
  }, {
    path: '/404',
    component: () => import('@/views/error/error'),
    name: '404',
    Ico: 'md-bug'
  }, {
    path: '*',
    redirect: '/404'
  }]

export default new Router({
  routes: defaultRouter
})
