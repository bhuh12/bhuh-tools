import window from './window'
import file from './file'

// 自定义 API
const api = {
  ...window,
  ...file
}

export type API = typeof api

export default api
