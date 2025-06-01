import { ref, nextTick } from 'vue'

interface TransitionOptions {
  duration?: number
  easing?: string
  type?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate'
}

export const usePageTransitions = () => {
  const isTransitioning = ref(false)
  const transitionProgress = ref(0)
  
  // Create transition overlay element
  const createTransitionOverlay = () => {
    let overlay = document.getElementById('page-transition-overlay')
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.id = 'page-transition-overlay'
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, 
          rgba(var(--base-rgb), 0.95), 
          rgba(var(--mantle-rgb), 0.98)
        );
        backdrop-filter: blur(10px);
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      `
      
      // Add loading indicator
      const loader = document.createElement('div')
      loader.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(var(--mauve-rgb), 0.3);
        border-top: 3px solid var(--mauve);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      `
      
      // Add keyframes for spin animation
      if (!document.getElementById('transition-keyframes')) {
        const style = document.createElement('style')
        style.id = 'transition-keyframes'
        style.textContent = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          @keyframes slideInFromBottom {
            0% {
              transform: translateY(100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `
        document.head.appendChild(style)
      }
      
      overlay.appendChild(loader)
      document.body.appendChild(overlay)
    }
    return overlay
  }
  
  // Show transition overlay
  const showTransition = () => {
    const overlay = createTransitionOverlay()
    isTransitioning.value = true
    
    nextTick(() => {
      overlay.style.opacity = '1'
      overlay.style.pointerEvents = 'all'
    })
  }
  
  // Hide transition overlay
  const hideTransition = (delay = 200) => {
    const overlay = document.getElementById('page-transition-overlay')
    if (overlay) {
      setTimeout(() => {
        overlay.style.opacity = '0'
        overlay.style.pointerEvents = 'none'
        isTransitioning.value = false
        
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay)
          }
        }, 300)
      }, delay)
    }
  }
  
  // Animate page elements on enter
  const animatePageEnter = (selector = '.page-enter-animation') => {
    nextTick(() => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element, index) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.cssText += `
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          animation: fadeInScale 0.6s ease-out forwards;
          animation-delay: ${index * 100}ms;
        `
      })
    })
  }
  
  // Animate sections with stagger
  const animateSections = () => {
    nextTick(() => {
      const sections = document.querySelectorAll('section, .main-content > div')
      sections.forEach((section, index) => {
        const htmlSection = section as HTMLElement
        htmlSection.style.cssText += `
          opacity: 0;
          transform: translateY(50px);
          animation: slideInFromBottom 0.8s ease-out forwards;
          animation-delay: ${index * 200}ms;
        `
      })
    })
  }
  
  // Enhanced page transition with custom effects
  const transitionToPage = async (to: string, options: TransitionOptions = {}) => {
    const {
      duration = 600,
      easing: _easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      type: _type = 'fade'
    } = options
    
    // Show transition
    showTransition()
    
    // Wait for transition to show
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Navigate to page (this would be handled by the router)
    // For now, we'll just simulate it
    await new Promise(resolve => setTimeout(resolve, duration))
    
    // Animate page content
    animatePageEnter()
    animateSections()
    
    // Hide transition
    hideTransition(200)
  }
  
  // Scroll-triggered reveal animations
  const setupScrollRevealAnimations = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            element.style.animation = 'fadeInScale 0.8s ease-out forwards'
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
    
    // Observe elements that should animate on scroll
    nextTick(() => {
      const elements = document.querySelectorAll('.scroll-reveal, [data-scroll-reveal]')
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.cssText += `
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        `
        observer.observe(element)
      })
    })
    
    return observer
  }
  
  // Cleanup function
  const cleanup = () => {
    const overlay = document.getElementById('page-transition-overlay')
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
    
    const keyframes = document.getElementById('transition-keyframes')
    if (keyframes && keyframes.parentNode) {
      keyframes.parentNode.removeChild(keyframes)
    }
  }
  
  return {
    isTransitioning,
    transitionProgress,
    showTransition,
    hideTransition,
    animatePageEnter,
    animateSections,
    transitionToPage,
    setupScrollRevealAnimations,
    cleanup
  }
}

// Router integration helper
export const useRouterTransitions = () => {
  const pageTransitions = usePageTransitions()
  
  // This would integrate with Nuxt's router
  const setupRouterHooks = () => {
    // Before route change
    const beforeRouteChange = () => {
      pageTransitions.showTransition()
    }
    
    // After route change
    const afterRouteChange = () => {
      pageTransitions.animatePageEnter()
      pageTransitions.animateSections()
      pageTransitions.hideTransition(100)
    }
    
    return {
      beforeRouteChange,
      afterRouteChange
    }
  }
  
  return {
    ...pageTransitions,
    setupRouterHooks
  }
}