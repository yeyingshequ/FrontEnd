import C from '@/pages/C'
import CmtyHome from '@/pages/C/CmtyHome'
/* 社区模板 */
export default {
  name: 'C',
  path: '/c/:cmtyId',
  component: C,
  redirect: '/c/:cmtyId/home',
  children: [
    {
      name: 'CmtyHome',
      path: 'home',
      component: CmtyHome
    }
  ]
}
