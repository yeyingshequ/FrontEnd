import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
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
const mv = new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')


