import { createApp } from 'vue'
import router from './router/index'
import App from '@/App.vue'
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import CmtyCard from '@/components/CmtyCard/index.vue'
import Tab from '@/components/Tab/index.vue'
import PostCard from '@/components/PostCard/index.vue'
import Notification from '@/components/Notification/index.vue'
import Tools from '@/components/Tools/index.vue'
import PostMune from '@/components/PostMenu/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const pinia = createPinia();
app.component("CmtyCard", CmtyCard)
    .component('Tab', Tab)
    .component('PostCard', PostCard)
    .component('Notification', Notification)
    .component('Tools', Tools)
    .component('PostMune', PostMune)
app.use(pinia).use(router).use(ElementPlus).mount('#app')



