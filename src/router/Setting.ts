
/* import Account from '@/pages/Setting/Account/index.vue' */

export default {
  name: 'Setting',
  path: '/setting',
  component: () => import('@/pages/Setting/index.vue'),
  children: [
    {
      name: 'Password',
      path: 'password',
      component: () => import('@/pages/Setting/Password/index.vue'),
    },
    /* {
      name: 'Account',
      path: 'account',
      component: Account,
    }, */
  ],
}
