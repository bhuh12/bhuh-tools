import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

const alias = {
  '@': resolve('src/renderer/src'),
  '@common': resolve('src/common')
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "@/assets/css/global.scss" as *;
          `
        }
      }
    },
    resolve: {
      alias
    },
    plugins: [vue()]
  }
})
