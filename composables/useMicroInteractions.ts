import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface MicroInteractionOptions {
  /**
   * Enable sound effects for interactions
   */
  enableSound?: boolean
  
  /**
   * Enable haptic feedback (if supported)
   */
  enableHaptics?: boolean
  
  /**
   * Enable particle effects on click
   */
  enableParticles?: boolean
  
  /**
   * Enable magnetic cursor effect
   */
  enableMagneticCursor?: boolean
  
  /**
   * Enable shake on error/invalid action
   */
  enableErrorShake?: boolean
}

interface ParticleConfig {
  count: number
  colors: string[]
  size: number
  duration: number
}

export function useMicroInteractions(options: MicroInteractionOptions = {}) {
  const {
    enableSound = false,
    enableHaptics = true,
    enableParticles = true,
    enableMagneticCursor = true,
    enableErrorShake = true
  } = options

  // Create particle effect on click
  const createParticleEffect = (event: MouseEvent, config?: Partial<ParticleConfig>) => {
    if (!enableParticles) return

    const defaultConfig: ParticleConfig = {
      count: 8,
      colors: ['#cba6f7', '#89b4fa', '#94e2d5', '#fab387'],
      size: 4,
      duration: 800
    }

    const finalConfig = { ...defaultConfig, ...config }
    const particles: HTMLElement[] = []

    for (let i = 0; i < finalConfig.count; i++) {
      const particle = document.createElement('div')
      const angle = (Math.PI * 2 * i) / finalConfig.count
      const velocity = 50 + Math.random() * 50
      const color = finalConfig.colors[Math.floor(Math.random() * finalConfig.colors.length)]

      particle.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        width: ${finalConfig.size}px;
        height: ${finalConfig.size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 10px ${color};
        transition: all ${finalConfig.duration}ms cubic-bezier(0.4, 0, 0.2, 1);
      `

      document.body.appendChild(particle)
      particles.push(particle)

      // Animate particle
      requestAnimationFrame(() => {
        const x = Math.cos(angle) * velocity
        const y = Math.sin(angle) * velocity

        particle.style.transform = `translate(${x}px, ${y}px) scale(0)`
        particle.style.opacity = '0'
      })
    }

    // Cleanup particles
    setTimeout(() => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }, finalConfig.duration)
  }

  // Haptic feedback
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHaptics || typeof navigator === 'undefined') return

    // Modern browsers with Vibration API
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30]
      }
      navigator.vibrate(patterns[type])
    }

    // Gamepad haptic feedback (if available)
    if ('getGamepads' in navigator) {
      const gamepads = navigator.getGamepads()
      gamepads.forEach(gamepad => {
        if (gamepad?.vibrationActuator) {
          const intensity = type === 'light' ? 0.1 : type === 'medium' ? 0.3 : 0.6
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: 100,
            strongMagnitude: intensity,
            weakMagnitude: intensity
          })
        }
      })
    }
  }

  // Play sound effect
  const playSound = (type: 'click' | 'hover' | 'success' | 'error') => {
    if (!enableSound || typeof Audio === 'undefined') return

    // Create audio context for better performance
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    const frequencies = {
      click: 800,
      hover: 1000,
      success: 523.25, // C5
      error: 207.65    // G#3
    }

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime)
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  // Shake element on error
  const shakeElement = (element: HTMLElement) => {
    if (!enableErrorShake) return

    element.style.animation = 'microShake 0.5s ease-in-out'
    
    // Add shake keyframes if not exists
    if (!document.querySelector('#microShakeKeyframes')) {
      const style = document.createElement('style')
      style.id = 'microShakeKeyframes'
      style.textContent = `
        @keyframes microShake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `
      document.head.appendChild(style)
    }

    setTimeout(() => {
      element.style.animation = ''
    }, 500)
  }

  // Enhanced click handler with all effects
  const enhancedClick = (event: MouseEvent, options?: {
    particles?: Partial<ParticleConfig>
    haptic?: 'light' | 'medium' | 'heavy'
    sound?: 'click' | 'success'
  }) => {
    const { particles, haptic = 'light', sound = 'click' } = options || {}

    createParticleEffect(event, particles)
    triggerHaptic(haptic)
    playSound(sound)
  }

  // Enhanced hover handler
  const enhancedHover = (enter: boolean = true) => {
    if (enter) {
      triggerHaptic('light')
      playSound('hover')
    }
  }

  // Error feedback
  const errorFeedback = (element: HTMLElement) => {
    shakeElement(element)
    triggerHaptic('heavy')
    playSound('error')
  }

  // Success feedback
  const successFeedback = (event: MouseEvent) => {
    createParticleEffect(event, {
      count: 12,
      colors: ['#a6e3a1', '#94e2d5', '#89dceb'],
      size: 6
    })
    triggerHaptic('medium')
    playSound('success')
  }

  // Magnetic cursor effect
  const magneticCursor = ref<{ x: number; y: number }>({ x: 0, y: 0 })
  const isNearMagneticElement = ref(false)

  const updateMagneticCursor = (event: MouseEvent) => {
    if (!enableMagneticCursor) return

    magneticCursor.value = { x: event.clientX, y: event.clientY }
  }

  const setMagneticElement = (near: boolean) => {
    isNearMagneticElement.value = near
  }

  // Custom cursor styles
  const customCursorStyle = ref('')

  const updateCursorStyle = (style: string) => {
    customCursorStyle.value = style
    document.body.style.cursor = style
  }

  const resetCursor = () => {
    customCursorStyle.value = ''
    document.body.style.cursor = ''
  }

  // Setup and cleanup
  onMounted(() => {
    if (enableMagneticCursor) {
      document.addEventListener('mousemove', updateMagneticCursor)
    }
  })

  onUnmounted(() => {
    if (enableMagneticCursor) {
      document.removeEventListener('mousemove', updateMagneticCursor)
    }
    resetCursor()
  })

  return {
    // Core effects
    createParticleEffect,
    triggerHaptic,
    playSound,
    shakeElement,

    // Enhanced handlers
    enhancedClick,
    enhancedHover,
    errorFeedback,
    successFeedback,

    // Cursor management
    magneticCursor,
    isNearMagneticElement,
    setMagneticElement,
    updateCursorStyle,
    resetCursor,

    // State
    customCursorStyle
  }
}

// Utility hook for specific interaction types
export function useButtonInteractions() {
  const microInteractions = useMicroInteractions({
    enableParticles: true,
    enableHaptics: true,
    enableSound: false // Keep sound disabled by default for buttons
  })

  const handleButtonClick = (event: MouseEvent) => {
    microInteractions.enhancedClick(event, {
      particles: { count: 6, colors: ['#cba6f7', '#b4befe'] },
      haptic: 'medium'
    })
  }

  const handleButtonHover = (enter: boolean) => {
    microInteractions.enhancedHover(enter)
  }

  return {
    handleButtonClick,
    handleButtonHover,
    ...microInteractions
  }
}

// Utility hook for card interactions
export function useCardInteractions() {
  const microInteractions = useMicroInteractions({
    enableParticles: true,
    enableHaptics: true,
    enableMagneticCursor: true
  })

  const handleCardClick = (event: MouseEvent) => {
    microInteractions.enhancedClick(event, {
      particles: { count: 8, colors: ['#cba6f7', '#89b4fa', '#94e2d5'] },
      haptic: 'light'
    })
  }

  const handleCardHover = (enter: boolean) => {
    microInteractions.setMagneticElement(enter)
    if (enter) {
      microInteractions.updateCursorStyle('pointer')
    } else {
      microInteractions.resetCursor()
    }
  }

  return {
    handleCardClick,
    handleCardHover,
    ...microInteractions
  }
}