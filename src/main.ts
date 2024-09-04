import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// for testing components with vite
// npm run dev
// to test the component in a standalone environmentcreateApp(App)
//   .use(router)
//   .mount('#app')
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(ElementPlus).mount('#app')
