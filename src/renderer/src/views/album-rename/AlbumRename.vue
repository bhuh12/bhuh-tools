<template>
  <div class="app-page album-rename">
    <header class="album-rename__hd">
      <div class="album-rename__hd-left">
        <AlbumDir v-model="dir" :count="table.data.length" @reload="loadFiles" @reset="reset" />

        <AlbumMulti :table="table" @reload="loadFiles" />
      </div>

      <div class="album-rename__hd-right">
        <n-button
          type="primary"
          rounded
          :disabled="!willRenames.length || progress !== -1"
          @click="rename"
        >
          <template #icon>
            <n-icon>
              <Create />
            </n-icon>
          </template>

          重命名<template v-if="progress < 0">({{ willRenames.length }})</template>
        </n-button>
      </div>

      <n-progress
        v-if="progress > 0"
        class="album-rename__progress"
        type="line"
        :percentage="progress * 100"
        :show-indicator="false"
        :height="54"
        :border-radius="0"
        fill-border-radius="0 4px 4px 0"
        :color="{ stops: ['rgba(99, 226, 184, 0.2)', 'rgba(99, 226, 184, 0.4)'] }"
      />
    </header>

    <n-data-table
      v-model:checked-row-keys="table.checkedKeys"
      class="album-rename__table"
      size="small"
      :columns="table.columns"
      :data="table.data"
      :row-key="table.rowKey"
      :row-props="rowProps"
      :loading="table.loading"
      :bordered="false"
      :scroll-x="1800"
      virtual-scroll
      flex-height
    />
  </div>

  <AlbumOperate
    :visible="operation.type === 'contextmenu' && !!operation.item"
    :file="operation.item"
    :position="operation.contextmenu"
    @close="operation.clear"
    @reload="loadFiles"
  />

  <MediaViewer v-if="viewer.visible" v-bind="viewer.props" @close="viewer.visible = false" />
</template>

<script setup lang="tsx" name="AlbumRename">
import { Create } from '@vicons/ionicons5'

import { MediaItem } from './MediaItem'

import { formatDate, Message, MessageBox } from '@/utils'
import useTable from '@/utils/useTable'

import AlbumDir from './AlbumDir.vue'
import AlbumMulti from './AlbumMulti.vue'
import AlbumOperate from './AlbumOperate.vue'
import MediaViewer from '@/components/MediaViewer.vue'

/** 文件夹 */
const dir = ref('')

/** 进度 */
const progress = ref(-1)

/** 监听进度更新任务栏进度条 */
watch(progress, (val) => {
  window.api.setProgressBar(val)

  if (val === 1) {
    setTimeout(() => {
      progress.value = -1
    }, 100)
  }
})

/** 加载文件列表 */
async function loadFiles() {
  table.loading = true

  try {
    const dirPath = dir.value

    if (!dirPath) return

    table.data = (await window.api.getDirMedias(dirPath)).map((item) => {
      const mItem = new MediaItem(item)
      mItem.getError = getError
      return mItem
    })

    table.clearSelection()

    loadTags()
  } finally {
    table.loading = false
  }
}

/** 获取文件标签信息 */
function loadTags() {
  const data = table.data
  const total = data.length
  let done = 0

  if (!total) return

  data.forEach((item) => {
    window.api
      .getFileTags(item.path)
      .then((tags) => updateMediaInfo(item, tags))
      .finally(() => {
        requestAnimationFrame(() => {
          progress.value = ++done / total
        })
      })
  })
}

/** 获取错误消息 */
function getError(item: MediaItem) {
  const { data } = table
  const index = data.indexOf(item)

  // 检测前面的文件是否存在同名文件
  if (index > 0 && data.some((prev, i) => prev.newName === item.newName && i < index)) {
    return `文件名重复，请修改！否则相同文件名会被覆盖。`
  }

  return ''
}

/** 更新媒体信息 */
function updateMediaInfo(item: MediaItem, tags: any) {
  const { MediaCreateDate, CreateDate } = tags
  let { Duration } = tags

  if (typeof Duration === 'object') {
    Duration = Duration.Scale * Duration.Value
  }

  const mediaDate =
    (MediaCreateDate instanceof Date && MediaCreateDate) ||
    (CreateDate instanceof Date && CreateDate) ||
    null

  Object.assign(item, {
    mediaSize: tags.ImageSize || '',
    mediaDate: mediaDate ? formatDate(mediaDate) : '',
    duration: Duration || 0
  } as Partial<MediaItem>)
}

/** 重置 */
function reset() {
  dir.value = ''
  table.data = []
  table.clearSelection()
}

/** 表格 */
const table = useTable<MediaItem>({
  rowKey: 'path',
  columns: [
    {
      type: 'selection',
      options: ['all', 'none']
    },
    {
      title: '缩略图',
      key: 'src',
      fixed: 'left',
      width: 100,
      render: (row) => (
        <div class="thumb" title="预览" onClick={() => viewer.open(row)}>
          {(row.isImage && <n-image object-fit="contain" lazy src={row.src} />) ||
            (row.isVideo && <video src={row.src} />)}
        </div>
      )
    },
    {
      title: '原文件名',
      key: 'fullName',
      fixed: 'left',
      width: 220,
      sorter: 'default',
      defaultSortOrder: 'ascend',
      ellipsis: { tooltip: true },
      render: (row) => (
        <n-button text tag="a" title="查看文件" onClick={() => window.api.openPath(row.path)}>
          {row.fullName}
        </n-button>
      )
    },
    {
      title: '媒体创建时间',
      key: 'mediaDate',
      width: 170,
      sorter: 'default'
    },
    {
      title: '最后修改',
      key: 'mtime',
      width: 170,
      sorter: 'default'
    },
    {
      title: '导出时间',
      key: 'exportDate',
      width: 170,
      sorter: 'default'
    },
    {
      title: '尺寸',
      key: 'mediaSize',
      width: 140,
      sorter: 'default'
    },
    {
      title: '大小',
      key: 'sizeDisplay',
      width: 120,
      sorter: (a, b) => a.size - b.size
    },
    {
      title: '视频时长',
      key: 'durationDisplay',
      width: 120,
      sorter: (a, b) => a.duration - b.duration
    },
    {
      title: '新文件名',
      key: 'newName',
      fixed: 'right',
      width: 200,
      sorter: 'default',
      filterMultiple: true,
      filterOptions: [
        {
          label: '即将重命名',
          value: 'warning'
        },
        {
          label: '无需重命名',
          value: 'info'
        },
        {
          label: '重命名错误',
          value: 'error'
        }
      ],
      filter(value, row) {
        return row.result.type === value
      },
      render: (row) => {
        const { newName } = row
        const { type, message } = row.result

        return (
          <n-tooltip
            v-slots={{
              default: () => message,
              trigger: () =>
                type === 'info' ? newName : <n-gradient-text type={type}>{newName}</n-gradient-text>
            }}
          />
        )
      }
    }
  ]
})

const rowProps = (row: MediaItem) => ({
  onContextmenu: async (e: MouseEvent) => {
    e.preventDefault()
    operation.clear()

    await nextTick()

    operation.set(row, 'contextmenu')
    operation.contextmenu = { x: e.clientX, y: e.clientY }
  }
})

/** 将要重命名的文件列表 */
const willRenames = computed(() => table.data.filter((item) => item.willRename))

/** 重命名 */
async function rename() {
  const list = willRenames.value
  const total = list.length

  if (list.some((item) => item.error)) {
    Message.error(`存在错误的文件，请检查！`)
    return
  }

  const [, confirmed] = await MessageBox.confirm(
    `您即将重命名 ${total} 个文件，操作无法撤销，请确认！`,
    '操作确认',
    {
      type: 'error'
    }
  )

  if (!confirmed) return

  let failed = 0

  table.loading = true

  try {
    await Promise.all(
      list.map((item) =>
        window.api.renamePath(item.path, item.dir + '/' + item.newName).catch(() => failed++)
      )
    )
  } finally {
    table.loading = false
  }

  let msg = `已为您重命名 ${total} 个文件`

  if (failed) msg += `，失败 ${failed} 个。`

  Message.success(msg)

  loadFiles()
}

/** 操作 */
const operation = reactive({
  /** 操作项 */
  item: undefined as undefined | MediaItem,

  /** 操作类型 */
  type: '' as '' | 'view' | 'contextmenu',

  /** 右键菜单坐标 */
  contextmenu: { x: 0, y: 0 },

  /** 设置操作 */
  set(item: typeof operation.item, type: typeof operation.type) {
    operation.item = item
    operation.type = type
  },

  /** 清理操作 */
  async clear() {
    operation.set(undefined, '')
  }
})

/** 查看 */
const viewer = reactive({
  /** 打开预览 */
  open(item: MediaItem) {
    if (item.isImage) return

    operation.set(item, 'view')
  },

  /** 是否显示 */
  visible: computed({
    set: (val) => {
      if (!val) operation.clear()
    },
    get: () => !!operation.item && operation.type === 'view'
  }),

  /** 参数 */
  props: computed<InstanceType<typeof MediaViewer>['$props']>(() => {
    const item = operation.item

    return {
      src: item?.src || '',
      type: item?.isImage ? 'image' : 'video',
      title: item?.fullName || ''
    }
  })
})
</script>

<style lang="scss" scoped>
.album-rename {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.album-rename__hd {
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  &-left {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .album-rename__progress {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
  }
}

.album-rename__table {
  flex: 1;
  background: transparent;
}

:deep(.thumb) {
  $size: 56px;

  width: $size;
  height: $size;
  cursor: pointer;
  outline: 1px solid transparent;
  outline-offset: 1px;
  transition: all 0.2s ease-in-out;

  &:hover {
    outline-color: rgb($theme-primary, 0.8);
    background-color: rgb($theme-primary, 0.1);
  }

  &:active {
    background-color: rgb($theme-primary, 0.2);
  }

  video,
  img {
    display: block;
    width: $size;
    height: $size;
  }
}
</style>
