import { useIntersectionObserver } from '@vueuse/core'
import { ref, watch, type Ref } from 'vue'

/**
 * Composable for all animation utilities
 */
export const useAnimations = () => {
  // Scroll-triggered animations
  const animateOnScroll = (
    target: Ref<HTMLElement | null>, 
    animationClass: string, 
    threshold = 0.1, 
    delay = 0
  ) => {
    const initialClasses = 'opacity-0 transition-all duration-700 ease-out'
    let hasAnimated = false
    
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting && !hasAnimated) {
          hasAnimated = true
          
          if (target.value) {
            target.value.classList.add(...initialClasses.split(' '))
          }
          
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
        rootMargin: '0px 0px -100px 0px'
      }
    )
    
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
  
  const animateListOnScroll = (
    targets: Ref<HTMLElement[]>,
    animationClass: string,
    threshold = 0.1,
    staggerDelay = 100
  ) => {
    watch(targets, (elements) => {
      elements.forEach((el, index) => {
        const delay = index * staggerDelay
        const targetRef = ref(el)
        animateOnScroll(targetRef, animationClass, threshold, delay)
      })
    }, { immediate: true })
  }

  // Animation utilities
  const createStaggerTiming = (count: number, duration = 1, delay = 0): number[] => {
    const delays: number[] = []
    const step = duration / count
    
    for (let i = 0; i < count; i++) {
      delays.push(delay + i * step)
    }
    
    return delays
  }

  const hexToRGBA = (hex: string, alpha = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const smoothScrollTo = (elementId: string, offset = 0, duration = 500): void => {
    const element = document.getElementById(elementId)
    
    if (!element) return
    
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    let startTime: number | null = null
    
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easeProgress = progress * (2 - progress)
      
      window.scrollTo(0, startPosition + distance * easeProgress)
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }
    
    requestAnimationFrame(animation)
  }

  return {
    animateOnScroll,
    animateListOnScroll,
    createStaggerTiming,
    hexToRGBA,
    smoothScrollTo
  }
}