import '@/assets/css/main.scss'

import { createApp } from 'vue'
import router from './plugins/router'
import './plugins/color4Bg'
import App from './App.vue'

const app = createApp(App).use(router)

app.mount('#app')

// 挂载全局方法
app.config.globalProperties.$api = window.api
