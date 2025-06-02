import { ref, onMounted, onUnmounted } from 'vue'

interface FractalBranch {
  x: number
  y: number
  angle: number
  length: number
  depth: number
  maxDepth: number
}

export const useFractalAnimation = () => {
  const canvasRef = ref<HTMLCanvasElement>()
  const animationFrameId = ref<number>()
  const growthProgress = ref(0)
  const reverseProgress = ref(false)
  const branches = ref<FractalBranch[]>([])
  
  const config = {
    baseLength: 100,
    angle: Math.PI / 6,
    branchRatio: 0.7,
    maxDepth: 8,
    growthSpeed: 0.005,
    colors: {
      start: '#cba6f7', // mauve
      middle: '#89b4fa', // blue
      end: '#94e2d5' // teal
    }
  }

  const interpolateColor = (color1: string, color2: string, factor: number) => {
    const c1 = parseInt(color1.slice(1), 16)
    const c2 = parseInt(color2.slice(1), 16)
    
    const r1 = (c1 >> 16) & 255
    const g1 = (c1 >> 8) & 255
    const b1 = c1 & 255
    
    const r2 = (c2 >> 16) & 255
    const g2 = (c2 >> 8) & 255
    const b2 = c2 & 255
    
    const r = Math.round(r1 + (r2 - r1) * factor)
    const g = Math.round(g1 + (g2 - g1) * factor)
    const b = Math.round(b1 + (b2 - b1) * factor)
    
    return `rgb(${r}, ${g}, ${b})`
  }

  const getColorForDepth = (depth: number) => {
    const factor = depth / config.maxDepth
    if (factor < 0.5) {
      return interpolateColor(config.colors.start, config.colors.middle, factor * 2)
    } else {
      return interpolateColor(config.colors.middle, config.colors.end, (factor - 0.5) * 2)
    }
  }

  const drawBranch = (ctx: CanvasRenderingContext2D, branch: FractalBranch, progress: number) => {
    const effectiveLength = branch.length * Math.min(1, progress * (branch.maxDepth - branch.depth + 1))
    
    if (effectiveLength <= 0) return
    
    ctx.save()
    ctx.translate(branch.x, branch.y)
    ctx.rotate(branch.angle)
    
    // Dessiner la branche
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -effectiveLength)
    ctx.strokeStyle = getColorForDepth(branch.depth)
    ctx.lineWidth = Math.max(1, (branch.maxDepth - branch.depth) * 0.5)
    ctx.globalAlpha = 0.8 - (branch.depth / branch.maxDepth) * 0.3
    ctx.stroke()
    
    // Calculer les nouvelles branches
    if (branch.depth < branch.maxDepth && progress > branch.depth / branch.maxDepth) {
      const newX = 0
      const newY = -effectiveLength
      const newLength = branch.length * config.branchRatio
      
      // Branche gauche
      const leftBranch: FractalBranch = {
        x: newX,
        y: newY,
        angle: -config.angle + (Math.random() - 0.5) * 0.2,
        length: newLength,
        depth: branch.depth + 1,
        maxDepth: branch.maxDepth
      }
      
      // Branche droite
      const rightBranch: FractalBranch = {
        x: newX,
        y: newY,
        angle: config.angle + (Math.random() - 0.5) * 0.2,
        length: newLength,
        depth: branch.depth + 1,
        maxDepth: branch.maxDepth
      }
      
      drawBranch(ctx, leftBranch, progress)
      drawBranch(ctx, rightBranch, progress)
    }
    
    ctx.restore()
  }

  const animate = () => {
    if (!canvasRef.value) return
    
    const ctx = canvasRef.value.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    
    // Update progress
    if (!reverseProgress.value) {
      growthProgress.value += config.growthSpeed
      if (growthProgress.value >= 1) {
        growthProgress.value = 1
        reverseProgress.value = true
      }
    } else {
      growthProgress.value -= config.growthSpeed
      if (growthProgress.value <= 0) {
        growthProgress.value = 0
        reverseProgress.value = false
      }
    }
    
    // Dessiner le fractal principal
    const mainBranch: FractalBranch = {
      x: canvasRef.value.width / 2,
      y: canvasRef.value.height / 2,
      angle: -Math.PI / 2,
      length: config.baseLength,
      depth: 0,
      maxDepth: config.maxDepth
    }
    
    drawBranch(ctx, mainBranch, growthProgress.value)
    
    // Ajouter un effet de lueur
    ctx.globalCompositeOperation = 'screen'
    ctx.filter = 'blur(2px)'
    drawBranch(ctx, mainBranch, growthProgress.value)
    ctx.filter = 'none'
    ctx.globalCompositeOperation = 'source-over'
    
    animationFrameId.value = requestAnimationFrame(animate)
  }

  const start = () => {
    if (!canvasRef.value) return
    animate()
  }

  const stop = () => {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value)
    }
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    canvasRef,
    growthProgress,
    start,
    stop
  }
}