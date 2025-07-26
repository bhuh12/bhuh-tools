<template>
  <n-dropdown :options="options" trigger="click">
    <n-tooltip trigger="hover" :disabled="!dir">
      {{ dir }}
      <template #trigger>
        <n-badge type="success" :value="count" color="rgba(225,116,238,0.6)">
          <n-button strong secondary type="error">
            <template #icon>
              <n-icon>
                <Folder v-if="dir" />
                <FolderOpen v-else />
              </n-icon>
            </template>

            <span class="folder-text">{{ dir || '选择文件夹' }}</span>
          </n-button>
        </n-badge>
      </template>
    </n-tooltip>
  </n-dropdown>
</template>

<script setup lang="ts" name="AlbumDir">
import { FolderOpen, Folder, Eye, SyncCircle, RefreshCircle } from '@vicons/ionicons5'
import { getDropdownOptions } from '@/utils'

/** 参数 */
const props = defineProps({
  /** 目录 */
  modelValue: {
    type: String,
    default: ''
  },

  /** 文件数量 */
  count: {
    type: Number,
    default: 0
  }
})

/** 事件 */
const emit = defineEmits({
  /** 刷新 */
  'update:modelValue': (val: string) => void val,

  /** 刷新 */
  reload: () => void 0,

  /** 重置 */
  reset: () => void 0
})

/** 目录 */
const dir = computed({
  set: (val: string) => emit('update:modelValue', val),

  get: () => props.modelValue
})

/** 文件夹操作菜单 */
const options = computed(() =>
  getDropdownOptions([
    {
      label: '选择文件夹',
      icon: FolderOpen,
      onClick: openDir
    },
    {
      label: '查看文件夹',
      icon: Eye,
      disabled: !props.modelValue,
      onClick: () => window.api.openPath(props.modelValue)
    },
    {
      label: '刷新',
      icon: SyncCircle,
      disabled: !props.modelValue,
      onClick: () => emit('reload')
    },
    {
      label: '重置',
      icon: RefreshCircle,
      disabled: !props.modelValue,
      onClick: () => emit('reset')
    }
  ])
)

/** 打开文件夹 */
async function openDir() {
  const dirPath = await window.api.selectFileOrDir()

  if (!dirPath) return

  dir.value = dirPath

  emit('reload')
}
</script>

<style lang="scss" scoped>
.folder-text {
  @include text-ellipsis;

  max-width: 300px;
}
</style>
