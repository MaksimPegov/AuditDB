let delayTimer: any = null
export function doAfterDelay(fn: () => void, delay = 1000) {
  clearTimeout(delayTimer)
  delayTimer = setTimeout(function () {
    fn()
  }, delay)
}
