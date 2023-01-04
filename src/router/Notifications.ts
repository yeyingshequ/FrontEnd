import Notifications from '@/pages/Notifications/index.vue'
import Reply from '@/pages/Notifications/Reply/index.vue'
import At from '@/pages/Notifications/At/index.vue'
import Like from '@/pages/Notifications/Like/index.vue'
import System from '@/pages/Notifications/System/index.vue'

/* 通知 */
export default {
  name: 'Notifications',
  path: '/notifications',
  component: Notifications,
  redirect: '/notifications/reply',
  children: [
    {
      name: 'Reply',
      path: 'reply',
      component: Reply,
    },
    {
      name: 'At',
      path: 'at',
      component: At,
    },
    {
      name: 'Like',
      path: 'like',
      component: Like,
    },
    {
      name: 'System',
      path: 'system',
      component: System,
    },
  ],
}
