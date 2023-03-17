import Communities from '@/pages/Communities/index.vue'
import Joined from '@/pages/Communities/Joined/index.vue'
import Square from '@/pages/Communities/Square/index.vue'
import Favorite from '@/pages/Communities/Favorite/index.vue'
import Recent from '@/pages/Communities/Recent/index.vue'
import storage from '@/tools/storage'

/* 社区 */
export default {
  name: 'Communities',
  path: '/communities',
  component: Communities,
  redirect: (to: any) => {
    console.log("to:", to);
    let user = storage.get('token')
    console.log("user:", user);
    if (user) {
      return '/communities/joined'
    } else {
      return '/communities/square/全部'
    }


  },
  children: [
    {
      name: 'Joined',
      path: 'joined',
      component: Joined,
    },
    {
      /* 社区广场 */
      name: 'Square',
      path: 'square/:category?',
      component: Square
    },
    {
      /* 特别关注 */
      name: 'Favorite',
      path: 'favorite',
      component: Favorite,
    },
    {
      /* 最近逛过 */
      name: 'Recent',
      path: 'recent',
      component: Recent,
    },
  ],
}
