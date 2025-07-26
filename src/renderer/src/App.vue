<template>
  <div class="app-container">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" v-if="alive" :key="$route.path" />
      </KeepAlive>

      <Component :is="Component" v-if="!alive" />
    </RouterView>
  </div>
</template>

<script setup lang="ts">
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
}
</style>
