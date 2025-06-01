import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

interface CursorOptions {
  enabled?: boolean
  size?: number
  color?: string
  mixBlendMode?: string
  hideOnLeave?: boolean
  followSpeed?: number
}

export const useCustomCursor = (options: CursorOptions = {}) => {
  const {
    enabled = true,
    size = 20,
    color = 'rgba(203, 166, 247, 0.6)', // mauve with opacity
    mixBlendMode = 'difference',
    hideOnLeave = true,
    followSpeed = 0.15
  } = options

  const isVisible = ref(false)
  const cursorPosition = ref({ x: 0, y: 0 })
  const targetPosition = ref({ x: 0, y: 0 })
  const cursorElement = ref<HTMLElement | null>(null)
  const isHovering = ref(false)
  const cursorText = ref('')
  
  let animationFrame: number | null = null
  let mouseX = 0
  let mouseY = 0

  // Create cursor element
  const createCursor = () => {
    if (!enabled || typeof window === 'undefined') return

    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    cursor.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      mix-blend-mode: ${mixBlendMode};
      z-index: 9999;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
      transition: opacity 0.3s ease, transform 0.3s ease;
      will-change: transform, opacity;
    `

    // Add cursor text element
    const textElement = document.createElement('div')
    textElement.className = 'cursor-text'
    textElement.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s ease;
    `
    cursor.appendChild(textElement)

    document.body.appendChild(cursor)
    cursorElement.value = cursor
    return cursor
  }

  // Update cursor position with smooth animation
  const updateCursorPosition = () => {
    if (!cursorElement.value) return

    // Lerp (linear interpolation) for smooth following
    cursorPosition.value.x += (targetPosition.value.x - cursorPosition.value.x) * followSpeed
    cursorPosition.value.y += (targetPosition.value.y - cursorPosition.value.y) * followSpeed

    cursorElement.value.style.transform = `
      translate(${cursorPosition.value.x - size / 2}px, ${cursorPosition.value.y - size / 2}px) 
      scale(${isHovering.value ? 1.5 : 1})
    `

    animationFrame = requestAnimationFrame(updateCursorPosition)
  }

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    if (!enabled) return

    mouseX = e.clientX
    mouseY = e.clientY
    targetPosition.value = { x: mouseX, y: mouseY }

    if (!isVisible.value) {
      showCursor()
    }
  }

  // Mouse enter handler
  const handleMouseEnter = () => {
    if (enabled && hideOnLeave) {
      showCursor()
    }
  }

  // Mouse leave handler
  const handleMouseLeave = () => {
    if (enabled && hideOnLeave) {
      hideCursor()
    }
  }

  // Show cursor
  const showCursor = () => {
    if (!cursorElement.value) return
    
    isVisible.value = true
    cursorElement.value.style.opacity = '1'
    cursorElement.value.style.transform = `
      translate(${cursorPosition.value.x - size / 2}px, ${cursorPosition.value.y - size / 2}px) 
      scale(1)
    `
  }

  // Hide cursor
  const hideCursor = () => {
    if (!cursorElement.value) return
    
    isVisible.value = false
    cursorElement.value.style.opacity = '0'
    cursorElement.value.style.transform = `
      translate(${cursorPosition.value.x - size / 2}px, ${cursorPosition.value.y - size / 2}px) 
      scale(0)
    `
  }

  // Set cursor text
  const setCursorText = (text: string) => {
    cursorText.value = text
    if (cursorElement.value) {
      const textElement = cursorElement.value.querySelector('.cursor-text') as HTMLElement
      if (textElement) {
        textElement.textContent = text
        textElement.style.opacity = text ? '1' : '0'
      }
    }
  }

  // Set cursor hovering state
  const setCursorHover = (hovering: boolean, text?: string) => {
    isHovering.value = hovering
    if (text !== undefined) {
      setCursorText(text)
    }

    if (cursorElement.value) {
      cursorElement.value.style.mixBlendMode = hovering ? 'multiply' : mixBlendMode
      cursorElement.value.style.background = hovering 
        ? 'rgba(203, 166, 247, 0.9)' 
        : color
    }
  }

  // Setup hover listeners for interactive elements
  const setupHoverListeners = () => {
    if (!enabled) return

    const selectors = [
      'a', 'button', '[role="button"]', 
      '.hover-target', '.cursor-hover',
      'input', 'textarea', 'select'
    ]

    selectors.forEach(selector => {
      document.addEventListener('mouseover', (e) => {
        const target = (e.target as Element).closest(selector)
        if (target) {
          const hoverText = target.getAttribute('data-cursor-text') || ''
          setCursorHover(true, hoverText)
        }
      })

      document.addEventListener('mouseout', (e) => {
        const target = (e.target as Element).closest(selector)
        if (target) {
          setCursorHover(false, '')
        }
      })
    })
  }

  // Initialize cursor
  const init = () => {
    if (!enabled || typeof window === 'undefined') return

    nextTick(() => {
      createCursor()
      setupHoverListeners()
      
      // Set initial position
      cursorPosition.value = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      targetPosition.value = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      
      // Start animation loop
      updateCursorPosition()
      
      // Add event listeners
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseenter', handleMouseEnter)
      document.addEventListener('mouseleave', handleMouseLeave)
    })
  }

  // Cleanup
  const cleanup = () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseenter', handleMouseEnter)
    document.removeEventListener('mouseleave', handleMouseLeave)

    if (cursorElement.value && cursorElement.value.parentNode) {
      cursorElement.value.parentNode.removeChild(cursorElement.value)
    }
  }

  // Lifecycle
  onMounted(() => {
    // Only enable on desktop devices
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!isMobile && !prefersReducedMotion && enabled) {
      init()
    }
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    isVisible,
    cursorPosition,
    isHovering,
    cursorText,
    setCursorText,
    setCursorHover,
    showCursor,
    hideCursor,
    cleanup
  }
}

// Helper composable for specific cursor interactions
export const useCursorEffects = () => {
  const cursor = useCustomCursor()

  // Magic hover effect for buttons
  const addMagicHover = (element: HTMLElement, text?: string) => {
    element.addEventListener('mouseenter', () => {
      cursor.setCursorHover(true, text || 'Click')
    })
    
    element.addEventListener('mouseleave', () => {
      cursor.setCursorHover(false)
    })
  }

  // Add magnetic effect to cursor
  const addMagneticEffect = (element: HTMLElement, strength = 0.3) => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    })
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)'
    })
  }

  return {
    ...cursor,
    addMagicHover,
    addMagneticEffect
  }
}