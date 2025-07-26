<template>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :show="visible"
    :x="position.x"
    :y="position.y"
    :options="options"
    :on-clickoutside="() => $emit('close')"
    @select="$emit('close')"
  />
</template>

<script setup lang="ts" name="AlbumOperate">
import { Eye, FolderOpen, SyncCircle, Trash } from '@vicons/ionicons5'

import { getDropdownOptions, Message, MessageBox } from '@/utils'

import { MediaInfo } from '@/types'

/** 参数 */
const props = defineProps({
  /** 是否显示 */
  visible: {
    type: Boolean,
    default: false
  },

  /** 文件数据 */
  file: {
    type: Object as PropType<MediaInfo>
  },

  /** 定位 */
  position: {
    type: Object as PropType<{ x: number; y: number }>,
    required: true
  }
})

/** 事件 */
const emit = defineEmits({
  /** 重新加载 */
  reload: () => void 0,

  /** 关闭 */
  close: () => void 0
})

/** 文件夹操作菜单 */
const options = getDropdownOptions([
  {
    label: '查看文件',
    icon: Eye,
    onClick: () => props.file && window.api.openPath(props.file.path)
  },
  {
    label: '在文件夹中显示',
    icon: FolderOpen,
    onClick: () => props.file && window.api.showItemInFolder(props.file.path)
  },
  {
    label: '移动到回收站',
    icon: Trash,
    onClick: async () => {
      const { file } = props
      if (!file) return

      const [, confirmed] = await MessageBox.confirm('是否将文件移动到回收站？', '操作确认', {
        type: 'error'
      })

      if (!confirmed) return

      await window.api.trashItem(file.path)

      Message.success('文件已成功移动到回收站！')

      emit('reload')
    }
  },
  {
    label: '刷新',
    icon: SyncCircle,
    onClick: () => emit('reload')
  }
])
</script>
