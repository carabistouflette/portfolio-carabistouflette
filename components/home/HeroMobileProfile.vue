<template>
  <div class="mobile-profile block md:hidden mt-8 mb-12 order-first hero-animate-item hero-delay-1">
    <div class="relative profile-container-mobile mx-auto">
      <!-- Glow effect background -->
      <div class="absolute inset-0 -inset-4">
        <div class="absolute inset-0 bg-gradient-to-r from-mauve via-blue to-peach rounded-full blur-2xl opacity-40 animate-pulse-slow"></div>
      </div>
      
      <div class="profile-wrapper-mobile">
        <div 
          class="profile-circle-mobile w-48 h-48 rounded-full mx-auto flex items-center justify-center relative z-10" 
          @click="handleLogoClick"
        >
          <div class="profile-inner-mobile absolute inset-0 rounded-full bg-gradient-to-br from-mauve via-blue to-lavender"></div>
          <img 
            :src="profileImage" 
            :alt="imageAlt" 
            class="w-24 h-24 relative z-20 profile-image drop-shadow-2xl"
            loading="eager"
            importance="high"
          >
          <div class="profile-glow-mobile absolute inset-0 rounded-full"></div>
          <!-- Extra shine layer -->
          <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent"></div>
        </div>
      </div>
      
      <!-- Enhanced mobile decorative elements -->
      <div class="float-element-mobile absolute -top-6 -right-6">
        <div class="w-16 h-16 bg-gradient-to-br from-peach to-yellow rounded-full blur-md opacity-80"></div>
      </div>
      <div class="float-element-mobile absolute -bottom-6 -left-6" style="animation-delay: 1.5s;">
        <div class="w-20 h-20 bg-gradient-to-tr from-green to-teal rounded-full blur-md opacity-80"></div>
      </div>
      <div class="float-element-mobile absolute top-1/2 -right-10 -translate-y-1/2" style="animation-delay: 0.7s;">
        <div class="w-10 h-10 bg-gradient-to-bl from-sapphire to-blue rounded-full blur-sm opacity-70"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  profileImage: string
  imageAlt?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: "Logo personnel d'Alexis Robin, développeur full stack et étudiant en informatique"
})

const handleLogoClick = () => {
  // Mobile click effect - simplified
  const profileCircle = document.querySelector('.profile-circle-mobile');
  if (!profileCircle) return;
  
  profileCircle.classList.add('logo-click-animation');
  
  setTimeout(() => {
    profileCircle.classList.remove('logo-click-animation');
  }, 400);
}
</script>

<style scoped>
/* Mobile Profile Styles */
.mobile-profile {
  order: -1;
}

.profile-container-mobile {
  width: 200px;
  height: 200px;
  position: relative;
}

.profile-wrapper-mobile {
  width: 100%;
  height: 100%;
  position: relative;
}

.profile-circle-mobile {
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35),
              0 0 0 1px rgba(255, 255, 255, 0.1);
  background: var(--surface0);
}

.profile-circle-mobile:active {
  transform: scale(0.95);
}

.profile-inner-mobile {
  animation: profileRotate 30s linear infinite;
  opacity: 0.95;
}

@keyframes profileRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.profile-glow-mobile {
  background: radial-gradient(circle at center, 
    rgba(203, 166, 247, 0.9), 
    rgba(137, 180, 250, 0.7) 40%, 
    rgba(250, 179, 135, 0.4) 70%, 
    transparent 100%);
  filter: blur(25px);
  animation: pulseGlowMobile 3s ease-in-out infinite;
  transform: scale(1.1);
}

@keyframes pulseGlowMobile {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1.1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.float-element-mobile {
  animation: floatMobile 4s ease-in-out infinite;
}

@keyframes floatMobile {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  50% {
    transform: translateY(-10px) translateX(5px) scale(1.1);
  }
}

/* Pulse slow animation */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
  will-change: opacity, transform;
}

/* Logo click animation */
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

/* Hero animation delays */
.hero-animate-item {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  animation: heroFadeInUp var(--animation-slower) var(--ease-out) forwards;
}

@keyframes heroFadeInUp {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hero-delay-1 { animation-delay: 0.1s; }

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .profile-inner-mobile,
  .profile-glow-mobile,
  .float-element-mobile {
    animation: none;
  }
  
  .profile-circle-mobile {
    transition: none;
  }
}
</style>