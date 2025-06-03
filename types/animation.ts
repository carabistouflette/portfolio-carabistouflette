// Types pour les animations et effets visuels

export interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color?: string
  type?: string
}

export interface AnimationState {
  isPlaying: boolean
  progress: number
  duration: number
  currentFrame: number
  fps: number
}

export interface TransitionOptions {
  duration?: number
  delay?: number
  easing?: string
  onComplete?: () => void
  onStart?: () => void
  onUpdate?: (progress: number) => void
}

export interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  duration?: number
  delay?: number
  easing?: string
}

export interface ParallaxOptions {
  speed?: number
  offset?: number
  scale?: boolean
  rotate?: boolean
  opacity?: boolean
}

export interface CursorState {
  x: number
  y: number
  isVisible: boolean
  isHovering: boolean
  cursorType: 'default' | 'pointer' | 'text' | 'grab' | 'grabbing' | 'custom'
  scale: number
}

export interface MagneticOptions {
  strength?: number
  radius?: number
  smoothing?: number
  enabled?: boolean
}

export interface RevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  delay?: number
  once?: boolean
  opacity?: boolean
  scale?: boolean
  rotate?: boolean
}

export interface BackgroundAnimationConfig {
  particleCount?: number
  particleSize?: {
    min: number
    max: number
  }
  particleSpeed?: {
    min: number
    max: number
  }
  colors?: string[]
  connectionDistance?: number
  mouseInteraction?: boolean
  pauseOnBlur?: boolean
}

export interface FractalConfig {
  iterations?: number
  angle?: number
  scale?: number
  color?: string
  animate?: boolean
  speed?: number
}