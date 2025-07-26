export * from '../../common/utils'
export * from './file'

/** 将一个普通函数转换为异步函数 */
export function pify<T extends any[], R = any>(
  fn: (...args: [...T, (error: unknown, data: R) => void]) => void
) {
  return (...args: T) => {
    return new Promise<R>((resolve, reject) => {
      fn(...args, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }
}
