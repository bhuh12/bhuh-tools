<template>
  <n-layout-header class="app-header" bordered>
    <div class="app-header__left">
      <img :src="APP_ICON" alt="logo" class="logo" />
      <n-h2 class="title">{{ APP_NAME }}</n-h2>
    </div>

    <AppTools />
  </n-layout-header>
</template>

<script setup lang="ts" name="AppHeader">
import { APP_NAME, APP_ICON } from '@/const'
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 12px;
  backdrop-filter: blur(4px);

  &__left {
    display: flex;
    align-items: center;

    .logo {
      width: 40px;
      height: 40px;
      transition: filter 300ms;
      will-change: filter;
      -webkit-user-drag: none;

      &:hover {
        filter: drop-shadow(0 0 1.2em #6988e6aa);
      }
    }

    .title {
      margin: 0 0 0 12px;
      font-size: 18px;
      line-height: 28px;
    }
  }
}
</style>
