import C from '@/pages/C/C.vue'
import CmtyHome from '@/pages/C/CmtyHome/index.vue'
/* 社区模板 */
export default {
  name: 'C',
  path: '/c/:cmtyId',
  component: C,
  redirect: (to: any) => {
    //console.log("to:", to);
    return '/c/' + to.params.cmtyId + '/home'
  },
  children: [
    {
      name: 'CmtyHome',
      path: 'home',
      component: CmtyHome,
      meta: { hasTop: true }
    }
  ]
}
