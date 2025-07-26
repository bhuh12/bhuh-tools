import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
// @ts-ignore - no types available for this plugin
import vue from '@vitejs/plugin-vue'
// @ts-ignore - no types available for this plugin
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

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
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json'
        }
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  }
})
