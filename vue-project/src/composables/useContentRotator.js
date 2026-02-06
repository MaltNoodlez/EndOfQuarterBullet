import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

export function useContentRotator(items, interval = 3000) {
  const currentIndex = ref(0)
  let timer = null

  const next = () => {
    if (!items.value.length) return
    currentIndex.value = (currentIndex.value + 1) % items.value.length
  }

  const start = () => {
    stop()
    timer = setInterval(next, interval)
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  watch(
    items,
    () => {
      currentIndex.value = 0
      start()
    },
    { deep: true },
  )

  onMounted(start)
  onBeforeUnmount(stop)

  return {
    currentIndex,
    next,
    start,
    stop,
  }
}
