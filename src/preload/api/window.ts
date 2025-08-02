import { ipcRenderer } from 'electron'

/** 窗口相关 API */
export default {
  /** 最小化窗口 */
  minimizeWindow: () => ipcRenderer.invoke('window.minimize'),

  /** 最大化窗口切换 */
  maximizeToggle: () => ipcRenderer.invoke('window.maximizeToggle'),

  /** 监听窗口最大化切换 */
  onMaximizeToggle: (callback: (isMaximized: boolean) => void) =>
    ipcRenderer.on('window:maximize', (_event, value) => callback(value)),

  /** 关闭窗口 */
  closeWindow: () => ipcRenderer.invoke('window.close'),

  /** 设置任务栏进度条 */
  setProgressBar: (progress: number) => ipcRenderer.invoke('window.setProgressBar', progress)
}
