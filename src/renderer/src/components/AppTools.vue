<template>
  <div class="app-tools">
    <div class="setting-bar">
      <n-switch
        v-model:value="themeSettings.type"
        checked-value="dark"
        unchecked-value="light"
        size="large"
      >
        <template #checked-icon>
          <n-icon :component="Moon" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="Sunny" />
        </template>
      </n-switch>
    </div>

    <div class="title-bar">
      <n-icon class="title-bar__btn" @click="() => $api.minimizeWindow()"><RemoveOutline /></n-icon>

      <n-icon
        class="title-bar__btn"
        :class="{ 'is-maximized': isMaximized }"
        @click="() => $api.maximizeToggle()"
      >
        <CopyOutline v-if="isMaximized" />
        <StopOutline v-else />
      </n-icon>

      <n-icon class="title-bar__btn is-danger" @click="() => $api.closeWindow()">
        <CloseOutline />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts" name="AppTools">
import {
  Moon,
  Sunny,
  RemoveOutline,
  StopOutline,
  CopyOutline,
  CloseOutline
} from '@vicons/ionicons5'
import { themeSettings } from '@/plugins/nativeUI'

/** 是否最大化 */
const isMaximized = ref(true)

/** 切换最大化 */
window.api.onMaximizeToggle((val) => (isMaximized.value = val))
</script>

<style lang="scss" scoped>
.app-tools {
  display: flex;
  gap: 24px;
  align-items: center;
  // 禁用窗口拖动
  app-region: no-drag;
}

.setting-bar {
  .n-switch {
    &.n-switch--active :deep(.n-switch__rail) {
      background-color: rgba(#fff, 0.1);

      .n-switch__button-icon {
        color: #767c82;
      }
    }

    &:focus :deep(.n-switch__rail) {
      box-shadow: 0 0 0 2px rgba(#fff, 0.2);
    }
  }
}

.title-bar {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;

  &__btn {
    $size: 30px;

    --btn-bgcolor: rgb(255 255 255 / 10%);
    --btn-bgcolor-hover: rgb(255 255 255 / 20%);
    --btn-bgcolor-danger: rgb(255 0 0 / 50%);

    .is-theme-light & {
      --btn-bgcolor: rgb(0 0 0 / 15%);
      --btn-bgcolor-hover: rgb(0 0 0 / 25%);
      --btn-bgcolor-danger: rgb(255 0 0 / 75%);
    }

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: $size;
    height: $size;
    font-size: 20px;
    line-height: $size;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background-color: var(--btn-bgcolor);
    transition: all 0.25s ease;

    &.is-maximized {
      font-size: 18px;
      transform: rotateY(180deg);
    }

    &:hover {
      background-color: var(--btn-bgcolor-hover);
    }

    &.is-danger:hover {
      background-color: var(--btn-bgcolor-danger);
    }
  }
}
</style>
