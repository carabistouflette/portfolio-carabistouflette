import { onMounted, type Ref } from 'vue'

interface AnimationConfig {
  element: Ref<HTMLElement | undefined>
  animation: string
  delay?: number
  removeClasses?: string[]
  addClasses?: string[]
}

/**
 * Composable for preloading animations to prevent flash of unstyled content (FOUC)
 * and ensure smooth animation initialization
 */
export const usePreloadAnimations = () => {
  /**
   * Preloads animations by applying initial states and then triggering animations
   * after the DOM is ready
   */
  const preloadAnimations = (animations: AnimationConfig[]) => {
    onMounted(() => {
      // Apply initial opacity-0 state immediately after mount to prevent FOUC
      animations.forEach(({ element }) => {
        if (element.value && element.value.classList && !element.value.classList.contains('opacity-0')) {
          element.value.style.opacity = '0'
        }
      })
      // Double requestAnimationFrame to ensure paint has happened
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animations.forEach(({ element, animation, delay = 0, removeClasses = [], addClasses = [] }) => {
            setTimeout(() => {
              if (element.value) {
                // Remove initial opacity style
                element.value.style.opacity = ''
                
                // Remove specified classes
                if (removeClasses.length > 0) {
                  element.value.classList.remove(...removeClasses)
                }
                
                // Add animation classes
                element.value.classList.add(...animation.split(' '))
                
                // Add additional classes if specified
                if (addClasses.length > 0) {
                  element.value.classList.add(...addClasses)
                }
              }
            }, delay)
          })
        })
      })
    })
  }

  /**
   * Simple helper to add animations with stagger effect
   */
  const staggerAnimations = (
    elements: Ref<HTMLElement | undefined>[],
    animation: string,
    baseDelay = 0,
    staggerDelay = 100
  ) => {
    const animations: AnimationConfig[] = elements.map((element, index) => ({
      element,
      animation,
      delay: baseDelay + (index * staggerDelay)
    }))
    
    preloadAnimations(animations)
  }

  return {
    preloadAnimations,
    staggerAnimations
  }
}