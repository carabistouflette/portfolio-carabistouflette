<template>
  <div class="w-full h-full min-h-[400px]">
    <canvas
      ref="canvasRef"
      class="w-full h-full"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  connections: number[]
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
const mouseX = ref(0)
const mouseY = ref(0)
const isMouseOver = ref(false)
let animationId: number | null = null
let ctx: CanvasRenderingContext2D | null = null

const colors = [
  { r: 203, g: 166, b: 247 }, // mauve
  { r: 243, g: 139, b: 168 }, // pink
  { r: 137, g: 180, b: 250 }, // blue
  { r: 166, g: 227, b: 161 }  // green
]

const createParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  particles.value = []
  const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))

  for (let i = 0; i < particleCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)]
    particles.value.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: `${color.r}, ${color.g}, ${color.b}`,
      alpha: Math.random() * 0.5 + 0.5,
      connections: []
    })
  }
}

const updateParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  particles.value.forEach((particle, i) => {
    // Mouvement de base
    particle.x += particle.vx
    particle.y += particle.vy

    // Rebond sur les bords
    if (particle.x < 0 || particle.x > canvas.width) {
      particle.vx *= -1
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.vy *= -1
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))
    }

    // Interaction avec la souris
    if (isMouseOver.value) {
      const dx = mouseX.value - particle.x
      const dy = mouseY.value - particle.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 100) {
        const force = (100 - dist) / 100
        const angle = Math.atan2(dy, dx)
        
        // Attraction vers la souris
        particle.vx += Math.cos(angle) * force * 0.1
        particle.vy += Math.sin(angle) * force * 0.1
        
        // Augmenter l'alpha près de la souris
        particle.alpha = Math.min(1, particle.alpha + force * 0.02)
      } else {
        particle.alpha = Math.max(0.5, particle.alpha - 0.01)
      }
    }

    // Friction
    particle.vx *= 0.98
    particle.vy *= 0.98

    // Connexions avec d'autres particules
    particle.connections = []
    for (let j = i + 1; j < particles.value.length; j++) {
      const other = particles.value[j]
      const dist = Math.hypot(particle.x - other.x, particle.y - other.y)
      if (dist < 80) {
        particle.connections.push(j)
      }
    }
  })
}

const draw = () => {
  if (!ctx || !canvasRef.value) return

  const canvas = canvasRef.value
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Dessiner les connexions
  particles.value.forEach((particle, i) => {
    particle.connections.forEach(j => {
      const other = particles.value[j]
      const dist = Math.hypot(particle.x - other.x, particle.y - other.y)
      const opacity = (1 - dist / 80) * 0.2

      ctx.beginPath()
      ctx.moveTo(particle.x, particle.y)
      ctx.lineTo(other.x, other.y)
      ctx.strokeStyle = `rgba(${particle.color}, ${opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
    })
  })

  // Dessiner les particules
  particles.value.forEach(particle => {
    // Glow effect
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 4
    )
    gradient.addColorStop(0, `rgba(${particle.color}, ${particle.alpha * 0.8})`)
    gradient.addColorStop(0.5, `rgba(${particle.color}, ${particle.alpha * 0.3})`)
    gradient.addColorStop(1, `rgba(${particle.color}, 0)`)

    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Centre de la particule
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`
    ctx.fill()
  })

  // Effet de souris
  if (isMouseOver.value) {
    const gradient = ctx.createRadialGradient(
      mouseX.value, mouseY.value, 0,
      mouseX.value, mouseY.value, 100
    )
    gradient.addColorStop(0, 'rgba(203, 166, 247, 0.1)')
    gradient.addColorStop(1, 'rgba(203, 166, 247, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(mouseX.value - 100, mouseY.value - 100, 200, 200)
  }
}

const animate = () => {
  updateParticles()
  draw()
  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (e: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left) * (canvas.width / rect.width)
  mouseY.value = (e.clientY - rect.top) * (canvas.height / rect.height)
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

  const container = canvas.parentElement
  if (!container) return

  const rect = container.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  createParticles()
}

onMounted(async () => {
  await nextTick()
  
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  // Initial setup
  handleResize()
  
  // Start animation
  animate()
  
  // Add resize listener
  window.addEventListener('resize', handleResize)
  
  // Force resize after a small delay
  setTimeout(handleResize, 100)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>