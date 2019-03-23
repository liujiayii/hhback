import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Index from './components/index'
import Aa1 from './page/1-1'
import Aa2 from './page/1-2'
import Aa3 from './page/1-3'
import Aa4 from './page/1-4-1'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  
   {
   path: '/',
   name: 'login',
   component: Login
  },
  {
   path: '/index',
   name: 'index',
   component: Index,
   redirect: '/index/aa2' ,
      children:[
        {
          path: 'aa1',
          name: 'aa1',
          component: Aa1
        },
        {
          path: 'aa2',
          name: 'aa2',
          component: Aa2
        },
        {
          path: 'aa3',
          name: 'aa3',
          component: Aa3
        },
        {
          path: 'aa4',
          name: 'aa4',
          component: Aa4
        },
      ]
  },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
