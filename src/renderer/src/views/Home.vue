<template>
  <div class="page-home">
    <img alt="logo" class="logo" :src="APP_ICON" />

    <h1 class="title">{{ APP_NAME }}</h1>

    <Versions />
  </div>
</template>

<script setup lang="ts">
import { APP_NAME, APP_ICON } from '@/const'
</script>

<style lang="scss" scoped>
.page-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 600px;
  height: 100%;
  min-height: 320px;
}

.logo {
  width: 128px;
  height: 128px;
  margin-bottom: 20px;
  transition: filter 300ms;
  will-change: filter;
  -webkit-user-drag: none;

  &:hover {
    filter: drop-shadow(0 0 1.2em #6988e6aa);
  }
}

.title {
  margin-bottom: 40px;
}
</style>
