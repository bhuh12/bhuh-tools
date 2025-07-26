import { createDiscreteApi } from 'naive-ui'
import type { DialogOptions } from 'naive-ui'
import { nativeProvider } from '@/plugins/nativeUI'
import { createPromise, waitPromise } from './promise'

/**
 * Naive UI 脱离上下文的 API
 * @description 用于 MessageBox、Notification 等组件全局使用
 * @link https://www.naiveui.com/zh-CN/light/components/discrete
 */

const {
  message: Message,
  notification: Notification,
  loadingBar: loadingBar,
  dialog: Dialog,
  modal: Modal
} = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar', 'modal'], {
  configProviderProps: computed(() => nativeProvider)
})

/** 消息框通用封装 */
function msgBox(content: string, title: string = '', options: DialogOptions = {}) {
  const { promise, resolve, reject } = createPromise<boolean>()
  const type = options.type || 'warning'

  Dialog[type]({
    title,
    content,
    ...options,
    onPositiveClick: () => resolve(true),
    onNegativeClick: () => reject('cancel'),
    onClose: () => reject('close')
  })

  return waitPromise(promise)
}

/** 确认消息 */
function confirm(content: string, title: string = '', options: DialogOptions = {}) {
  return msgBox(content, title, {
    type: 'warning',
    positiveText: '确定',
    negativeText: '取消',
    ...options
  })
}

/** 提示消息 */
function alert(content: string, title: string = '', options: DialogOptions = {}) {
  return msgBox(content, title, { type: 'info', positiveText: '确定', ...options })
}

/** 消息框 */
const MessageBox = { msgBox, confirm, alert }

/** 消息提示 */
export { Message, MessageBox, Notification, loadingBar, Dialog, Modal }
