import type { BrowserWindow } from 'electron'

import initWindowApi from './window'

export default function intApi(mainWindow: BrowserWindow) {
  initWindowApi(mainWindow)
}
