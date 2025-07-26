import { formatDate, formatDuration } from '../utils'
import FileInfo from './FileInfo'

/** 图片文件后缀 */
export const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff']

/** 视频文件后缀 */
export const VIDEO_EXTS = ['mp4', 'mkv', 'avi', 'mov']

/** 媒体文件信息 */
export class MediaInfo extends FileInfo {
  constructor(data: Partial<FileInfo>) {
    super(data)

    Object.assign(this, data)
  }

  /** 是否图片 */
  get isImage() {
    return IMAGE_EXTS.includes(this.extName)
  }

  /** 是否视频 */
  get isVideo() {
    return VIDEO_EXTS.includes(this.extName)
  }

  /** 媒体创建时间 */
  mediaDate = ''

  /** 媒体尺寸 */
  mediaSize = ''

  /** 视频时长 */
  duration = 0

  /** 视频时长显示 */
  get durationDisplay() {
    return formatDuration(this.duration)
  }

  /** 导出时间（文件名时间戳） */
  get exportDate() {
    const { fileName } = this
    const isTS = /^\D*(\d{13})\D*$/.test(fileName)

    if (!isTS) return ''

    const ts = +fileName.replace(/\D+/g, '')

    return formatDate(ts)
  }
}
