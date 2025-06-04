import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  color: string
  connections: number[]
}

export const useParticleSystem = (canvasRef: Ref<HTMLCanvasElement | null>) => {
  const particles = ref<Particle[]>([])
  const mouseX = ref(0)
  const mouseY = ref(0)
  const isMouseOver = ref(false)
  let animationId: number | null = null

  const colors = [
    'rgba(147, 51, 234, ',
    'rgba(168, 85, 247, ',
    'rgba(196, 167, 231, ',
    'rgba(124, 58, 237, '
  ]

  const createParticle = (x: number, y: number, fromMouse = false) => {
    const angle = Math.random() * Math.PI * 2
    const speed = fromMouse ? Math.random() * 3 + 2 : Math.random() * 0.5 + 0.5
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 3 + 1,
      life: 1,
      maxLife: Math.random() * 100 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      connections: []
    }
  }

  const initParticles = (width: number, height: number) => {
    particles.value = []
    const particleCount = Math.min(100, (width * height) / 10000)
    
    for (let i = 0; i < particleCount; i++) {
      particles.value.push(createParticle(
        Math.random() * width,
        Math.random() * height
      ))
    }
  }

  const updateParticles = (width: number, height: number) => {
    const canvas = canvasRef.value
    if (!canvas) return

    particles.value = particles.value.filter(particle => {
      particle.x += particle.vx
      particle.y += particle.vy
      
      if (particle.x < 0 || particle.x > width) particle.vx *= -1
      if (particle.y < 0 || particle.y > height) particle.vy *= -1
      
      particle.x = Math.max(0, Math.min(width, particle.x))
      particle.y = Math.max(0, Math.min(height, particle.y))
      
      const distToMouse = Math.hypot(particle.x - mouseX.value, particle.y - mouseY.value)
      if (distToMouse < 150 && isMouseOver.value) {
        const angle = Math.atan2(particle.y - mouseY.value, particle.x - mouseX.value)
        const force = (150 - distToMouse) / 150 * 0.5
        particle.vx += Math.cos(angle) * force
        particle.vy += Math.sin(angle) * force
      }
      
      particle.vx *= 0.99
      particle.vy *= 0.99
      
      particle.life--
      return particle.life > 0
    })

    if (isMouseOver.value && particles.value.length < 150) {
      particles.value.push(createParticle(mouseX.value, mouseY.value, true))
    }

    while (particles.value.length < 50) {
      particles.value.push(createParticle(
        Math.random() * width,
        Math.random() * height
      ))
    }

    particles.value.forEach((particle, i) => {
      particle.connections = []
      for (let j = i + 1; j < particles.value.length; j++) {
        const other = particles.value[j]
        const dist = Math.hypot(particle.x - other.x, particle.y - other.y)
        if (dist < 100) {
          particle.connections.push(j)
        }
      }
    })
  }

  const draw = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.value.forEach((particle, i) => {
      particle.connections.forEach(j => {
        const other = particles.value[j]
        const dist = Math.hypot(particle.x - other.x, particle.y - other.y)
        const opacity = (1 - dist / 100) * 0.3
        
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(other.x, other.y)
        ctx.strokeStyle = particle.color + opacity + ')'
        ctx.lineWidth = 1
        ctx.stroke()
      })
    })

    particles.value.forEach(particle => {
      const opacity = Math.min(1, particle.life / particle.maxLife)
      
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color + opacity + ')'
      ctx.fill()

      if (particle.life > particle.maxLife * 0.8) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + (opacity * 0.3) + ')'
        ctx.fill()
      }
    })

    if (isMouseOver.value) {
      const gradient = ctx.createRadialGradient(mouseX.value, mouseY.value, 0, mouseX.value, mouseY.value, 100)
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.1)')
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(mouseX.value - 100, mouseY.value - 100, 200, 200)
    }
  }

  const animate = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    
    updateParticles(canvas.width, canvas.height)
    draw()
    animationId = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.value
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    mouseX.value = e.clientX - rect.left
    mouseY.value = e.clientY - rect.top
  }

  const handleMouseEnter = () => {
    isMouseOver.value = true
  }

  const handleMouseLeave = () => {
    isMouseOver.value = false
  }

  const handleResize = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    initParticles(canvas.width, canvas.height)
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    handleResize()
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)
    animate()
  })

  onUnmounted(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    
    const canvas = canvasRef.value
    if (canvas) {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
    window.removeEventListener('resize', handleResize)
  })

  return {
    particles,
    isMouseOver
  }
}