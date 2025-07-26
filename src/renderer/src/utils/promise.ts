/** 创建 Promise 对象 */
export function createPromise<T>() {
  let resolve = null as unknown as (value: T | PromiseLike<T>) => void
  let reject = null as unknown as (reason?: any) => void

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  return { promise, resolve, reject }
}

/** 等待 Promise 对象，同时返回错误和结果 */
export async function waitPromise<T>(promise: Promise<T>) {
  let result: T = null as unknown as T
  let error: unknown
  try {
    result = await promise
  } catch (err) {
    error = err
  }

  return [error, result] as const
}
