export default [
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/HomeIndex.vue'),
  },
  {
    path: '/daily',
    name: 'Daily',
    component: () => import('@/views/daily/DailyIndex.vue'),
  },
  {
    path: '/tag',
    name: 'Tag',
    component: () => import('@/views/tag/TagIndex.vue'),
  },
]
