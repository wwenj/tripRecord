const HomeRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/Home.vue'),
    meta: {
      title: '主页',
      icon: 'home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('views/About.vue'),
    meta: {
      title: 'about',
      icon: 'about'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('views/test.vue')
  }
]
export default HomeRoutes
