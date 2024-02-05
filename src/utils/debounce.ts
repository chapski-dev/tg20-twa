type DebounceFunction = <T extends (...args: any[]) => any>(
  func: T,
  timeout?: number
) => (...args: Parameters<T>) => void

export const debounce: DebounceFunction = (func, timeout = 1000) => {
  let timer: NodeJS.Timeout

  return (...args: Parameters<typeof func>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
