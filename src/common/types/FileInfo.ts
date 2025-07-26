import { formatSize } from '../utils'

/** 文件信息 */
export default class FileInfo {
  constructor(data: Partial<FileInfo>) {
    Object.assign(this, data)
  }

  /** 完整文件名称 */
  fullName = ''

  /** 文件名称 */
  get fileName() {
    // 获取文件名和扩展名
    const [, fileName] = (/^(.*)(\.([^.]+))$/.exec(this.fullName) || []) as string[]
    return fileName
  }

  /** 文件后缀 */
  get extName() {
    // 获取文件名和扩展名
    const [, , , extName] = (/^(.*)(\.([^.]+))$/.exec(this.fullName) || []) as string[]

    return (extName || '').toLowerCase()
  }

  /** 是否文件 */
  isFile = true

  /** 目录 */
  dir = ''

  /** 文件路径 */
  path = ''

  /** 文件地址：`file:///` */
  get src() {
    return `file:///${this.path.replace(/\\/g, '/')}`
  }

  /** 文件大小 */
  size = 0

  /** 文件大小 - 展示 */
  get sizeDisplay() {
    return formatSize(this.size)
  }

  /** 最后访问时间 */
  atime = ''

  /** 最后修改时间 */
  mtime = ''

  /** 状态时间 */
  ctime = ''

  /** 创建时间 */
  birthtime = ''
}
