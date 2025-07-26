<template>
  <n-dropdown :options="options" trigger="hover" :disabled="!count">
    <n-button :disabled="!count">
      <template #icon>
        <n-icon>
          <CheckboxOutline />
        </n-icon>
      </template>

      批量操作
      <template v-if="count"
        >(<span class="text-primary">{{ count }}</span
        >)</template
      >
    </n-button>
  </n-dropdown>
</template>

<script setup lang="ts" name="AlbumMulti">
import { CheckboxOutline, RemoveCircle, Trash } from '@vicons/ionicons5'

import { getDropdownOptions, Message, MessageBox } from '@/utils'
import useTable from '@/utils/useTable'

import { MediaItem } from './MediaItem'

/** 参数 */
const props = defineProps({
  /** 目录 */
  table: {
    type: Object as PropType<ReturnType<typeof useTable<MediaItem>>>,
    required: true
  }
})

/** 事件 */
const emit = defineEmits({
  /** 刷新 */
  reload: () => void 0
})

/** 选中数量 */
const count = computed(() => props.table.selected.length)

/** 文件夹操作菜单 */
const options = getDropdownOptions([
  {
    label: '移出列表',
    icon: RemoveCircle,
    onClick: async () => {
      const [, confirmed] = await MessageBox.confirm(
        `是否将选中的 ${count.value} 个文件移出列表？`,
        '操作确认'
      )

      if (!confirmed) return

      const { table } = props

      table.selected.forEach((item) => table.removeItem(item))

      table.clearSelection()

      Message.success('选中文件已成功移出列表！')
    }
  },
  {
    label: '移动到回收站',
    icon: Trash,

    onClick: async () => {
      const [, confirmed] = await MessageBox.confirm(
        `是否将选中的 ${count.value} 个文件移动到回收站？`,
        '操作确认',
        {
          type: 'error'
        }
      )

      if (!confirmed) return

      const { table } = props

      await Promise.all(table.selected.map((item) => window.api.trashItem(item.path)))

      table.clearSelection()

      Message.success('选中文件已成功移动到回收站！')

      emit('reload')
    }
  }
])
</script>
