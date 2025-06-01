<template>
  <section ref="sectionRef" class="relative py-section-padding-md md:py-section-padding-lg overflow-hidden hero-section">
    <!-- Enhanced background decoration -->
    <div ref="backgroundRef" class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Animated gradient orbs with parallax -->
      <div class="parallax-orb absolute top-1/4 right-1/4 w-96 h-96" data-speed="0.5">
        <div class="orb-gradient orb-1"></div>
      </div>
      <div class="parallax-orb absolute bottom-1/4 left-1/4 w-64 h-64" data-speed="0.3">
        <div class="orb-gradient orb-2"></div>
      </div>
      <div class="parallax-orb absolute top-3/4 right-1/3 w-80 h-80" data-speed="0.7">
        <div class="orb-gradient orb-3"></div>
      </div>
      
      <!-- Animated mesh gradient -->
      <div class="absolute inset-0 opacity-30">
        <div class="mesh-gradient"></div>
      </div>
      
      <!-- Enhanced grid pattern with perspective -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10 perspective-grid"></div>
      
      <!-- Floating particles -->
      <div class="particles-container absolute inset-0">
        <div class="particle" v-for="i in 20" :key="i"></div>
      </div>
    </div>

    <div class="container-custom relative z-10">
      <div class="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
        <div class="md:w-7/12 space-y-gap-md">
          <h1 class="font-bold leading-tight hero-animate-item">
            <span class="gradient-text gradient-animate">{{ props.title }}</span>
          </h1>
          <h2 class="text-xl md:text-2xl font-medium text-subtext0 mb-gap-lg hero-animate-item hero-delay-1">
            {{ props.subtitle }}
          </h2>
          <p class="text-lg mb-gap-lg max-w-2xl hero-animate-item hero-delay-2">
            {{ props.description }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-gap-md hero-animate-item hero-delay-3">
            <Button 
              :to="props.primaryButton.to" 
              variant="solid" 
              color="mauve" 
              :iconRight="props.primaryButton.iconRight"
              class="hover-scale"
            >
              {{ props.primaryButton.text }}
            </Button>
            <Button 
              v-if="props.secondaryButton" 
              :to="props.secondaryButton.to" 
              variant="outline"
              class="hover-scale"
            >
              {{ props.secondaryButton.text }}
            </Button>
          </div>
        </div>
        
        <!-- Enhanced avatar area with 3D effect -->
        <div class="hidden md:block md:w-5/12 p-component-padding-lg relative md:-ml-16 lg:-ml-24 z-10 hero-animate-item hero-delay-4">
          <div class="relative profile-container">
            <!-- Profile circle with enhanced effects -->
            <div class="profile-wrapper">
              <div class="profile-circle w-64 h-64 rounded-full mx-auto flex items-center justify-center relative z-10">
                <div class="profile-inner absolute inset-0 rounded-full bg-gradient-to-br from-mauve via-blue to-lavender"></div>
                <img :src="props.profileImage" alt="Profile Logo" class="w-32 h-32 relative z-20">
                <!-- Glow effect -->
                <div class="profile-glow absolute inset-0 rounded-full"></div>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  description: string;
  primaryButton: {
    to: string;
    text: string;
    iconRight?: string;
  };
  secondaryButton?: {
    to: string;
    text: string;
  };
  profileImage: string;
}

const props = withDefaults(defineProps<HeroBannerProps>(), {
  secondaryButton: undefined,
  primaryButton: () => ({ to: '/projects', text: 'Découvrir mes projets', iconRight: 'heroicons:arrow-right' }),
  title: 'Alexis Robin',
  subtitle: 'Développeur Système Embarqué & Passionné de Programmation Bas Niveau',
  description: "Étudiant à l'IUT informatique de Montpellier en parcours DACS, je suis un passionné de programmation bas niveau, de philosophie et de photographie.",
  profileImage: '/profile-logo.svg'
});

const sectionRef = ref<HTMLElement>();
const backgroundRef = ref<HTMLElement>();

// Parallax effect on mouse move
const handleMouseMove = (e: MouseEvent) => {
  if (!sectionRef.value || !backgroundRef.value) return;
  
  const rect = sectionRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  
  const orbs = backgroundRef.value.querySelectorAll('.parallax-orb');
  orbs.forEach((orb: Element) => {
    const speed = parseFloat((orb as HTMLElement).dataset.speed || '0.5');
    const translateX = (x - 0.5) * 50 * speed;
    const translateY = (y - 0.5) * 50 * speed;
    (orb as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
  });
  
  // Profile 3D tilt effect
  const profileContainer = sectionRef.value.querySelector('.profile-container');
  if (profileContainer) {
    const tiltX = (y - 0.5) * 10;
    const tiltY = (x - 0.5) * -10;
    (profileContainer as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }
};

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.addEventListener('mousemove', handleMouseMove);
  }
});

onBeforeUnmount(() => {
  if (sectionRef.value) {
    sectionRef.value.removeEventListener('mousemove', handleMouseMove);
  }
});
</script>

<style scoped>
/* Enhanced grid pattern with perspective */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(var(--surface0), 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(var(--surface0), 0.5) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: center center;
}

/* Enhanced orb gradients with glow effect */
.orb-gradient {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  filter: blur(40px) saturate(150%);
  opacity: 0.5;
  animation: orbFloat 20s var(--ease-in-out) infinite;
  will-change: transform;
  mix-blend-mode: screen;
}

.orb-1 {
  background: radial-gradient(circle at 30% 50%, var(--mauve), transparent 70%);
  animation-duration: 15s;
}

.orb-2 {
  background: radial-gradient(circle at 70% 30%, var(--blue), transparent 70%);
  animation-duration: 20s;
  animation-delay: 5s;
}

.orb-3 {
  background: radial-gradient(circle at 50% 70%, var(--peach), transparent 70%);
  animation-duration: 18s;
  animation-delay: 10s;
}

@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  25% {
    transform: translate(20px, -20px) scale(1.05) rotate(90deg);
  }
  50% {
    transform: translate(-10px, -30px) scale(1.1) rotate(180deg);
  }
  75% {
    transform: translate(-20px, 10px) scale(0.95) rotate(270deg);
  }
}

/* Enhanced floating particles */
.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, var(--text), transparent 70%);
  opacity: 0.15;
  border-radius: 50%;
  animation: particleFloat linear infinite;
  filter: blur(0.5px);
}

.particle:nth-child(odd) {
  width: 2px;
  height: 2px;
  animation-duration: 35s;
  left: calc(var(--random) * 100%);
  background: radial-gradient(circle, var(--mauve), transparent 60%);
}

.particle:nth-child(even) {
  animation-duration: 45s;
  left: calc(var(--random) * 100%);
  opacity: 0.1;
  background: radial-gradient(circle, var(--blue), transparent 60%);
}

@keyframes particleFloat {
  from {
    transform: translateY(100vh) rotate(0deg);
  }
  to {
    transform: translateY(-100px) rotate(360deg);
  }
}

/* Generate random positions for particles */
.particle:nth-child(1) { --random: 0.1; animation-delay: 0s; }
.particle:nth-child(2) { --random: 0.2; animation-delay: 2s; }
.particle:nth-child(3) { --random: 0.3; animation-delay: 4s; }
.particle:nth-child(4) { --random: 0.4; animation-delay: 6s; }
.particle:nth-child(5) { --random: 0.5; animation-delay: 8s; }
.particle:nth-child(6) { --random: 0.6; animation-delay: 10s; }
.particle:nth-child(7) { --random: 0.7; animation-delay: 12s; }
.particle:nth-child(8) { --random: 0.8; animation-delay: 14s; }
.particle:nth-child(9) { --random: 0.9; animation-delay: 16s; }
.particle:nth-child(10) { --random: 0.15; animation-delay: 18s; }
.particle:nth-child(11) { --random: 0.25; animation-delay: 20s; }
.particle:nth-child(12) { --random: 0.35; animation-delay: 22s; }
.particle:nth-child(13) { --random: 0.45; animation-delay: 24s; }
.particle:nth-child(14) { --random: 0.55; animation-delay: 26s; }
.particle:nth-child(15) { --random: 0.65; animation-delay: 28s; }
.particle:nth-child(16) { --random: 0.75; animation-delay: 30s; }
.particle:nth-child(17) { --random: 0.85; animation-delay: 32s; }
.particle:nth-child(18) { --random: 0.95; animation-delay: 34s; }
.particle:nth-child(19) { --random: 0.05; animation-delay: 36s; }
.particle:nth-child(20) { --random: 0.12; animation-delay: 38s; }

/* Animated mesh gradient */
.mesh-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -45deg,
    rgba(203, 166, 247, 0.15) 0%,
    rgba(137, 180, 250, 0.15) 25%,
    rgba(148, 226, 213, 0.15) 50%,
    rgba(250, 179, 135, 0.15) 75%,
    rgba(203, 166, 247, 0.15) 100%
  );
  background-size: 400% 400%;
  animation: meshMove 25s var(--ease-in-out) infinite;
  filter: blur(60px) saturate(130%);
}

@keyframes meshMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Enhanced profile with smooth 3D effect */
.profile-container {
  transform-style: preserve-3d;
  transition: transform var(--animation-fast) var(--ease-out);
  will-change: transform;
}

.profile-wrapper {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.profile-circle {
  position: relative;
  transform-style: preserve-3d;
  transition: var(--transition-base);
  will-change: transform;
  cursor: pointer;
}

.profile-inner {
  animation: profileRotate 30s linear infinite;
  opacity: 0.85;
  transform-origin: center;
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
  background: radial-gradient(circle at center, rgba(203, 166, 247, 0.4), rgba(137, 180, 250, 0.2) 50%, transparent 70%);
  filter: blur(25px);
  animation: pulseGlow 4s var(--ease-in-out) infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.3) rotate(180deg);
    opacity: 0.7;
  }
}

.profile-circle:hover {
  transform: translateZ(20px) scale(1.03);
}

.profile-circle:hover .profile-inner {
  animation-duration: 10s;
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

/* Removed duplicate hover scale - using button component's built-in effects */

/* Smooth parallax orb movement */
.parallax-orb {
  will-change: transform;
  transition: transform var(--animation-fast) var(--ease-out);
  transform: translateZ(0);
}

/* Fade-in-up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  animation-iteration-count: 1;
  will-change: opacity, transform;
}

/* Fade-in animation */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  animation-iteration-count: 1;
  will-change: opacity;
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

/* Bounce slow animation */
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
  will-change: transform;
}

/* Staggered animation */
.animate-stagger {
  animation: stagger 0.5s ease-out forwards;
  animation-iteration-count: 1;
  will-change: opacity, transform;
}

@keyframes stagger {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Ensure animations trigger once */
.once {
  animation-iteration-count: 1;
}

/* Smooth scroll for anchor links */
html {
  scroll-behavior: smooth;
}

/* Hero animations - triggered when page is ready */
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

/* Stagger delays for sequential animation */
.hero-delay-1 { animation-delay: 0.1s; }
.hero-delay-2 { animation-delay: 0.2s; }
.hero-delay-3 { animation-delay: 0.3s; }
.hero-delay-4 { animation-delay: 0.4s; }

/* Animated gradient text */
.gradient-animate {
  background: linear-gradient(
    -45deg,
    var(--mauve),
    var(--blue),
    var(--lavender),
    var(--peach),
    var(--yellow),
    var(--green),
    var(--teal),
    var(--sapphire),
    var(--mauve)
  );
  background-size: 300% 300%;
  animation: gradientShift 8s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>