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
  }
]
export default tripUser
