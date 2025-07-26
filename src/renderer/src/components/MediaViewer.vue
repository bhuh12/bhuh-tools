<template>
  <n-modal
    v-model:show="visible"
    class="media-viewer"
    preset="dialog"
    :title="title"
    :style="{ width: 'fit-content', height: 'fit-content' }"
    :icon="icon"
    @after-leave="$emit('close')"
  >
    <img v-if="type === 'image'" class="media-viewer__target media-viewer__img" :src="src" />

    <video
      v-else-if="type === 'video'"
      class="media-viewer__target media-viewer__video"
      :src="src"
      controls
      autoplay
    />
  </n-modal>
</template>

<script setup lang="ts" name="MediaViewer">
import { Videocam as VideoIcon, ImageOutline as ImageIcon } from '@vicons/ionicons5'
import { renderIcon } from '@/utils'

/** 参数 */
const props = defineProps({
  /** 地址 */
  src: String,

  /** 媒体类型 */
  type: {
    type: String as PropType<'image' | 'video'>
  },

  /** 标题 */
  title: String
})

defineEmits({
  close: () => void 0
})

/** 是否可见 */
const visible = ref(false)

onMounted(() => (visible.value = true))

/** 图标 */
const icon = computed(() => {
  const icon =
    (props.type === 'image' && ImageIcon) || (props.type === 'video' && VideoIcon) || undefined
  return renderIcon(icon)
})
</script>

<style lang="scss" scoped>
.media-viewer__target {
  $offset: 100px;

  display: block;
  width: fit-content;
  max-width: calc(100vw - #{$offset});
  height: fit-content;
  max-height: calc(100vh - #{$offset});
  margin: 0 auto;
}
</style>
