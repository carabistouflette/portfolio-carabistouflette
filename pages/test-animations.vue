<template>
  <div class="min-h-screen bg-base relative">
    <h1 class="text-4xl text-center p-8 relative z-20 text-white">Test des animations</h1>
    
    <!-- Test simple particles -->
    <div class="fixed inset-0 z-10">
      <div 
        v-for="i in 20" 
        :key="i"
        class="particle-test"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${10 + Math.random() * 20}s`
        }"
      />
    </div>
    
    <!-- Test avec des orbes visibles -->
    <div class="fixed inset-0 z-0">
      <div class="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full opacity-25 blur-3xl"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Le composant sera auto-importé grâce à la config Nuxt
</script>

<style scoped>
.particle-test {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #cba6f7;
  border-radius: 50%;
  box-shadow: 0 0 20px #cba6f7, 0 0 40px #cba6f7;
  animation: float infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -30px);
  }
}
</style>