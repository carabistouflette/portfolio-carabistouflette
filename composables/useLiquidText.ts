import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface LiquidTextOptions {
  intensity?: number
  speed?: number
  delay?: number
}

export const useLiquidText = (
  elementRef: Ref<HTMLElement | null>,
  options: LiquidTextOptions = {}
) => {
  const {
    intensity = 20,
    speed = 0.3,
    delay = 0
  } = options

  const isAnimating = ref(false)
  let animationFrameId: number | null = null
  let mouseX = 0
  let mouseY = 0
  let targetX = 0
  let targetY = 0

  const handleMouseMove = (e: MouseEvent) => {
    if (!elementRef.value) return
    
    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    targetX = (e.clientX - centerX) / rect.width * intensity
    targetY = (e.clientY - centerY) / rect.height * intensity
  }

  const handleMouseLeave = () => {
    targetX = 0
    targetY = 0
  }

  const animate = () => {
    if (!elementRef.value) return

    mouseX += (targetX - mouseX) * speed
    mouseY += (targetY - mouseY) * speed

    const transform = `
      perspective(1000px)
      rotateX(${-mouseY}deg)
      rotateY(${mouseX}deg)
      translateZ(20px)
    `

    elementRef.value.style.transform = transform

    animationFrameId = requestAnimationFrame(animate)
  }

  const startAnimation = () => {
    if (isAnimating.value) return
    isAnimating.value = true
    animate()
  }

  const stopAnimation = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
    isAnimating.value = false
    if (elementRef.value) {
      elementRef.value.style.transform = ''
    }
  }

  onMounted(() => {
    setTimeout(() => {
      if (!elementRef.value) return

      elementRef.value.style.transformStyle = 'preserve-3d'
      elementRef.value.style.transition = 'none'
      
      elementRef.value.addEventListener('mouseenter', startAnimation)
      elementRef.value.addEventListener('mousemove', handleMouseMove)
      elementRef.value.addEventListener('mouseleave', handleMouseLeave)
      elementRef.value.addEventListener('mouseleave', () => {
        setTimeout(stopAnimation, 500)
      })

      window.addEventListener('mousemove', (e) => {
        if (isAnimating.value) {
          handleMouseMove(e)
        }
      })
    }, delay)
  })

  onUnmounted(() => {
    stopAnimation()
    if (elementRef.value) {
      elementRef.value.removeEventListener('mouseenter', startAnimation)
      elementRef.value.removeEventListener('mousemove', handleMouseMove)
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return {
    isAnimating
  }
}