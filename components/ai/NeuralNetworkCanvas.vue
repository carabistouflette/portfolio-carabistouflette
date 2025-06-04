<template>
  <div class="relative w-full h-full min-h-[600px]">
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
    />
    <div v-if="showTooltip" 
      class="absolute pointer-events-none bg-surface0/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm z-10"
      :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
    >
      <p class="text-text">Neurone {{ hoveredNeuron?.layer }}-{{ hoveredNeuron?.index }}</p>
      <p class="text-text/70">Activation: {{ hoveredNeuron ? (hoveredNeuron.activation * 100).toFixed(0) : 0 }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface Neuron {
  x: number
  y: number
  layer: number
  index: number
  activation: number
  pulsePhase: number
  connections: Connection[]
  isHovered: boolean
  radius: number
}

interface Connection {
  to: Neuron
  strength: number
  isActive: boolean
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const neurons = ref<Neuron[]>([])
const mouseX = ref(0)
const mouseY = ref(0)
const isMouseOver = ref(false)
const hoveredNeuron = ref<Neuron | null>(null)
const showTooltip = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)
let animationId: number | null = null
let ctx: CanvasRenderingContext2D | null = null

const createNetwork = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const width = canvas.width
  const height = canvas.height
  neurons.value = []

  // Configuration du réseau
  const layers = [3, 5, 6, 5, 3] // Neurones par couche
  const layerSpacing = width / (layers.length + 1)
  
  // Créer les neurones
  layers.forEach((count, layerIndex) => {
    const x = layerSpacing * (layerIndex + 1)
    const ySpacing = height / (count + 1)
    
    for (let i = 0; i < count; i++) {
      const y = ySpacing * (i + 1)
      neurons.value.push({
        x,
        y,
        layer: layerIndex,
        index: i,
        activation: Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
        isHovered: false,
        radius: 8
      })
    }
  })

  // Créer les connexions
  for (let l = 0; l < layers.length - 1; l++) {
    const currentLayer = neurons.value.filter(n => n.layer === l)
    const nextLayer = neurons.value.filter(n => n.layer === l + 1)
    
    currentLayer.forEach(neuron => {
      // Connecter à 2-3 neurones de la couche suivante
      const connectionCount = Math.min(2 + Math.floor(Math.random() * 2), nextLayer.length)
      const shuffled = [...nextLayer].sort(() => Math.random() - 0.5)
      
      for (let i = 0; i < connectionCount; i++) {
        neuron.connections.push({
          to: shuffled[i],
          strength: 0.3 + Math.random() * 0.7,
          isActive: false
        })
      }
    })
  }
}

const updateNetwork = () => {
  const time = Date.now() * 0.001

  neurons.value.forEach(neuron => {
    // Distance à la souris
    const dist = Math.hypot(neuron.x - mouseX.value, neuron.y - mouseY.value)
    const mouseInfluence = isMouseOver.value ? Math.max(0, 1 - dist / 150) : 0
    
    // Animation de pulsation
    neuron.pulsePhase += 0.02 + mouseInfluence * 0.03
    const basePulse = (Math.sin(neuron.pulsePhase) + 1) * 0.5
    
    // Activation basée sur la position de la souris et le temps
    neuron.activation = basePulse * 0.3 + mouseInfluence * 0.7
    
    // Vérifier si la souris survole ce neurone
    neuron.isHovered = dist < neuron.radius + 5
    
    // Activer les connexions
    neuron.connections.forEach(conn => {
      conn.isActive = neuron.activation > 0.5 && conn.to.activation > 0.3
    })
  })

  // Propagation des signaux
  if (Math.random() < 0.02) {
    const randomNeuron = neurons.value[Math.floor(Math.random() * neurons.value.length)]
    propagateSignal(randomNeuron)
  }
}

const propagateSignal = (startNeuron: Neuron) => {
  startNeuron.activation = 1
  const visited = new Set<Neuron>()
  const queue = [startNeuron]
  
  const propagate = () => {
    if (queue.length === 0) return
    
    const current = queue.shift()!
    if (visited.has(current)) return
    visited.add(current)
    
    current.connections.forEach(conn => {
      if (Math.random() < conn.strength) {
        conn.to.activation = Math.min(1, conn.to.activation + 0.5)
        queue.push(conn.to)
      }
    })
    
    if (queue.length > 0) {
      setTimeout(propagate, 50)
    }
  }
  
  propagate()
}

const draw = () => {
  if (!ctx || !canvasRef.value) return
  
  const canvas = canvasRef.value
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Dessiner les connexions
  neurons.value.forEach(neuron => {
    neuron.connections.forEach(conn => {
      ctx.beginPath()
      ctx.moveTo(neuron.x, neuron.y)
      
      // Courbe de Bézier pour des connexions plus organiques
      const cp1x = neuron.x + (conn.to.x - neuron.x) * 0.5
      const cp1y = neuron.y
      const cp2x = neuron.x + (conn.to.x - neuron.x) * 0.5
      const cp2y = conn.to.y
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, conn.to.x, conn.to.y)
      
      const opacity = conn.isActive ? conn.strength * 0.6 : 0.1
      ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`
      ctx.lineWidth = conn.isActive ? 2 : 1
      ctx.stroke()
    })
  })
  
  // Dessiner les neurones
  neurons.value.forEach(neuron => {
    const size = neuron.radius + neuron.activation * 4
    
    // Glow effect
    if (neuron.activation > 0.3) {
      const gradient = ctx.createRadialGradient(
        neuron.x, neuron.y, 0,
        neuron.x, neuron.y, size * 2
      )
      gradient.addColorStop(0, `rgba(147, 51, 234, ${neuron.activation * 0.3})`)
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)')
      
      ctx.beginPath()
      ctx.arc(neuron.x, neuron.y, size * 2, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }
    
    // Neurone principal
    ctx.beginPath()
    ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
    
    const gradient = ctx.createRadialGradient(
      neuron.x, neuron.y, 0,
      neuron.x, neuron.y, size
    )
    
    if (neuron.isHovered) {
      gradient.addColorStop(0, '#f38ba8')
      gradient.addColorStop(0.7, '#cba6f7')
      gradient.addColorStop(1, 'rgba(203, 166, 247, 0.3)')
    } else {
      gradient.addColorStop(0, `rgba(147, 51, 234, ${neuron.activation})`)
      gradient.addColorStop(0.7, `rgba(168, 85, 247, ${neuron.activation * 0.7})`)
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)')
    }
    
    ctx.fillStyle = gradient
    ctx.fill()
    
    // Centre lumineux
    ctx.beginPath()
    ctx.arc(neuron.x, neuron.y, size * 0.3, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
  })
}

const animate = () => {
  updateNetwork()
  draw()
  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (e: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left) * (canvas.width / rect.width)
  mouseY.value = (e.clientY - rect.top) * (canvas.height / rect.height)
  
  // Mise à jour du tooltip
  const hovered = neurons.value.find(n => n.isHovered)
  if (hovered !== hoveredNeuron.value) {
    hoveredNeuron.value = hovered || null
    showTooltip.value = !!hovered
    if (hovered) {
      tooltipX.value = e.clientX - rect.left + 10
      tooltipY.value = e.clientY - rect.top - 30
    }
  }
}

const handleMouseEnter = () => {
  isMouseOver.value = true
}

const handleMouseLeave = () => {
  isMouseOver.value = false
  showTooltip.value = false
  hoveredNeuron.value = null
}

const handleClick = (e: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  const x = (e.clientX - rect.left) * (canvas.width / rect.width)
  const y = (e.clientY - rect.top) * (canvas.height / rect.height)
  
  // Trouver le neurone cliqué
  const clicked = neurons.value.find(n => {
    const dist = Math.hypot(n.x - x, n.y - y)
    return dist < n.radius + 5
  })
  
  if (clicked) {
    propagateSignal(clicked)
  }
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const container = canvas.parentElement
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
  
  createNetwork()
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
  
  // Force resize after a small delay to ensure proper sizing
  setTimeout(handleResize, 100)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>