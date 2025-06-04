<template>
  <div class="relative profile-container magnetic-container" ref="containerRef">
    <!-- Profile circle with enhanced effects -->
    <div class="profile-wrapper">
      <div 
        class="profile-circle w-64 h-64 rounded-full mx-auto flex items-center justify-center relative z-10 magnetic-element" 
        @click="handleLogoClick"
      >
        <div class="profile-inner absolute inset-0 rounded-full bg-gradient-to-br from-mauve via-blue to-lavender"></div>
        <img 
          :src="profileImage" 
          :alt="imageAlt" 
          class="w-32 h-32 relative z-20 profile-image"
          loading="eager"
          importance="high"
        >
        <!-- Enhanced glow effect -->
        <div class="profile-glow absolute inset-0 rounded-full"></div>
        <!-- Additional depth layers -->
        <div class="profile-depth-1 absolute inset-2 rounded-full bg-gradient-to-br from-mauve/20 via-blue/20 to-lavender/20"></div>
        <div class="profile-depth-2 absolute inset-4 rounded-full bg-gradient-to-br from-mauve/10 via-blue/10 to-lavender/10"></div>
      </div>
    </div>
    
    <!-- Enhanced decorative elements with float animation -->
    <div class="float-element absolute top-0 right-0 -mr-4 -mt-4">
      <div class="w-16 h-16 bg-gradient-to-br from-peach to-yellow rounded-full blur-sm"></div>
    </div>
    <div class="float-element absolute bottom-0 left-0 -ml-6 -mb-6" style="animation-delay: 1.5s;">
      <div class="w-24 h-24 bg-gradient-to-tr from-green to-teal rounded-full blur-sm"></div>
    </div>
    <div class="float-element absolute top-1/2 -right-8 -translate-y-1/2" style="animation-delay: 0.7s;">
      <div class="w-12 h-12 bg-gradient-to-bl from-sapphire to-blue rounded-full blur-sm"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  profileImage: string
  imageAlt?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: "Logo personnel d'Alexis Robin, développeur full stack et étudiant en informatique"
})

const containerRef = ref<HTMLElement>()

const handleLogoClick = () => {
  const profileCircle = containerRef.value?.querySelector('.profile-circle');
  if (!profileCircle) return;
  
  // Animation subtile
  profileCircle.classList.add('logo-click-animation');
  
  // Créer une onde subtile
  const rect = profileCircle.getBoundingClientRect();
  const ripple = document.createElement('div');
  ripple.className = 'logo-ripple';
  ripple.style.width = ripple.style.height = '400px';
  ripple.style.left = (rect.left + rect.width / 2 - 200) + 'px';
  ripple.style.top = (rect.top + rect.height / 2 - 200) + 'px';
  
  document.body.appendChild(ripple);
  
  // Supprimer l'onde après l'animation
  setTimeout(() => ripple.remove(), 2000);
  
  // Retirer la classe d'animation après la fin
  setTimeout(() => {
    profileCircle.classList.remove('logo-click-animation');
  }, 400);
};

defineExpose({ containerRef })
</script>

<style scoped>
/* Simplified profile with smooth 3D effect */
.magnetic-container {
  transform-style: preserve-3d;
  transition: transform 0.2s ease-out;
  will-change: transform;
  cursor: pointer;
}

.profile-wrapper {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.profile-circle {
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s ease-out;
  will-change: transform;
  cursor: pointer;
}

.magnetic-element {
  transition: all 0.3s ease-out;
}

.magnetic-element:hover {
  transform: scale(1.08);
  filter: brightness(1.08);
}

.profile-inner {
  animation: profileRotate 30s linear infinite;
  opacity: 0.85;
  transform-origin: center;
  transition: animation-duration 0.3s ease;
}

@keyframes profileRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.profile-glow {
  background: radial-gradient(circle at center, rgba(203, 166, 247, 0.6), rgba(137, 180, 250, 0.4) 50%, transparent 70%);
  filter: blur(25px);
  animation: pulseGlow 4s var(--ease-in-out) infinite;
  transition: all 0.3s ease;
}

@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.4) rotate(180deg);
    opacity: 0.9;
  }
}

/* Couches de profondeur pour l'effet 3D */
.profile-depth-1, .profile-depth-2 {
  transition: transform 0.3s ease-out;
  will-change: transform;
  pointer-events: none;
  opacity: 0.3;
}

.profile-depth-1 {
  animation: profileRotate 45s linear infinite reverse;
}

.profile-depth-2 {
  animation: profileRotate 60s linear infinite;
}

.magnetic-container:hover .profile-inner {
  animation-duration: 15s;
}

.magnetic-container:hover .profile-glow {
  opacity: 1;
  transform: scale(1.4);
  filter: blur(30px);
}

.magnetic-container:hover .profile-depth-1 {
  opacity: 0.7;
}

.magnetic-container:hover .profile-depth-2 {
  opacity: 0.6;
}

/* Floating decorative elements */
.float-element {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(5px) translateX(-5px);
  }
  75% {
    transform: translateY(-10px) translateX(-10px);
  }
}

/* Logo click animation - ultra fluide */
.logo-click-animation {
  animation: logoClickSmooth 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

@keyframes logoClickSmooth {
  0% {
    transform: scale(1) translateZ(0);
  }
  40% {
    transform: scale(0.97) translateZ(0);
  }
  100% {
    transform: scale(1) translateZ(0);
  }
}

/* Onde subtile au clic */
:global(.logo-ripple) {
  position: fixed;
  border-radius: 50%;
  border: 1px solid rgba(203, 166, 247, 0.2);
  background: radial-gradient(circle, rgba(203, 166, 247, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1000;
  animation: logoRippleSmooth 2s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
  will-change: transform, opacity;
}

@keyframes logoRippleSmooth {
  0% {
    transform: scale(0) translateZ(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: scale(1.2) translateZ(0);
    opacity: 0;
  }
}

/* Animation fluide du glow lors du clic */
.logo-click-animation .profile-glow {
  animation: smoothGlow 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
}

@keyframes smoothGlow {
  0% {
    opacity: 0.6;
    transform: scale(1) translateZ(0);
  }
  50% {
    opacity: 0.75;
    transform: scale(1.05) translateZ(0);
  }
  100% {
    opacity: 0.6;
    transform: scale(1) translateZ(0);
  }
}

/* Transition fluide sur le logo */
.profile-circle {
  transition: transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  will-change: transform;
}

.profile-circle:active {
  transform: scale(0.98) translateZ(0);
}

/* Ajout d'un indicateur visuel que le logo est cliquable */
.profile-circle {
  cursor: pointer;
  user-select: none;
}

.profile-circle:active {
  transform: scale(0.95);
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .profile-inner,
  .profile-glow,
  .float-element {
    animation: none;
  }
}
</style>