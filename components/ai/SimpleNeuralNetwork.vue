<template>
  <div class="relative w-full h-full min-h-[500px] bg-base rounded-lg overflow-hidden">
    <svg 
      ref="svgRef"
      class="w-full h-full"
      @mousemove="handleMouseMove"
    >
      <!-- Connexions -->
      <line
        v-for="(connection, index) in connections"
        :key="`conn-${index}`"
        :x1="connection.x1"
        :y1="connection.y1"
        :x2="connection.x2"
        :y2="connection.y2"
        :stroke="connection.active ? '#cba6f7' : '#6c7086'"
        :stroke-width="connection.active ? '2' : '1'"
        :opacity="connection.active ? '0.8' : '0.3'"
        class="transition-all duration-300"
      />
      
      <!-- Neurones -->
      <g v-for="(neuron, index) in neurons" :key="`neuron-${index}`">
        <!-- Glow effect -->
        <circle
          v-if="neuron.activation > 0.5"
          :cx="neuron.x"
          :cy="neuron.y"
          :r="20"
          fill="url(#glow)"
          :opacity="neuron.activation - 0.5"
        />
        
        <!-- Neurone -->
        <circle
          :cx="neuron.x"
          :cy="neuron.y"
          :r="neuron.radius"
          :fill="neuron.hovered ? '#f38ba8' : '#cba6f7'"
          :stroke="neuron.hovered ? '#f38ba8' : '#9333ea'"
          stroke-width="2"
          class="transition-all duration-300 cursor-pointer"
          @click="handleNeuronClick(neuron)"
        />
        
        <!-- Centre lumineux -->
        <circle
          :cx="neuron.x"
          :cy="neuron.y"
          :r="3"
          fill="white"
        />
      </g>
      
      <!-- Gradient definitions -->
      <defs>
        <radialGradient id="glow">
          <stop offset="0%" stop-color="#cba6f7" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#cba6f7" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
    
    <!-- Info -->
    <div class="absolute bottom-4 left-4 bg-surface0/80 backdrop-blur-sm px-3 py-2 rounded-lg">
      <p class="text-xs text-text/70">Cliquez sur un neurone pour propager un signal</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Neuron {
  x: number
  y: number
  layer: number
  activation: number
  radius: number
  hovered: boolean
  connections: number[]
}

const svgRef = ref<SVGElement | null>(null)
const neurons = ref<Neuron[]>([])
const mouseX = ref(0)
const mouseY = ref(0)

const connections = computed(() => {
  const conns: any[] = []
  neurons.value.forEach((neuron, idx) => {
    neuron.connections.forEach(targetIdx => {
      const target = neurons.value[targetIdx]
      if (target) {
        conns.push({
          x1: neuron.x,
          y1: neuron.y,
          x2: target.x,
          y2: target.y,
          active: neuron.activation > 0.5 && target.activation > 0.3
        })
      }
    })
  })
  return conns
})

const createNetwork = () => {
  const width = 800
  const height = 500
  const layers = [3, 4, 5, 4, 2]
  const newNeurons: Neuron[] = []
  
  let idx = 0
  layers.forEach((count, layerIdx) => {
    const x = (layerIdx + 1) * (width / (layers.length + 1))
    const spacing = height / (count + 1)
    
    for (let i = 0; i < count; i++) {
      const y = (i + 1) * spacing
      newNeurons.push({
        x,
        y,
        layer: layerIdx,
        activation: Math.random() * 0.3,
        radius: 10,
        hovered: false,
        connections: []
      })
      
      // Connecter aux neurones de la couche suivante
      if (layerIdx < layers.length - 1) {
        const nextLayerStart = idx + count
        const nextLayerCount = layers[layerIdx + 1]
        for (let j = 0; j < Math.min(2, nextLayerCount); j++) {
          const targetIdx = nextLayerStart + Math.floor(Math.random() * nextLayerCount)
          newNeurons[idx + i].connections.push(targetIdx)
        }
      }
    }
    idx += count
  })
  
  neurons.value = newNeurons
}

const updateActivations = () => {
  neurons.value.forEach(neuron => {
    // Distance à la souris
    const dist = Math.hypot(neuron.x - mouseX.value, neuron.y - mouseY.value)
    neuron.hovered = dist < 20
    
    // Animation douce
    const targetActivation = neuron.hovered ? 0.8 : 0.3
    neuron.activation += (targetActivation - neuron.activation) * 0.1
  })
  
  requestAnimationFrame(updateActivations)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!svgRef.value) return
  const rect = svgRef.value.getBoundingClientRect()
  mouseX.value = ((e.clientX - rect.left) / rect.width) * 800
  mouseY.value = ((e.clientY - rect.top) / rect.height) * 500
}

const handleNeuronClick = (neuron: Neuron) => {
  // Propager le signal
  neuron.activation = 1
  
  const propagate = (n: Neuron, delay: number) => {
    setTimeout(() => {
      n.connections.forEach(idx => {
        const target = neurons.value[idx]
        if (target && target.activation < 0.8) {
          target.activation = 0.9
          propagate(target, 100)
        }
      })
    }, delay)
  }
  
  propagate(neuron, 0)
  
  // Reset après 2 secondes
  setTimeout(() => {
    neurons.value.forEach(n => {
      n.activation = 0.3
    })
  }, 2000)
}

onMounted(() => {
  createNetwork()
  updateActivations()
})
</script>