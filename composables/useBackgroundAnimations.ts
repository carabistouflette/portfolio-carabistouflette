import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'
import { colors } from '~/constants/colors'

export interface AnimationConfig {
  particles?: {
    enabled: boolean
    count: number
    speed: number
    color?: string
    size?: { min: number; max: number }
  }
  gradientMesh?: {
    enabled: boolean
    colors: string[]
    opacity: number
    animation?: 'pulse' | 'shift' | 'rotate'
  }
  geometricShapes?: {
    enabled: boolean
    count: number
    shapes: ('circle' | 'triangle' | 'hexagon' | 'square')[]
    colors: string[]
  }
  waves?: {
    enabled: boolean
    count: number
    amplitude: number
    frequency: number
    speed: number
    colors: string[]
  }
  floatingOrbs?: {
    enabled: boolean
    count: number
    minSize: number
    maxSize: number
    colors: string[]
    blurAmount: number
  }
  noise?: {
    enabled: boolean
    opacity: number
    scale: number
  }
}

const defaultConfig: AnimationConfig = {
  particles: {
    enabled: true,
    count: 6,
    speed: 20,
    color: colors.mauve,
    size: { min: 6, max: 12 }
  },
  gradientMesh: {
    enabled: true,
    colors: [colors.mauve, colors.blue, colors.green],
    opacity: 0.3,
    animation: 'shift'
  },
  noise: {
    enabled: true,
    opacity: 0.05,
    scale: 1
  }
}

const routeConfigs: Record<string, Partial<AnimationConfig>> = {
  '/': {
    particles: {
      enabled: true,
      count: 12,
      speed: 25,
      size: { min: 8, max: 16 }
    },
    floatingOrbs: {
      enabled: true,
      count: 4,
      minSize: 150,
      maxSize: 400,
      colors: [colors.mauve, colors.blue, colors.pink, colors.lavender],
      blurAmount: 30
    },
    gradientMesh: {
      enabled: true,
      colors: [colors.mauve, colors.blue, colors.pink],
      opacity: 0.4,
      animation: 'pulse'
    }
  },
  '/projects': {
    geometricShapes: {
      enabled: true,
      count: 8,
      shapes: ['hexagon', 'triangle', 'circle'],
      colors: [colors.green, colors.teal, colors.sapphire]
    },
    waves: {
      enabled: true,
      count: 4,
      amplitude: 80,
      frequency: 0.02,
      speed: 0.5,
      colors: [colors.blue, colors.sapphire, colors.sky, colors.teal]
    },
    gradientMesh: {
      enabled: true,
      colors: [colors.blue, colors.teal, colors.green],
      opacity: 0.3,
      animation: 'shift'
    }
  },
  '/contact': {
    particles: {
      enabled: true,
      count: 20,
      speed: 15,
      color: colors.lavender,
      size: { min: 4, max: 10 }
    },
    gradientMesh: {
      enabled: true,
      colors: [colors.pink, colors.mauve, colors.lavender],
      opacity: 0.35,
      animation: 'pulse'
    },
    floatingOrbs: {
      enabled: true,
      count: 2,
      minSize: 200,
      maxSize: 350,
      colors: [colors.pink, colors.lavender],
      blurAmount: 35
    }
  }
}

// Config pour pages de projets individuels
const projectPageConfig: Partial<AnimationConfig> = {
  particles: {
    enabled: true,
    count: 8,
    speed: 30,
    color: colors.sapphire,
    size: { min: 6, max: 12 }
  },
  geometricShapes: {
    enabled: true,
    count: 5,
    shapes: ['hexagon', 'circle'],
    colors: [colors.green, colors.blue, colors.yellow]
  },
  gradientMesh: {
    enabled: true,
    colors: [colors.blue, colors.green, colors.teal],
    opacity: 0.25,
    animation: 'rotate'
  },
  floatingOrbs: {
    enabled: true,
    count: 2,
    minSize: 120,
    maxSize: 250,
    colors: [colors.blue, colors.green],
    blurAmount: 25
  }
}

export const useBackgroundAnimations = (customConfig?: Partial<AnimationConfig>) => {
  const route = useRoute()
  const animationFrame = ref<number | null>(null)
  const time = ref(0)

  const config = computed(() => {
    // Utilise la config des projets individuels si on est sur une page de projet
    const isProjectPage = route.path.startsWith('/projects/') && route.path !== '/projects'
    const baseRouteConfig = isProjectPage ? projectPageConfig : (routeConfigs[route.path] || {})
    
    return {
      ...defaultConfig,
      ...baseRouteConfig,
      ...customConfig,
      particles: { ...defaultConfig.particles, ...baseRouteConfig.particles, ...customConfig?.particles },
      gradientMesh: { ...defaultConfig.gradientMesh, ...baseRouteConfig.gradientMesh, ...customConfig?.gradientMesh },
      geometricShapes: { ...defaultConfig.geometricShapes, ...baseRouteConfig.geometricShapes, ...customConfig?.geometricShapes },
      waves: { ...defaultConfig.waves, ...baseRouteConfig.waves, ...customConfig?.waves },
      floatingOrbs: { ...defaultConfig.floatingOrbs, ...baseRouteConfig.floatingOrbs, ...customConfig?.floatingOrbs },
      noise: { ...defaultConfig.noise, ...baseRouteConfig.noise, ...customConfig?.noise }
    }
  })

  const generateParticles = () => {
    if (!config.value.particles?.enabled) return []
    
    return Array.from({ length: config.value.particles.count }, (_, i) => {
      const size = Math.random() * 
        ((config.value.particles?.size?.max || 8) - (config.value.particles?.size?.min || 4)) + 
        (config.value.particles?.size?.min || 4)
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.6 + Math.random() * 0.4,
        direction: Math.random() * Math.PI * 2
      }
    })
  }

  const generateOrbs = () => {
    if (!config.value.floatingOrbs?.enabled) return []
    
    return Array.from({ length: config.value.floatingOrbs.count }, (_, i) => {
      const size = Math.random() * 
        (config.value.floatingOrbs.maxSize - config.value.floatingOrbs.minSize) + 
        config.value.floatingOrbs.minSize
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        color: config.value.floatingOrbs.colors[i % config.value.floatingOrbs.colors.length],
        animationDelay: Math.random() * 10
      }
    })
  }

  const generateShapes = () => {
    if (!config.value.geometricShapes?.enabled) return []
    
    return Array.from({ length: config.value.geometricShapes.count }, (_, i) => {
      const shapes = config.value.geometricShapes.shapes
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      const color = config.value.geometricShapes.colors[i % config.value.geometricShapes.colors.length]
      
      return {
        id: i,
        shape,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 50 + Math.random() * 100,
        rotation: Math.random() * 360,
        color,
        opacity: 0.15 + Math.random() * 0.2,
        animationDuration: 20 + Math.random() * 20
      }
    })
  }

  const particles = ref(generateParticles())
  const orbs = ref(generateOrbs())
  const shapes = ref(generateShapes())

  const animate = () => {
    time.value += 0.016 // Approximate 60fps
    animationFrame.value = requestAnimationFrame(animate)
  }

  onMounted(() => {
    animate()
  })

  onUnmounted(() => {
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value)
    }
  })

  return {
    config,
    particles,
    orbs,
    shapes,
    time
  }
}