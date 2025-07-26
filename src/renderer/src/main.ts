import '@/assets/css/main.scss'

import { createApp } from 'vue'
import router from './plugins/router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
