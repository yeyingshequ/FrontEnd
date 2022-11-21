<<<<<<< HEAD
import C from '@/pages/C';
import CmtyHome from "@/pages/C/ CmtyHome";
/* 社区模板 */
export default {
    name: 'C',
    path: '/c/:cmtyId',
    component: C,
    redirect: '/c/:cmtyId/home',
    children: [{
        name: "CmtyHome",
        path: "home",
        component:CmtyHome ,
    }]
}
=======
import C from '@/pages/C'
import CmtyHome from '@/pages/C/CmtyHome'
/* 社区模板 */
export default {
  name: 'C',
  path: '/c/:cid',
  component: C,
  redirect: '/c/:cid/home',
  children: [
    {
      name: 'CmtyHome',
      path: 'home',
      component: CmtyHome,
    },
  ],
}
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
