import dayjs from 'dayjs'
import { MediaInfo, DATE_FORMAT } from '@common/types'

/** 格式化时间 */
function getDateTime(dateStr: string) {
  return dayjs(dateStr, DATE_FORMAT).toDate().getTime()
}

export class MediaItem extends MediaInfo {
  /** 最小时间 */
  get minDate() {
    const { mediaDate, exportDate, atime, mtime, ctime, birthtime } = this

    // 优先使用媒体时间
    if (mediaDate) return getDateTime(mediaDate)

    // 避免修改时间不精确导致文件名重复
    // 最后修改时间为 00 结尾，且导出时间包含修改时间，则使用导出时间
    if (/:00$/.test(mtime) && exportDate?.includes(mtime.replace(/:00$/, '')))
      return getDateTime(exportDate)

    return Math.min(
      ...[mediaDate, exportDate, atime, mtime, ctime, birthtime]
        .filter((v) => v)
        .map((v) => getDateTime(v))
    )
  }

  /** 获取新文件名 */
  get newName() {
    return `${dayjs(this.minDate).format('YYYY-MM-DD HH-mm-ss')}.${this.extName}`
  }

  /** 是否会重命名 */
  get willRename() {
    return this.fullName !== this.newName
  }

  /** 获取错误信息 */
  getError?: (item: MediaItem) => string | undefined

  /** 错误信息 */
  get error() {
    return this.getError?.(this)
  }

  /** 结果 */
  get result() {
    if (this.error) return { type: 'error', message: this.error }

    if (this.willRename) return { type: 'warning', message: `文件名将被重命名为 "${this.newName}"` }

    return { type: 'info', message: '文件名无需修改' }
  }
}
