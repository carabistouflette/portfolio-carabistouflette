<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-pink/20 via-base to-surface0"></div>
      <!-- Floating particles for voting theme -->
      <div v-for="i in 8" :key="i" 
        class="absolute animate-pulse"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }"
      >
        <div class="w-16 h-16 bg-gradient-to-r from-pink/10 to-mauve/10 rounded-full blur-xl"></div>
      </div>
      <!-- Binary rain effect for crypto theme -->
      <div class="absolute inset-0 opacity-5">
        <div v-for="i in 12" :key="`binary-${i}`"
          class="absolute text-xs font-mono text-pink animate-bounce"
          :style="{
            left: `${i * 8}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: '4s'
          }"
        >
          {{ Math.random() > 0.5 ? '1' : '0' }}{{ Math.random() > 0.5 ? '1' : '0' }}{{ Math.random() > 0.5 ? '1' : '0' }}
        </div>
      </div>
    </div>
    
    <div class="relative z-10 text-center px-6 max-w-6xl mx-auto">
      <div class="mb-8">
        <div class="inline-flex items-center px-4 py-2 bg-pink/10 border border-pink/20 rounded-full mb-6">
          <Icon name="heroicons:shield-check" class="w-5 h-5 text-pink mr-2" />
          <span class="text-pink font-semibold">Cryptographie Avancée</span>
        </div>
        
        <h1 class="text-6xl md:text-7xl font-bold mb-6">
          <span class="bg-gradient-to-r from-pink via-mauve to-lavender bg-clip-text text-transparent">
            Vote Électronique
          </span>
          <br>
          <span class="text-4xl md:text-5xl text-subtext0">Ultra-Sécurisé</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-subtext0 mb-8 max-w-4xl mx-auto leading-relaxed">
          Projet académique explorant un système de vote basé sur 
          <strong class="text-pink">El Gamal</strong> et les 
          <strong class="text-mauve">preuves DDH</strong>
        </p>
      </div>
      
      <!-- Key Features Pills -->
      <div class="flex flex-wrap gap-3 justify-center mb-12">
        <div class="px-4 py-2 bg-pink/20 text-pink rounded-full text-sm border border-pink/30">
          <Icon name="heroicons:eye-slash" class="w-4 h-4 inline mr-2" />
          Anonymat Garanti
        </div>
        <div class="px-4 py-2 bg-mauve/20 text-mauve rounded-full text-sm border border-mauve/30">
          <Icon name="heroicons:shield-check" class="w-4 h-4 inline mr-2" />
          Vérifiabilité Cryptographique
        </div>
        <div class="px-4 py-2 bg-lavender/20 text-lavender rounded-full text-sm border border-lavender/30">
          <Icon name="heroicons:lock-closed" class="w-4 h-4 inline mr-2" />
          Sécurité Quantique
        </div>
        <div class="px-4 py-2 bg-teal/20 text-teal rounded-full text-sm border border-teal/30">
          <Icon name="heroicons:globe-alt" class="w-4 h-4 inline mr-2" />
          Décentralisé
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="$emit('scrollToDemo')" 
          class="px-8 py-4 bg-gradient-to-r from-pink to-mauve text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-pink/20">
          <Icon name="heroicons:play" class="w-5 h-5 inline mr-2" />
          Voir la Démonstration
        </button>
        <button @click="$emit('scrollToTech')" 
          class="px-8 py-4 bg-surface0 border border-surface1 text-text rounded-xl font-semibold hover:border-mauve transition-colors">
          <Icon name="heroicons:academic-cap" class="w-5 h-5 inline mr-2" />
          Comprendre la Technologie
        </button>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <Icon name="heroicons:chevron-down" class="w-6 h-6 text-overlay0" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  scrollToDemo: []
  scrollToTech: []
}>()
</script>