import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  animationClass?: string
  stagger?: number
  once?: boolean
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate' | 'flip' | 'zoom'
  distance?: string
  duration?: number
  delay?: number
  scale?: number
  rotate?: number
  blur?: boolean
  cascade?: boolean
  easing?: string
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animationClass = 'revealed',
    stagger = 100,
    once = true,
    direction = 'up',
    distance = '30px',
    duration = 600,
    delay = 0,
    scale = 0.9,
    rotate = 10,
    blur = true,
    cascade = false,
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  } = options

  const elements = ref<Set<HTMLElement>>(new Set())
  const observer = ref<IntersectionObserver | null>(null)

  // Animation styles based on direction
  const getInitialStyles = (direction: string) => {
    const baseStyles: Record<string, string> = {
      opacity: '0',
      transition: `all ${duration}ms ${easing}`,
      willChange: 'transform, opacity, filter'
    }
    
    if (blur) {
      baseStyles.filter = 'blur(5px)'
    }

    switch (direction) {
      case 'up':
        return { ...baseStyles, transform: `translateY(${distance})` }
      case 'down':
        return { ...baseStyles, transform: `translateY(-${distance})` }
      case 'left':
        return { ...baseStyles, transform: `translateX(${distance})` }
      case 'right':
        return { ...baseStyles, transform: `translateX(-${distance})` }
      case 'fade':
        return { ...baseStyles, transform: 'scale(0.95)' }
      case 'scale':
        return { ...baseStyles, transform: `scale(${scale})` }
      case 'rotate':
        return { ...baseStyles, transform: `rotate(${rotate}deg) scale(0.9)` }
      case 'flip':
        return { ...baseStyles, transform: 'perspective(600px) rotateY(90deg)' }
      case 'zoom':
        return { ...baseStyles, transform: 'scale(0.5)' }
      default:
        return { ...baseStyles, transform: `translateY(${distance})` }
    }
  }

  const getFinalStyles = () => ({
    opacity: '1',
    transform: 'translateY(0) translateX(0) scale(1) rotate(0deg) rotateY(0deg)',
    filter: 'blur(0)'
  })

  // Apply initial styles to element
  const applyInitialStyles = (element: HTMLElement) => {
    const styles = getInitialStyles(direction)
    Object.assign(element.style, styles)
  }

  // Reveal element with animation
  const revealElement = (element: HTMLElement, index: number = 0) => {
    const finalStyles = getFinalStyles()
    const elementDelay = cascade ? delay + (index * stagger) : delay
    
    // Add initial class for CSS hooks
    element.classList.add('scroll-reveal-initial')
    
    setTimeout(() => {
      element.style.transitionDelay = `${elementDelay}ms`
      Object.assign(element.style, finalStyles)
      element.classList.add(animationClass)
      element.classList.remove('scroll-reveal-initial')
      
      // Dispatch custom event
      element.dispatchEvent(new CustomEvent('scrollreveal:revealed', {
        detail: { index, delay: elementDelay }
      }))
    }, 0)
  }

  // Register element for observation
  const registerElement = (element: HTMLElement | HTMLElement[]) => {
    if (!observer.value) return

    const elementsArray = Array.isArray(element) ? element : [element]
    
    elementsArray.forEach((el, index) => {
      if (el && !elements.value.has(el)) {
        elements.value.add(el)
        applyInitialStyles(el)
        observer.value?.observe(el)
        
        // Store index for stagger animation
        el.dataset.revealIndex = index.toString()
      }
    })
  }

  // Unregister element
  const unregisterElement = (element: HTMLElement) => {
    if (observer.value && elements.value.has(element)) {
      observer.value.unobserve(element)
      elements.value.delete(element)
    }
  }

  // Initialize observer
  const initObserver = () => {
    if (typeof window === 'undefined') return

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const index = parseInt(element.dataset.revealIndex || '0', 10)
            
            revealElement(element, index)
            
            if (once) {
              observer.value?.unobserve(element)
              elements.value.delete(element)
            }
          } else if (!once && elements.value.has(element as HTMLElement)) {
            // Reset element if not once
            const element = entry.target as HTMLElement
            element.classList.remove(animationClass)
            element.classList.add('scroll-reveal-initial')
            applyInitialStyles(element)
            
            // Dispatch custom event
            element.dispatchEvent(new CustomEvent('scrollreveal:hidden'))
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )
  }

  // Cleanup
  const cleanup = () => {
    if (observer.value) {
      elements.value.forEach(element => {
        observer.value?.unobserve(element)
      })
      observer.value.disconnect()
      observer.value = null
    }
    elements.value.clear()
  }

  // Lifecycle
  onMounted(() => {
    nextTick(() => {
      initObserver()
    })
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    registerElement,
    unregisterElement,
    revealElement,
    cleanup
  }
}

// Utility composable for common scroll reveal patterns
export const useScrollRevealList = (options: ScrollRevealOptions = {}) => {
  const scrollReveal = useScrollReveal(options)
  
  const registerList = (containerSelector: string, itemSelector: string = ':scope > *') => {
    nextTick(() => {
      const container = document.querySelector(containerSelector)
      if (container) {
        const items = Array.from(container.querySelectorAll(itemSelector)) as HTMLElement[]
        scrollReveal.registerElement(items)
      }
    })
  }

  const registerElements = (selector: string) => {
    nextTick(() => {
      const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[]
      scrollReveal.registerElement(elements)
    })
  }

  return {
    ...scrollReveal,
    registerList,
    registerElements
  }
}