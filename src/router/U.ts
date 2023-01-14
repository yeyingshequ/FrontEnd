import U from '@/pages/U/U.vue'
import userPost from '@/pages/U/userPost/userPost.vue'
import useUserStore from "@/store/user"
const userStore = useUserStore()
console.log("uid:", userStore.userInfo.userId);

/* 帖子模板 */
export default {
  name: 'U',
  path: '/u/:uid',
  component: U,
  //redirect: '/u/' + 23 + '/home',
  children: [
    {
      name: 'userPost',
      path: 'home',
      component: userPost
    }
  ]
}
