import type { DataTableColumns, PaginationProps } from 'naive-ui'

export default function useTable<T extends object>({
  rowKey,
  columns
}: {
  /** key 字段 */
  rowKey: string | ((row: T) => string)
  /** 表头数据 */
  columns: DataTableColumns<T>
}) {
  /** 列表数据 */
  const data: Ref<T[]> = ref([])

  /** 选中数据 key 列表 */
  const checkedKeys: Ref<string[]> = ref([])

  /** 选中数据 */
  const selected = computed(() => {
    const keys = checkedKeys.value
    return data.value.filter((item) => keys.includes(getRowKey(item)))
  })

  const getRowKey = (row: T) => (typeof rowKey === 'function' ? rowKey(row) : row[rowKey])

  /** 分页 */
  const pagination = reactive({
    page: 1,
    pageSize: 50,
    showSizePicker: true,
    pageSizes: [10, 20, 50, 100],
    onChange: (page: number) => {
      pagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.page = 1
    }
  } as PaginationProps)

  return reactive({
    /** 表头数据 */
    columns: columns as { title: string; key: string; width?: number }[],

    /** 列表数据 */
    data,

    /** 加载中 */
    loading: false,

    /** 分页 */
    pagination: pagination as {
      page: number
      pageSize: number
    },

    /** 获取行 key */
    rowKey: getRowKey,

    /** 选中数据 key 列表 */
    checkedKeys,

    /** 选中数据 */
    selected,

    /** 清除选中数据 */
    clearSelection() {
      checkedKeys.value = []
    },

    /** 移除项 */
    removeItem(item: T) {
      const list = data.value
      const index = list.indexOf(item)

      index !== -1 && list.splice(index, 1)
    }
  })
}
