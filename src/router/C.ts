
/* 社区模板 */
export default {
  name: 'C',
  path: '/c/:cmtyId',
  component: () => import('@/pages/C/C.vue'),
  redirect: (to: any) => {
    //console.log("to:", to);
    return '/c/' + to.params.cmtyId + '/home'
  },
  children: [
    {
      name: 'CmtyHome',
      path: 'home',
      component: () => import('@/pages/C/CmtyHome/index.vue'),
      meta: { hasTop: true }
    }
  ]
}
