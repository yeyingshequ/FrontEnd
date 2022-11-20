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
