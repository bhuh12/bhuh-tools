import dayjs from 'dayjs'
import { DATE_FORMAT } from '../types'

/**
 * 日期格式化
 * @returns "YYYY-MM-DD HH:mm:ss"
 */
export function formatDate(date: Parameters<typeof dayjs>[0]) {
  return dayjs(date).format(DATE_FORMAT)
}

/**
 * 文件大小格式
 * @param size 文件大小
 * @returns string
 */
export function formatSize(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const unitIndex = Math.min(Math.floor(Math.log2(size) / 10), units.length - 1)
  const formattedSize = (size / Math.pow(1024, unitIndex)).toFixed(2).replace(/\.?0+$/, '')
  return `${formattedSize} ${units[unitIndex]}`
}

/**
 * 时长格式化：用 `:` 分隔时分秒
 * @param t 总秒数
 * @returns string
 * @example `01:56:08`
 */
export function formatDuration(t: number) {
  if (t <= 0) return ''

  return dayjs().startOf('day').second(t).format('HH:mm:ss')
}
