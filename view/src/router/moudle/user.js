const tripUser = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/user/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('views/user/user'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/userDetails',
    name: 'UserDetails',
    component: () => import('views/user/userDetails'),
    meta: {
      title: '我的信息'
    }
  },
  {
    path: '/trend',
    name: 'Trend',
    component: () => import('views/user/trend/tripTrend'),
    meta: {
      title: '出行趋势'
    }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('views/user/analysis1/dataAnalysis'),
    meta: {
      title: '数据分析'
    }
  }
]
export default tripUser
