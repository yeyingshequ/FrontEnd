import Notifications from '@/pages/Notifications'
<<<<<<< HEAD
import Reply from '@/pages/Notifications/Reply';
import At from '@/pages/Notifications/At';
import Like from '@/pages/Notifications/Like';
import System from '@/pages/Notifications/System';

/* 通知 */
export default {
    name: 'Notifications',
    path: '/notifications',
    component: Notifications,
    redirect: '/notifications/reply',
    children: [{
        name: "Reply",
        path: "reply",
        component: Reply,
    }, {
        name: "At",
        path: "at",
        component: At,
    }, {
        name: "Like",
        path: "like",
        component: Like,
    }, {
        name: "System",
        path: "system",
        component: System,
    }],
}
=======
import Reply from '@/pages/Notifications/Reply'
import At from '@/pages/Notifications/At'
import Like from '@/pages/Notifications/Like'
import System from '@/pages/Notifications/System'

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
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
