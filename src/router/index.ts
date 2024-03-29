//配置路由的地方
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import Home from '@/router/Home'
import Discover from '@/router/Discover'
import Communities from '@/router/Communities'
import Notifications from '@/router/Notifications'
import C from '@/router/C'
import P from '@/router/P'
import U from '@/router/U'
import Setting from '@/router/Setting'
import Saved from "./Saved";
import History from "./History";
import Comment from '@/router/Comment'
import Search from "@/router/Search";
import useUserStore from "@/store/user"
const userStore = useUserStore()
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
  history: createWebHistory()/* createWebHashHistory() */,
  routes: [
    Home,
    Discover,
    Communities,
    Notifications,
    Setting,
    C,
    P,
    U,
    Saved,
    Search,
    History,
    Comment,
    //重定向,在项目跑起来的时候,访问/,立马让他指定到首页
    {
      path: '/',
      redirect: (to: any) => {
        //console.log("to:", to);
        let user = userStore.myInfo.userId
        //console.log("user:", user);
        if (user) {
          return 'home'
        } else {
          return 'discover'
        }
      }


    },

  ],
})


export default router
