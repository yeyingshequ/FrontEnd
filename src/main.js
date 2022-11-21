import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
<<<<<<< HEAD
import ElementUI from 'element-ui';
//引入element ui
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
import '@/assets/element-variables.scss';
import '@/assets/css/base.scss';
import CmtyCard from '@/components/CmtyCard';
Vue.component('CmtyCard',CmtyCard);
import Tab from '@/components/Tab';
Vue.component('Tab',Tab);
import PostCard from '@/components/PostCard';
Vue.component(PostCard.name,PostCard);
import Notification from '@/components/Notification';
Vue.component('Notification',Notification);
import Tools from '@/components/Tools';
Vue.component('Tools',Tools);
import store from "@/store";





Vue.config.productionTip = false
Vue.use(ElementUI);
=======
import ElementUI from 'element-ui'
//引入element ui
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'
import '@/assets/element-variables.scss'
import '@/assets/css/base.scss'
import CmtyCard from '@/components/CmtyCard'
Vue.component('CmtyCard', CmtyCard)
import Tab from '@/components/Tab'
Vue.component('Tab', Tab)
import PostCard from '@/components/PostCard'
Vue.component(PostCard.name, PostCard)
import Notification from '@/components/Notification'
Vue.component('Notification', Notification)
import Tools from '@/components/Tools'
Vue.component('Tools', Tools)
import store from '@/store'

Vue.config.productionTip = false
Vue.use(ElementUI)
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
const mv = new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
<<<<<<< HEAD
  render: h => h(App),
  router,
  store
}).$mount('#app')


=======
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
