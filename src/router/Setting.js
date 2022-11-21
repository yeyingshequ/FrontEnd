<<<<<<< HEAD
import Setting from '@/pages/Setting';
import Password from "@/pages/Setting/Password";
import Account from "@/pages/Setting/Account";

export default {
    name: 'Setting',
    path: '/setting',
    component: Setting,
    children: [{
        name: "Password",
        path: "password",
        component: Password,
    },{
        name: "Account",
        path: "account",
        component: Account,
    }
    ]
}
=======
import Setting from '@/pages/Setting'
import Password from '@/pages/Setting/Password'
import Account from '@/pages/Setting/Account'

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
    {
      name: 'Account',
      path: 'account',
      component: Account,
    },
  ],
}
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
