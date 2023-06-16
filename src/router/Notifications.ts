

/* import At from '@/pages/Notifications/At/index.vue' */
/* import System from '@/pages/Notifications/System/index.vue' */

/* 通知 */
export default {
  name: 'Notifications',
  path: '/notifications',
  component: () => import('@/pages/Notifications/index.vue'),
  redirect: '/notifications/reply',
  children: [
    {
      name: 'Reply',
      path: 'reply',
      component: () => import('@/pages/Notifications/Reply/index.vue'),
    },
    /* {
      name: 'At',
      path: 'at',
      component: At,
    }, */
    {
      name: 'Like',
      path: 'like',
      component: () => import('@/pages/Notifications/Like/index.vue'),
    },
    /*     {
          name: 'System',
          path: 'system',
          component: System,
        }, */
  ],
}
