<template>
  <div class="app-tools">
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
</template>

<script setup lang="ts" name="AppTools">
import { Moon, Sunny } from '@vicons/ionicons5'
import { themeSettings } from '@/plugins/nativeUI'
</script>

<style lang="scss" scoped>
.app-tools {
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
</style>
