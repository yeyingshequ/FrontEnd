import Setting from '@/pages/Setting/index.vue'
import Password from '@/pages/Setting/Password/index.vue'
/* import Account from '@/pages/Setting/Account/index.vue' */

export default {
  name: 'Setting',
  path: '/setting',
  component: Setting,
  children: [
    {
      name: 'Password',
      path: 'password',
      component: Password,
    },
    /* {
      name: 'Account',
      path: 'account',
      component: Account,
    }, */
  ],
}
