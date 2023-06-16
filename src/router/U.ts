
/* 帖子模板 */
export default {
  name: 'U',
  path: '/u/:userId',
  component: () => import('@/pages/U/U.vue'),
  meta: { hasTop: true },
  redirect: (to: any) => {
    //console.log("to:", to);
    return '/u/' + to.params.userId + '/home'
  },
  children: [
    {
      name: 'UserPost',
      path: 'home',
      component: () => import('@/pages/U/userPost/userPost.vue'),
      meta: { hasTop: true, parent: 'U' }
    },
    {
      name: 'UserCmty',
      path: 'community',
      component: () => import('@/pages/U/userCmty/userCmty.vue'),
      meta: { hasTop: true, parent: 'U' }
    },
    {
      name: 'Followers',
      path: 'followers',
      component: () => import('@/pages/U/followers/followers.vue'),
      meta: { hasTop: true, parent: 'U' }
    },
    {
      name: 'Following',
      path: 'following',
      component: () => import('@/pages/U/following/following.vue'),
      meta: { hasTop: true, parent: 'U' }
    },
    {
      name: 'UserComment',
      path: 'comment',
      component: () => import('@/pages/U/userComment/userComment.vue'),
      meta: { hasTop: true, parent: 'U' }
    }
  ]
}
