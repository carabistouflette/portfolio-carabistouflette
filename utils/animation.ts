/**
 * Animation utility functions
 */

/**
 * Creates a GSAP-like stagger timing array
 * @param count - Number of items
 * @param duration - Total duration
 * @param delay - Initial delay
 * @returns Array of delay values
 */
export const createStaggerTiming = (count: number, duration = 1, delay = 0): number[] => {
  const delays: number[] = []
  const step = duration / count
  
  for (let i = 0; i < count; i++) {
    delays.push(delay + i * step)
  }
  
  return delays
}

/**
 * Converts a hex color to RGBA
 * @param hex - Hex color string
 * @param alpha - Alpha value (0-1)
 * @returns RGBA color string
 */
export const hexToRGBA = (hex: string, alpha = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Apply a smooth scroll to a target element
 * @param elementId - Target element ID
 * @param offset - Offset from the top in pixels
 * @param duration - Animation duration in milliseconds
 */
export const smoothScrollTo = (elementId: string, offset = 0, duration = 500): void => {
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
    
    // Easing function (easeOutQuad)
    const easeProgress = progress * (2 - progress)
    
    window.scrollTo(0, startPosition + distance * easeProgress)
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }
  
  requestAnimationFrame(animation)
}