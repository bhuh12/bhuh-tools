import { ipcRenderer } from 'electron'
import type { getDirFilesOption } from '../../main/utils'

/** 文件相关 API */
export default {
  /** 打开文件或文件夹 */
  openPath: (path: string) => ipcRenderer.invoke('shell:openPath', path),

  /** 在文件夹中显示文件 */
  showItemInFolder: (path: string) => ipcRenderer.invoke('shell:showItemInFolder', path),

  /** 移动文件或文件夹到回收站 */
  trashItem: (path: string) => ipcRenderer.invoke('shell:trashItem', path),

  /** 重命名文件或文件夹 */
  renamePath: (path: string, newPath: string) => ipcRenderer.invoke('fs:renamePath', path, newPath),

  /** 选择文件或文件夹 */
  selectFileOrDir: () => ipcRenderer.invoke('fs:selectFileOrDir'),

  /** 获取文件夹下文件列表 */
  getDirFiles: (opt: getDirFilesOption) => ipcRenderer.invoke('fs:getDirFiles', opt),

  /** 获取文件夹下媒体文件列表 */
  getDirMedias: (dir: string) => ipcRenderer.invoke('fs:getDirMedias', dir),

  /** 获取文件标签 */
  getFileTags: (file: string) => ipcRenderer.invoke('fs:getFileTags', file)
}
