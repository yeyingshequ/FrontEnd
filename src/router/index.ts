//配置路由的地方
import { createRouter, createWebHashHistory } from "vue-router";

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

const router = createRouter({
  history: createWebHashHistory(),
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
    History,
    Comment,
    //重定向,在项目跑起来的时候,访问/,立马让他指定到首页
    {
      path: '/',
      redirect: 'home',
    },
  ],
})


export default router
