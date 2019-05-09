const tripRoutes = [
  {
    path: '/trip',
    name: 'Trip',
    component: () => import('views/trip/trip'),
    meta: {
      title: '出行',
      icon: 'home'
    }
  }
]
export default tripRoutes
