import { useIntersectionObserver } from '@vueuse/core'

/**
 * Composable to add animation classes to elements when they enter the viewport
 */
export const useAnimation = () => {
  /**
   * Apply animation to an element when it enters the viewport
   * @param target - The target element reference
   * @param animationClass - The animation class to apply
   * @param threshold - Intersection threshold (0-1)
   * @param delay - Animation delay in milliseconds
   */
  const animateOnScroll = (
    target: Ref<HTMLElement | null>, 
    animationClass: string, 
    threshold = 0.1, 
    delay = 0
  ) => {
    // Before animation state
    const initialClasses = 'opacity-0 transition-all duration-700 ease-out'
    
    let hasAnimated = false
    
    // Setup intersection observer
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting && !hasAnimated) {
          hasAnimated = true
          
          // Apply initial classes immediately
          if (target.value) {
            target.value.classList.add(...initialClasses.split(' '))
          }
          
          // Apply animation class after delay
          setTimeout(() => {
            if (target.value) {
              target.value.classList.remove('opacity-0')
              target.value.classList.add(animationClass)
            }
          }, delay)
        }
      },
      { 
        threshold, 
        rootMargin: '0px 0px -100px 0px' // Trigger a bit before element enters viewport
      }
    )
    
    // Return a function to manually trigger animation
    return () => {
      if (target.value && !hasAnimated) {
        hasAnimated = true
        target.value.classList.add(...initialClasses.split(' '))
        
        setTimeout(() => {
          if (target.value) {
            target.value.classList.remove('opacity-0')
            target.value.classList.add(animationClass)
          }
        }, delay)
      }
    }
  }
  
  /**
   * Apply staggered animation to a list of elements
   * @param targets - Array of target element references
   * @param animationClass - The animation class to apply
   * @param threshold - Intersection threshold (0-1)
   * @param staggerDelay - Delay between each element animation
   */
  const animateListOnScroll = (
    targets: Ref<HTMLElement[]>,
    animationClass: string,
    threshold = 0.1,
    staggerDelay = 100
  ) => {
    // Create observer for each target
    watch(targets, (elements) => {
      elements.forEach((el, index) => {
        const delay = index * staggerDelay
        
        const targetRef = ref(el)
        animateOnScroll(targetRef, animationClass, threshold, delay)
      })
    }, { immediate: true })
  }
  
  return {
    animateOnScroll,
    animateListOnScroll
  }
}