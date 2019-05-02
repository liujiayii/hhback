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

/*格式化 后端 结构信息并递归生成层级路由表*/
const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${parent && parent.path || ''}/${item.path}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件
      component: constantRouterComponents[item.component || item.key],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: item.meta
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    currentRouter.path = currentRouter.path.replace('///', '/')
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}
export {constantRouterComponents, generator}
