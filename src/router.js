import Vue from 'vue'
import Router from 'vue-router'

import Layout from './views/layout/layout'
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
      }]
  }, {
    path: '/website',
    name: '云阙官网',
    component: Layout,
    Ico: 'md-planet',
    children: [{
      path: 'homePage',
      name: '主页',
      component: () => import('@/views/website/homePage'),
      children: [],
      meta: {title: '云阙官网'}
    }, {
      path: 'about',
      name: '关于我们',
      component: () => import('@/views/website/about'),
      children: [],
      meta: {title: '云阙官网'}
    }, {
      path: 'contact',
      name: '联系我们',
      component: () => import('@/views/website/contact'),
      children: [],
      meta: {title: '云阙官网'}
    }]
  }, {
    path: '/forum',
    name: '云阙论坛',
    component: Layout,
    Ico: 'md-chatboxes',
    children: [{
      path: 'ouYe',
      name: '讴业普惠',
      component: () => import('@/views/forum/ouYe'),
      children: [],
      meta: {title: '云阙论坛'}
    }, {
      path: 'zhiLaiYun',
      name: '智莱云',
      component: () => import('@/views/forum/zhiLaiYun'),
      meta: {title: '云阙论坛'},
      children: []
    }, {
      path: 'woJia',
      name: '喔家房产',
      component: () => import('@/views/forum/woJia'),
      meta: {title: '云阙论坛'},
      children: []
    }, {
      path: 'woChi',
      name: '喔驰汽车',
      component: () => import('@/views/forum/woChi'),
      meta: {title: '云阙论坛'},
      children: []
    }, {
      path: 'yuQiong',
      name: '玉琼斋餐饮',
      component: () => import('@/views/forum/yuQiong'),
      meta: {title: '云阙论坛'},
      children: []
    }, {
      path: 'shanDian',
      name: '闪电传媒',
      component: () => import('@/views/forum/shanDian'),
      meta: {title: '云阙论坛'},
      children: []
    }]
  }, {
    path: '/mall',
    name: '云阙商城',
    component: Layout,
    Ico: 'md-basket',
    children: [{
      path: 'ware',
      name: '商品列表',
      component: () => import('@/views/mall/ware'),
      children: [],
      meta: {title: '云阙商城'}
    }, {
      path: 'sort',
      name: '商品分类',
      component: () => import('@/views/mall/sort'),
      children: [],
      meta: {title: '云阙商城'}
    }, {
      path: 'stock',
      name: '库存管理',
      component: () => import('@/views/mall/stock'),
      children: [],
      meta: {title: '云阙商城'}
    }, {
      path: 'discount',
      name: '满减优惠',
      component: () => import('@/views/mall/discount'),
      children: [],
      meta: {title: '云阙商城'}
    }, {
      path: 'order',
      name: '订单处理',
      component: () => import('@/views/mall/order'),
      children: [],
      meta: {title: '云阙商城'}
    }, {
      path: 'return',
      name: '退货订单',
      component: () => import('@/views/mall/return'),
      children: [],
      meta: {title: '云阙商城'}
    }, {
      path: 'rate',
      name: '商品评价',
      component: () => import('@/views/mall/rate'),
      children: [],
      meta: {title: '云阙商城'}
    }, {
      path: 'express',
      name: '运费管理',
      component: () => import('@/views/mall/express'),
      children: [],
      meta: {title: '云阙商城'}
    }]
  }, {
    path: '/',
    name: '',
    component: Layout,
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
    Ico: 'md-bug',
    children: []
  }, {
    path: '*',
    redirect: '/404',
    children: []
  }]

export default new Router({
  routes: defaultRouter
})
