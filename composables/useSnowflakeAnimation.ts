import { ref, onMounted, onUnmounted } from 'vue'

export const useSnowflakeAnimation = () => {
  const canvasRef = ref<HTMLCanvasElement>()
  const animationFrameId = ref<number>()
  const growthProgress = ref(0)
  const reverseProgress = ref(false)
  
  const config = {
    branches: 6, // 6 branches pour un flocon de neige
    levels: 4, // Niveaux de récursion
    baseLength: 80,
    branchAngle: Math.PI / 3, // 60 degrés
    lengthRatio: 0.7,
    growthSpeed: 0.003, // Plus lent pour éviter les vibrations
    lineWidth: 2,
    color: 'rgba(203, 166, 247, 0.8)', // mauve avec transparence
    glowColor: 'rgba(137, 180, 250, 0.4)', // blue pour la lueur
    rotation: 0,
    rotationSpeed: 0.001 // Rotation très lente
  }

  const drawBranch = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    length: number, 
    angle: number, 
    level: number,
    progress: number
  ) => {
    if (level === 0 || length < 2) return

    // Calculer la longueur effective basée sur le progrès
    const maxLevelProgress = level / config.levels
    const levelProgress = Math.min(1, progress / maxLevelProgress)
    const effectiveLength = length * levelProgress

    if (effectiveLength <= 0) return

    // Calculer la position finale
    const endX = x + Math.cos(angle) * effectiveLength
    const endY = y + Math.sin(angle) * effectiveLength

    // Dessiner la branche principale
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(endX, endY)
    ctx.strokeStyle = config.color
    ctx.lineWidth = config.lineWidth * (level / config.levels)
    ctx.lineCap = 'round'
    ctx.stroke()

    // Dessiner les sous-branches seulement si le niveau actuel est suffisamment développé
    if (levelProgress >= 0.5) {
      const newLength = length * config.lengthRatio
      const subProgress = (levelProgress - 0.5) * 2 // Normaliser de 0 à 1
      
      // Branches latérales
      drawBranch(ctx, endX, endY, newLength, angle - config.branchAngle, level - 1, progress)
      drawBranch(ctx, endX, endY, newLength, angle + config.branchAngle, level - 1, progress)
      
      // Branche centrale (optionnelle, pour plus de détails)
      if (level > 2 && subProgress > 0.5) {
        drawBranch(ctx, endX, endY, newLength * 0.8, angle, level - 1, progress)
      }
    }
  }

  const drawSnowflake = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) => {
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(config.rotation)

    // Dessiner chaque branche du flocon
    for (let i = 0; i < config.branches; i++) {
      const angle = (i * 2 * Math.PI) / config.branches
      drawBranch(ctx, 0, 0, config.baseLength, angle, config.levels, progress)
    }

    ctx.restore()
  }

  const animate = () => {
    if (!canvasRef.value) return
    
    const ctx = canvasRef.value.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    
    // Update progress avec easing
    if (!reverseProgress.value) {
      growthProgress.value = Math.min(1, growthProgress.value + config.growthSpeed)
      if (growthProgress.value >= 1) {
        reverseProgress.value = true
      }
    } else {
      growthProgress.value = Math.max(0, growthProgress.value - config.growthSpeed)
      if (growthProgress.value <= 0) {
        reverseProgress.value = false
      }
    }
    
    // Appliquer une fonction d'easing pour plus de fluidité
    const easedProgress = easeInOutCubic(growthProgress.value)
    
    // Rotation lente continue
    config.rotation += config.rotationSpeed
    
    const centerX = canvasRef.value.width / 2
    const centerY = canvasRef.value.height / 2
    
    // Dessiner le flocon avec effet de lueur
    ctx.shadowBlur = 20
    ctx.shadowColor = config.glowColor
    drawSnowflake(ctx, centerX, centerY, easedProgress)
    
    // Dessiner une deuxième fois avec moins d'opacité pour renforcer l'effet
    ctx.globalAlpha = 0.5
    ctx.shadowBlur = 30
    drawSnowflake(ctx, centerX, centerY, easedProgress)
    ctx.globalAlpha = 1
    
    animationFrameId.value = requestAnimationFrame(animate)
  }

  // Fonction d'easing pour une animation plus fluide
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const start = () => {
    if (!canvasRef.value) return
    
    // Configurer le canvas pour un meilleur rendu
    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }
    
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