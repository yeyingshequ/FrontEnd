import U from '@/pages/U/U.vue'
import userPost from '@/pages/U/userPost/userPost.vue'
import userCmty from '@/pages/U/userCmty/userCmty.vue'
import followers from '@/pages/U/followers/followers.vue';
import following from '@/pages/U/following/following.vue';

/* 帖子模板 */
export default {
  name: 'U',
  path: '/u/:uid',
  component: U,
  meta: { hasTop: true },
  redirect: (to: any) => {
    console.log("to:", to);
    return '/u/' + to.params.uid + '/home'
  },
  children: [
    {
      name: 'UserPost',
      path: 'home',
      component: userPost,
      meta: { hasTop: true }
    },
    {
      name: 'UserCmty',
      path: 'community',
      component: userCmty,
      meta: { hasTop: true }
    },
    {
      name: 'Followers',
      path: 'followers',
      component: followers,
      meta: { hasTop: true }
    },
    {
      name: 'Following',
      path: 'following',
      component: following,
      meta: { hasTop: true }
    },
  ]
}
