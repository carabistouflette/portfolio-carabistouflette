import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface Neuron {
  x: number
  y: number
  z: number
  connections: number[]
  activation: number
  pulsePhase: number
}

interface Connection {
  from: number
  to: number
  strength: number
  active: boolean
}

export const useNeuralNetwork = (canvasRef: Ref<HTMLCanvasElement | null>) => {
  const neurons = ref<Neuron[]>([])
  const connections = ref<Connection[]>([])
  const mouseX = ref(0)
  const mouseY = ref(0)
  let animationId: number | null = null

  const createNetwork = (width: number, height: number) => {
    const layers = 5
    const neuronsPerLayer = [8, 12, 16, 12, 8]
    const newNeurons: Neuron[] = []
    const newConnections: Connection[] = []

    let neuronIndex = 0
    for (let layer = 0; layer < layers; layer++) {
      const layerNeurons = neuronsPerLayer[layer]
      const layerX = (layer / (layers - 1)) * width * 0.8 + width * 0.1
      
      for (let n = 0; n < layerNeurons; n++) {
        const y = (n / (layerNeurons - 1)) * height * 0.8 + height * 0.1
        const z = Math.random() * 50 - 25
        
        newNeurons.push({
          x: layerX,
          y,
          z,
          connections: [],
          activation: Math.random() * 0.3,
          pulsePhase: Math.random() * Math.PI * 2
        })

        if (layer > 0) {
          const prevLayerStart = neuronIndex - neuronsPerLayer[layer - 1]
          const prevLayerEnd = neuronIndex
          
          for (let i = 0; i < Math.min(3, neuronsPerLayer[layer - 1]); i++) {
            const targetIndex = prevLayerStart + Math.floor(Math.random() * neuronsPerLayer[layer - 1])
            newConnections.push({
              from: targetIndex,
              to: neuronIndex,
              strength: Math.random() * 0.5 + 0.5,
              active: false
            })
            newNeurons[neuronIndex].connections.push(targetIndex)
          }
        }
        
        neuronIndex++
      }
    }

    neurons.value = newNeurons
    connections.value = newConnections
  }

  const updateActivations = () => {
    const time = Date.now() * 0.001

    neurons.value.forEach((neuron, index) => {
      const distToMouse = Math.hypot(neuron.x - mouseX.value, neuron.y - mouseY.value)
      const mouseInfluence = Math.max(0, 1 - distToMouse / 200)
      
      neuron.pulsePhase += 0.02 + mouseInfluence * 0.05
      neuron.activation = (Math.sin(neuron.pulsePhase + time) + 1) * 0.5 * (0.3 + mouseInfluence * 0.7)
    })

    connections.value.forEach(connection => {
      const fromNeuron = neurons.value[connection.from]
      const toNeuron = neurons.value[connection.to]
      connection.active = fromNeuron.activation > 0.5 && toNeuron.activation > 0.3
    })
  }

  const draw = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    connections.value.forEach(connection => {
      const from = neurons.value[connection.from]
      const to = neurons.value[connection.to]
      
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      
      const cp1x = from.x + (to.x - from.x) * 0.5
      const cp1y = from.y
      const cp2x = from.x + (to.x - from.x) * 0.5
      const cp2y = to.y
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, to.x, to.y)
      
      const opacity = connection.active ? connection.strength * 0.8 : 0.1
      ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`
      ctx.lineWidth = connection.active ? 2 : 1
      ctx.stroke()

      if (connection.active) {
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y)
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0)')
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)')
        ctx.strokeStyle = gradient
        ctx.lineWidth = 4
        ctx.stroke()
      }
    })

    neurons.value.forEach((neuron, index) => {
      const size = 4 + neuron.activation * 6
      
      ctx.beginPath()
      ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
      
      const gradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, size)
      gradient.addColorStop(0, `rgba(147, 51, 234, ${neuron.activation})`)
      gradient.addColorStop(0.7, `rgba(147, 51, 234, ${neuron.activation * 0.5})`)
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)')
      
      ctx.fillStyle = gradient
      ctx.fill()

      if (neuron.activation > 0.7) {
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 51, 234, ${(neuron.activation - 0.7) * 0.3})`
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(neuron.x, neuron.y, size * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.fill()
    })
  }

  const animate = () => {
    updateActivations()
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

  const handleResize = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    createNetwork(canvas.width, canvas.height)
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    handleResize()
    canvas.addEventListener('mousemove', handleMouseMove)
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
    }
    window.removeEventListener('resize', handleResize)
  })

  return {
    neurons,
    connections
  }
}