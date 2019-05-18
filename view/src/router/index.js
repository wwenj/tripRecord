import Vue from 'vue'
import Router from 'vue-router'
import Home from './moudle/home'
import Trip from './moudle/trip'
import User from './moudle/user'
import History from './moudle/history'

Vue.use(Router)

const commonRoutes = [
  { path: '/404', component: () => import('components/RouterError/404') },
  { path: '/401', component: () => import('components/RouterError/401') },
  { path: '*', redirect: '/404' },
  {
    path: '/',
    redirect: '/trip'
  }
]

/** 分模块的路由，合并传入Router */
export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: commonRoutes.concat(Home, Trip, User, History)
})
