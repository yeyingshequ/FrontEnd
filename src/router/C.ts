import C from '@/pages/C/index.vue'
import CmtyHome from '@/pages/C/CmtyHome/index.vue'
/* 社区模板 */
export default {
  name: 'C',
  path: '/c/:cmtyId',
  component: C,
  //redirect: '/c/:cmtyId/home',
  children: [
    {
      name: 'CmtyHome',
      path: 'home',
      component: CmtyHome
    }
  ]
}
