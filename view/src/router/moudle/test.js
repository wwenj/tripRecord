const TestRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/test/Home.vue'),
    meta: {
      title: '主页',
      icon: 'home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('views/test/About.vue'),
    meta: {
      title: 'about',
      icon: 'about'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('views/test/test.vue')
  },
  {
    path: '/echart',
    name: 'Echart',
    component: () => import('views/test/echart.vue')
  }
]
export default TestRoutes
