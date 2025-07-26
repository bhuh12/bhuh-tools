import '@/assets/css/main.scss'

import { createApp } from 'vue'
import router from './plugins/router'
import './plugins/color4Bg'
import App from './App.vue'

createApp(App).use(router).mount('#app')
