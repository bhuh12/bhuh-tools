import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('../views/Home.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
