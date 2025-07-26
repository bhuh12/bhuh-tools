import { ipcMain, dialog, BrowserWindow, shell } from 'electron'
import { rename } from 'fs/promises'
import { ExifDateTime } from 'exiftool-vendored'
import { getDirFiles, getDirMedias, getFileTags } from '../utils'

/** 文件相关 API */
export default function initFileApi(mainWindow: BrowserWindow) {
  /** 打开文件或文件夹 */
  ipcMain.handle('shell:openPath', async (_e, path: string) => shell.openPath(path))

  /** 在文件夹中显示文件 */
  ipcMain.handle('shell:showItemInFolder', async (_e, path: string) => shell.showItemInFolder(path))

  /** 移动文件或文件夹到回收站 */
  ipcMain.handle('shell:trashItem', async (_e, path: string) => shell.trashItem(path))

  /** 选择文件或文件夹 */
  ipcMain.handle('fs:selectFileOrDir', async () => {
    const { filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    })

    return filePaths[0] || ''
  })

  /** 获取文件夹下文件列表 */
  ipcMain.handle('fs:getDirFiles', async (_e, option) => getDirFiles(option))

  /** 获取文件夹下媒体文件列表 */
  ipcMain.handle('fs:getDirMedias', async (_e, dir: string) => getDirMedias(dir))

  /** 获取文件夹下媒体文件列表 */
  ipcMain.handle('fs:getFileTags', async (_e, file: string) => {
    const tags = await getFileTags(file)

    for (const k in tags) {
      const val = tags[k]

      if (val instanceof ExifDateTime) {
        tags[k] = val.toDate()
      }
    }

    return tags
  })

  /** 重命名文件或文件夹 */
  ipcMain.handle('fs:renamePath', async (_e, path: string, newPath: string) =>
    rename(path, newPath)
  )
}
