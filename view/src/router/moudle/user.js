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
  }
]
export default tripUser
