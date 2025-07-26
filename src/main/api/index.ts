import type { BrowserWindow } from 'electron'

import initWindowApi from './window'
import initFileApi from './file'

export default function intApi(mainWindow: BrowserWindow) {
  initWindowApi(mainWindow)

  initFileApi(mainWindow)
}
