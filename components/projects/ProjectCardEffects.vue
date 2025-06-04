<template>
  <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
    <!-- Dynamic glow effect -->
    <div 
      class="absolute w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
      :style="{
        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, var(--mauve) 0%, transparent 50%)`
      }"
    ></div>
    
    <!-- Floating elements for enhanced visual effect -->
    <div 
      class="absolute w-3 h-3 bg-gradient-to-r from-mauve/40 to-pink/40 rounded-full transition-all duration-500"
      :style="floatingElementStyle(0)"
    ></div>
    <div 
      class="absolute w-2 h-2 bg-gradient-to-r from-blue/40 to-teal/40 rounded-full transition-all duration-700"
      :style="floatingElementStyle(1)"
    ></div>
    <div 
      class="absolute w-4 h-4 bg-gradient-to-r from-green/30 to-yellow/30 rounded-full transition-all duration-600"
      :style="floatingElementStyle(2)"
    ></div>
    
    <!-- Animated border glow -->
    <div 
      class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style="
        background: linear-gradient(45deg, transparent, var(--mauve), transparent);
        background-size: 200% 200%;
        animation: borderGlow 3s ease-in-out infinite;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        padding: 1px;
      "
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  glowPosition: { x: number; y: number }
  mousePosition: { x: number; y: number }
}

const props = defineProps<Props>()

const floatingElementStyle = (index: number) => {
  const basePositions = [
    { left: '10%', top: '20%' },
    { right: '15%', bottom: '25%' },
    { left: '50%', top: '60%' }
  ]
  
  const pos = basePositions[index]
  const offsetX = (props.mousePosition.x - 50) * 0.1 * (index + 1)
  const offsetY = (props.mousePosition.y - 50) * 0.1 * (index + 1)
  
  return {
    ...pos,
    transform: `translate(${offsetX}px, ${offsetY}px)`,
    opacity: 0.7
  }
}
</script>

<style scoped>
@keyframes borderGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>