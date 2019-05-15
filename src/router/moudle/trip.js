const tripRoutes = [
  {
    path: '/trip',
    name: 'Trip',
    component: () => import('views/trip/trip'),
    meta: {
      title: '出行'
    },
    children: [{
      path: 'map',
      name: 'Map',
      component: () => import('components/MapLocation/index'),
      meta: {
        title: '地图'
      }
    }]
  },
  {
    path: '/traffic',
    name: 'Traffic',
    component: () => import('views/traffic/traffic'),
    meta: {
      title: '交通'
    }
  }
]
export default tripRoutes
