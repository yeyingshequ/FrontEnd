import { createApp } from 'vue'
import router from './router/index'
import App from '@/App.vue'
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import elementResizeDetectorMaker from 'element-resize-detector';

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const pinia = createPinia();

app.use(pinia).use(router).use(ElementPlus).mount('#app')



