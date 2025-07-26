import { readdir, stat } from 'fs/promises'
import { exiftool } from 'exiftool-vendored'
import { formatDate } from './index'
import { FileInfo, IMAGE_EXTS, VIDEO_EXTS } from '../../common/types'

/** 获取文件信息 */
export async function getFileInfo(file: string, dir: string) {
  /** 路径 */
  const path = `${dir}\\${file}`

  const info: FileInfo = new FileInfo({
    fullName: file,
    dir,
    path
  })

  try {
    const fStat = await stat(path)

    const { size, atime, mtime, ctime, birthtime } = fStat

    // 格式化时间值
    const times = Object.fromEntries(
      Object.entries({ atime, mtime, ctime, birthtime }).map(([key, value]) => [
        key,
        formatDate(value)
      ])
    )

    Object.assign(
      info,
      {
        isFile: fStat.isFile(),
        size
      },
      times
    )
  } catch (e) {
    console.error(e)
  }

  return info
}

/** 获取文件夹下文件列表 选项 */
export interface getDirFilesOption {
  dir: string
  ignoreDir?: boolean
  accept?: string[]
}

/** 获取文件夹下文件列表 */
export async function getDirFiles({ dir, ignoreDir = true, accept }: getDirFilesOption) {
  const paths = await readdir(dir)

  let files = await Promise.all(paths.map((file) => getFileInfo(file, dir)))

  // 是否忽略文件夹
  if (ignoreDir) {
    files = files.filter((file) => file.isFile)
  }

  /** 过滤类型 */
  if (accept?.length) {
    files = files.filter((file) => accept.includes(file.extName))
  }

  return files
}

/** 获取文件标签 */
export function getFileTags(file: string) {
  return exiftool.read(file)
}

/** 获取文件夹下媒体文件列表 */
export function getDirMedias(dir: string) {
  return getDirFiles({ dir, accept: [...IMAGE_EXTS, ...VIDEO_EXTS] })
}
