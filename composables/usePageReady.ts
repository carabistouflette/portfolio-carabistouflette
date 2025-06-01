import { ref, onMounted, nextTick, computed } from 'vue'

/**
 * Composable to handle page ready state and batch animations
 */
const pageReadyState = ref(false)
const readyCallbacks: (() => void)[] = []

export const usePageReady = () => {
  const isReady = computed(() => pageReadyState.value)

  /**
   * Register a callback to be executed when the page is ready
   */
  const onReady = (callback: () => void) => {
    if (pageReadyState.value) {
      callback()
    } else {
      readyCallbacks.push(callback)
    }
  }
  
  /**
   * Manually set the page ready state
   */
  const setPageReady = (ready: boolean) => {
    pageReadyState.value = ready
    if (ready) {
      readyCallbacks.forEach(cb => cb())
      readyCallbacks.length = 0
    }
  }

  /**
   * Wait for page to be ready with all assets loaded
   */
  const waitForPageReady = async () => {
    await nextTick()
    
    // Wait for fonts to load
    if ('fonts' in document) {
      await document.fonts.ready
    }
    
    // Wait for images in viewport to load
    const images = Array.from(document.querySelectorAll('img'))
    const imagePromises = images
      .filter(img => {
        const rect = img.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      })
      .map(img => {
        if (img.complete) return Promise.resolve()
        return new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        })
      })
    
    await Promise.all(imagePromises)
    
    // Small delay to ensure everything is painted
    await new Promise(resolve => setTimeout(resolve, 50))
    
    pageReadyState.value = true
    readyCallbacks.forEach(cb => cb())
    readyCallbacks.length = 0
  }

  onMounted(() => {
    waitForPageReady()
  })

  return {
    isReady,
    onReady,
    setPageReady
  }
}