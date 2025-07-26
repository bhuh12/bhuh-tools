<template>
  <n-config-provider v-bind="nativeProvider">
    <n-layout class="app-container" :class="`is-theme-${themeSettings.type}`">
      <AppHeader />

      <n-layout has-sider>
        <AppSide />

        <n-layout-content>
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <Component :is="Component" v-if="alive" :key="$route.path" />
            </KeepAlive>

            <Component :is="Component" v-if="!alive" />
          </RouterView>
        </n-layout-content>
      </n-layout>

      <AppFooter />
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { nativeProvider, themeSettings } from '@/plugins/nativeUI'

const route = useRoute()

interface RouteMeta {
  title?: string
  alive?: boolean
}

/** 路由元数据 */
const meta = computed(() => route.meta as RouteMeta)

/** 当前组件是否缓存 */
const alive = computed(() => meta.value.alive !== false)
</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  > :deep(.n-layout-scroll-container) {
    display: flex;
    flex-direction: column;
  }
}
</style>
