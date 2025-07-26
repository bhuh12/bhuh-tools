import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    name: 'AlbumRename',
    path: '/album-rename',
    component: () => import('../views/album-rename/AlbumRename.vue'),
    meta: {
      title: '相册文件重命名'
    }
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
