<template>
  <div class="relative">
    <!-- Burger button -->
    <button
      @click="isOpen = !isOpen"
      class="relative z-50 p-2 rounded-lg bg-surface0/50 backdrop-blur-sm border border-overlay0
             hover:border-blue transition-all duration-300 group"
      :class="{ 'border-blue': isOpen }"
      aria-label="Menu spécial"
    >
      <div class="w-6 h-5 flex flex-col justify-between">
        <span 
          class="block h-0.5 bg-text transition-all duration-300 origin-left"
          :class="isOpen ? 'rotate-45 translate-y-0.5' : ''"
        />
        <span 
          class="block h-0.5 bg-text transition-all duration-300"
          :class="isOpen ? 'opacity-0' : ''"
        />
        <span 
          class="block h-0.5 bg-text transition-all duration-300 origin-left"
          :class="isOpen ? '-rotate-45 -translate-y-0.5' : ''"
        />
      </div>
    </button>

    <!-- Menu dropdown -->
    <Transition name="menu">
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-64 rounded-xl bg-surface0/95 backdrop-blur-md
               border border-overlay0 shadow-2xl overflow-hidden"
      >
        <div class="p-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="isOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg
                   hover:bg-surface1 transition-all duration-200 group"
          >
            <div 
              class="w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center
                     group-hover:scale-110 transition-transform"
              :class="item.gradient"
            >
              <Icon :name="item.icon" class="w-5 h-5 text-base" />
            </div>
            <div class="flex-1">
              <p class="font-medium text-text">{{ item.label }}</p>
              <p class="text-xs text-text/60">{{ item.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        @click="isOpen = false"
        class="fixed inset-0 z-40"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const menuItems = [
  {
    path: '/portfolio-apprentissage',
    label: 'Portfolio d\'apprentissage',
    description: 'Mon parcours et mes compétences',
    icon: 'heroicons:academic-cap',
    gradient: 'from-peach/20 to-yellow/20'
  },
  {
    path: '/ia',
    label: 'Et l\'IA?',
    description: 'L\'IA dans le développement moderne',
    icon: 'heroicons:cpu-chip',
    gradient: 'from-blue/20 to-lavender/20'
  }
]
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>