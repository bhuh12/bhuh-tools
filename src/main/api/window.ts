import { ipcMain, BrowserWindow } from 'electron'

/** 窗口相关 API */
export default function initWindowApi(mainWindow: BrowserWindow) {
  /** 最小化窗口 */
  ipcMain.handle('window.minimize', () => mainWindow.minimize())

  /** 切换最大化窗口 */
  ipcMain.handle('window.maximizeToggle', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  /** 发送最大化状态 */
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window:maximize', true)
  })

  /** 发送取消最大化状态 */
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window:maximize', false)
  })

  /** 关闭窗口 */
  ipcMain.handle('window.close', () => mainWindow.close())

  /** 设置任务栏进度条 */
  ipcMain.handle('window.setProgressBar', async (_e, progress: number) =>
    mainWindow.setProgressBar(progress)
  )
}
