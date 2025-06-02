<template>
  <button
    ref="burgerRef"
    class="burger-menu relative w-12 h-12 rounded-xl bg-surface0/50 hover:bg-surface0 transition-all duration-300 group"
    :class="{ 'is-open': isOpen }"
    :aria-label="isOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
    :aria-expanded="isOpen"
    @click="$emit('toggle')"
  >
    <!-- Effet magnétique -->
    <div 
      class="absolute inset-0 rounded-xl transition-transform duration-200"
      :style="magneticStyle"
    >
      <!-- Lignes du burger -->
      <span class="burger-line burger-line-top" />
      <span class="burger-line burger-line-middle" />
      <span class="burger-line burger-line-bottom" />
      
      <!-- Effet de glow au hover -->
      <div 
        class="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :class="isOpen ? 'from-red/20 to-maroon/20' : 'from-mauve/20 to-blue/20'"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMagneticEffect } from '~/composables/useMagneticEffect';

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

// Events
defineEmits(['toggle']);

// Refs
const burgerRef = ref<HTMLElement | null>(null);

// Magnetic effect
const { magneticStyle } = useMagneticEffect(burgerRef, {
  maxDistance: 80,
  strength: 0.3
});
</script>

<style scoped>
/* Base burger styles */
.burger-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

/* Burger lines */
.burger-line {
  position: absolute;
  left: 50%;
  width: 24px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transform: translateX(-50%);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.burger-line-top {
  top: 30%;
}

.burger-line-middle {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.burger-line-bottom {
  bottom: 30%;
}

/* Hover state (non ouvert) */
.burger-menu:not(.is-open):hover .burger-line-top {
  transform: translateX(-50%) translateY(-2px);
}

.burger-menu:not(.is-open):hover .burger-line-bottom {
  transform: translateX(-50%) translateY(2px);
}

.burger-menu:not(.is-open):hover .burger-line-middle {
  width: 28px;
  background: var(--mauve);
}

/* État ouvert */
.burger-menu.is-open {
  color: var(--red);
}

.burger-menu.is-open .burger-line-top {
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  background: var(--red);
}

.burger-menu.is-open .burger-line-middle {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0);
}

.burger-menu.is-open .burger-line-bottom {
  bottom: 50%;
  transform: translateX(-50%) translateY(50%) rotate(-45deg);
  background: var(--red);
}

/* Animation de pulse quand ouvert */
@keyframes burgerPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(243, 139, 168, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(243, 139, 168, 0);
  }
}

.burger-menu.is-open {
  animation: burgerPulse 2s infinite;
}

/* Active state */
.burger-menu:active {
  transform: scale(0.95);
}

/* Focus state */
.burger-menu:focus-visible {
  outline: 2px solid var(--mauve);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .burger-line,
  .burger-menu {
    transition: none !important;
    animation: none !important;
  }
}
</style>