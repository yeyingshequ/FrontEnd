




import useUserStore from "@/store/user"
const userStore = useUserStore()

/* 社区 */
export default {
  name: 'Communities',
  path: '/communities',
  component: () => import('@/pages/Communities/index.vue'),
  redirect: (to: any) => {
    //console.log("to:", to);
    let user = userStore.myInfo.userId
    //console.log("user:", user);
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
      component: () => import('@/pages/Communities/Joined/index.vue'),
    },
    {
      /* 社区广场 */
      name: 'Square',
      path: 'square/:category?',
      component: () => import('@/pages/Communities/Square/index.vue'),
    },
    {
      /* 特别关注 */
      name: 'Favorite',
      path: 'favorite',
      component: () => import('@/pages/Communities/Favorite/index.vue'),
    },
    {
      /* 最近逛过 */
      name: 'Recent',
      path: 'recent',
      component: () => import('@/pages/Communities/Recent/index.vue'),
    },
  ],
}
