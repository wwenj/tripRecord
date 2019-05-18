const tripHistory = [
  {
    path: '/history',
    name: 'History',
    component: () => import('views/history/history'),
    meta: {
      title: '历史列表'
    },
    children: [
      {
        path: 'details',
        name: 'Details',
        component: () => import('views/history/historyDetails')
      }
    ]
  }
]
export default tripHistory
