/// <reference types="vite/client" />

export {}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  interface ComponentCustomProperties {
    // 全局 API
    $api: Window['api']
  }
}
