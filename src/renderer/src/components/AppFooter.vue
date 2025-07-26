<template>
  <n-layout-footer class="app-footer" bordered>
    <div>Copyright ©{{ year }}</div>
    <div>版权所有：{{ APP_AUTHOR }}</div>
    <a class="link" :href="APP_URL" target="_blank">项目主页</a>
  </n-layout-footer>
</template>

<script setup lang="ts" name="AppFooter">
import { APP_AUTHOR, APP_URL } from '@/const'

const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 24px;
  font-size: 12px;
  backdrop-filter: blur(4px);

  .link {
    color: $theme-primary;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.25s ease;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
