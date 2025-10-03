import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomeIndex.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('@/views/schedule/ScheduleIndex.vue'),
    },
  ],
})

export default router
