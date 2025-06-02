<template>
  <section 
    ref="sectionRef" 
    class="relative py-section-padding-md md:py-section-padding-lg overflow-hidden hero-section" 
    @scroll="handleScroll"
    aria-label="Section d'introduction avec profil et présentation"
  >
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
      
      <!-- Interactive floating particles -->
      <div 
        ref="particlesRef" 
        class="particles-container absolute inset-0"
        aria-hidden="true"
        role="presentation"
      >
        <div 
          class="particle interactive-particle" 
          v-for="i in getOptimalParticleCount()" 
          :key="i"
          :style="{
            '--particle-x': particlePositions[i-1]?.x + '%',
            '--particle-y': particlePositions[i-1]?.y + '%',
            left: particlePositions[i-1]?.x + '%',
            top: particlePositions[i-1]?.y + '%'
          }"
          aria-hidden="true"
        ></div>
      </div>
    </div>

    <div class="container-custom relative z-10">
      <div class="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
        <div class="md:w-7/12 space-y-gap-md">
          <h1 class="font-bold leading-tight hero-animate-item !text-4xl md:!text-5xl lg:!text-6xl">
            <span class="gradient-text gradient-animate typing-text" ref="titleRef">{{ displayedTitle }}</span>
            <span class="typing-cursor" v-if="isTyping">|</span>
          </h1>
          <h2 class="!text-xl md:!text-2xl font-medium text-subtext0 mb-gap-lg hero-animate-item hero-delay-1">
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
              class="ripple-button"
              @click="createRipple"
              :aria-label="`${props.primaryButton.text} - Accéder à la page des projets`"
            >
              {{ props.primaryButton.text }}
            </Button>
            <Button 
              v-if="props.secondaryButton" 
              :to="props.secondaryButton.to" 
              variant="outline"
              class="ripple-button"
              @click="createRipple"
              :aria-label="`${props.secondaryButton.text} - Navigation secondaire`"
            >
              {{ props.secondaryButton.text }}
            </Button>
          </div>
        </div>
        
        <!-- Enhanced avatar area with 3D effect -->
        <div class="hidden md:block md:w-5/12 p-component-padding-lg relative md:-ml-16 lg:-ml-24 z-10 hero-animate-item hero-delay-4">
          <div class="relative profile-container magnetic-container">
            <!-- Profile circle with enhanced effects -->
            <div class="profile-wrapper">
              <div class="profile-circle w-64 h-64 rounded-full mx-auto flex items-center justify-center relative z-10 magnetic-element">
                <div class="profile-inner absolute inset-0 rounded-full bg-gradient-to-br from-mauve via-blue to-lavender"></div>
                <img 
                  :src="props.profileImage" 
                  alt="Photo de profil d'Alexis Robin, développeur full stack" 
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed, nextTick } from 'vue';

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
  subtitle: 'Développeur Full Stack & Passionné de Programmation Bas Niveau',
  description: "Étudiant à l'IUT informatique de Montpellier en parcours DACS, je suis un passionné de programmation bas niveau, de philosophie et de photographie.",
  profileImage: '/profile-logo.svg'
});

const sectionRef = ref<HTMLElement>();
const backgroundRef = ref<HTMLElement>();
const particlesRef = ref<HTMLElement>();
const titleRef = ref<HTMLElement>();

// Typing animation state
const displayedTitle = ref('');
const isTyping = ref(true);
const typingSpeed = 150; // Ralenti de 80ms à 150ms

// Scroll progress state
const scrollProgress = ref(0);

// Interactive particles state
const particlePositions = ref(Array.from({ length: 20 }, (_, i) => {
  // Position initiale aléatoire dans la section hero
  const x = Math.random() * 100; // Pourcentage de la largeur
  const y = Math.random() * 100; // Pourcentage de la hauteur
  return {
    x,
    y,
    targetX: x,
    targetY: y,
    velocityX: 0,
    velocityY: 0,
    baseX: x, // Position de base pour le retour
    baseY: y
  };
}));

// Mouse position
const mousePos = ref({ x: 0, y: 0 });

// Animation frame ID for cleanup
let animationFrameId: number | null = null;

// Performance detection
const prefersReducedMotion = ref(false)
const isMobile = ref(false)
const shouldAnimate = computed(() => !prefersReducedMotion.value && !isMobile.value)

const detectDeviceCapabilities = () => {
  if (typeof window === 'undefined') return
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  isMobile.value = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const getOptimalParticleCount = () => {
  if (!shouldAnimate.value) return 0
  return isMobile.value ? 8 : 20
}

const getAnimationSmoothness = () => {
  return isMobile.value ? 0.01 : 0.02
}

// Enhanced parallax effect on mouse move with particle interaction
const handleMouseMove = (e: MouseEvent) => {
  if (!sectionRef.value || !backgroundRef.value || prefersReducedMotion.value) return;
  
  const rect = sectionRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  
  // Update mouse position for particle interaction
  mousePos.value = { x: e.clientX, y: e.clientY };
  
  // Enhanced parallax for orbs with multiple layers
  const orbs = backgroundRef.value.querySelectorAll('.parallax-orb');
  orbs.forEach((orb: Element, index) => {
    const speed = parseFloat((orb as HTMLElement).dataset.speed || '0.5');
    const layer = (index + 1) * 0.2; // Multiple parallax layers
    const translateX = (x - 0.5) * 80 * speed * layer;
    const translateY = (y - 0.5) * 80 * speed * layer;
    const rotateZ = (x - 0.5) * 20 * speed;
    (orb as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotateZ}deg) scale(${1 + layer * 0.1})`;
  });
  
  // Simplified profile 3D tilt effect
  const magneticContainer = sectionRef.value.querySelector('.magnetic-container');
  if (magneticContainer) {
    const rect = magneticContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculer la distance de la souris par rapport au centre
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Seulement appliquer l'effet si la souris est proche
    if (distance < 250) {
      const normalizedX = deltaX / 250; // Normaliser entre -1 et 1
      const normalizedY = deltaY / 250;
      
      // Effet magnétique plus prononcé mais contrôlé
      const tiltX = normalizedY * 15; // Augmenté de 8 à 15
      const tiltY = normalizedX * -15;
      const translateZ = Math.abs(normalizedX) * 20 + Math.abs(normalizedY) * 20;
      const scale = 1 + (Math.abs(normalizedX) + Math.abs(normalizedY)) * 0.03;
      
      (magneticContainer as HTMLElement).style.transform = `
        perspective(1200px) 
        rotateX(${tiltX}deg) 
        rotateY(${tiltY}deg) 
        translateZ(${translateZ}px)
        scale(${scale})
      `;
      
      // Effet plus visible sur les couches de profondeur
      const depth1 = magneticContainer.querySelector('.profile-depth-1');
      const depth2 = magneticContainer.querySelector('.profile-depth-2');
      
      if (depth1) {
        (depth1 as HTMLElement).style.transform = `translate(${normalizedX * 6}px, ${normalizedY * 6}px) rotate(${normalizedX * 5}deg)`;
      }
      if (depth2) {
        (depth2 as HTMLElement).style.transform = `translate(${normalizedX * -4}px, ${normalizedY * -4}px) rotate(${normalizedX * -8}deg)`;
      }
    } else {
      // Reset quand la souris est loin
      (magneticContainer as HTMLElement).style.transform = '';
      const depth1 = magneticContainer.querySelector('.profile-depth-1');
      const depth2 = magneticContainer.querySelector('.profile-depth-2');
      if (depth1) (depth1 as HTMLElement).style.transform = '';
      if (depth2) (depth2 as HTMLElement).style.transform = '';
    }
  }
  
  // Interactive particles - attract to mouse
  updateParticleTargets(e.clientX, e.clientY);
};

// Scroll handler for reveal animations
const handleScroll = () => {
  if (!sectionRef.value) return;
  
  const rect = sectionRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const elementTop = rect.top;
  const elementHeight = rect.height;
  
  // Calculate scroll progress (0 to 1)
  const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
  scrollProgress.value = progress;
  
  // Apply scroll-based transformations
  if (backgroundRef.value) {
    const orbs = backgroundRef.value.querySelectorAll('.parallax-orb');
    orbs.forEach((orb: Element, index) => {
      const speed = 0.5 + index * 0.2;
      const translateY = (1 - progress) * 100 * speed;
      const currentTransform = (orb as HTMLElement).style.transform;
      const baseTransform = currentTransform.split('translateY')[0] || '';
      (orb as HTMLElement).style.transform = `${baseTransform} translateY(${translateY}px)`;
    });
  }
};

// Typing animation
const startTypingAnimation = async () => {
  if (!props.title) return;
  
  displayedTitle.value = '';
  isTyping.value = true;
  
  for (let i = 0; i <= props.title.length; i++) {
    displayedTitle.value = props.title.slice(0, i);
    await new Promise(resolve => setTimeout(resolve, typingSpeed));
  }
  
  // Blink cursor a few times then hide
  setTimeout(() => {
    isTyping.value = false;
  }, 1000);
};

// Ripple effect for buttons
const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement;
  const rect = button.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.classList.add('ripple');
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
};

// Update particle targets based on mouse position
const updateParticleTargets = (mouseX: number, mouseY: number) => {
  if (!sectionRef.value) return;
  
  const rect = sectionRef.value.getBoundingClientRect();
  const mouseXPercent = ((mouseX - rect.left) / rect.width) * 100;
  const mouseYPercent = ((mouseY - rect.top) / rect.height) * 100;
  
  particlePositions.value.forEach((particle, index) => {
    const distance = Math.sqrt(
      Math.pow(mouseXPercent - particle.x, 2) + Math.pow(mouseYPercent - particle.y, 2)
    );
    
    const attractionRadius = 25; // En pourcentage
    const repulsionRadius = 10; // En pourcentage
    
    if (distance < repulsionRadius) {
      // Repulsion effect
      const angle = Math.atan2(particle.y - mouseYPercent, particle.x - mouseXPercent);
      const force = (repulsionRadius - distance) / repulsionRadius;
      particle.targetX = particle.x + Math.cos(angle) * force * 5;
      particle.targetY = particle.y + Math.sin(angle) * force * 5;
    } else if (distance < attractionRadius) {
      // Attraction effect
      const angle = Math.atan2(mouseYPercent - particle.y, mouseXPercent - particle.x);
      const force = (attractionRadius - distance) / attractionRadius;
      particle.targetX = particle.x + Math.cos(angle) * force * 3;
      particle.targetY = particle.y + Math.sin(angle) * force * 3;
    } else {
      // Return to base position
      particle.targetX = particle.baseX;
      particle.targetY = particle.baseY;
    }
    
    // Limiter les particules dans les limites de la section
    particle.targetX = Math.max(0, Math.min(100, particle.targetX));
    particle.targetY = Math.max(0, Math.min(100, particle.targetY));
  });
};

// Animate particles with performance optimizations
const animateParticles = () => {
  // Skip animation if not allowed
  if (!shouldAnimate.value) {
    return;
  }
  
  particlePositions.value.forEach(particle => {
    // Smooth interpolation with adaptive frequency
    const smoothing = getAnimationSmoothness();
    particle.velocityX += (particle.targetX - particle.x) * smoothing;
    particle.velocityY += (particle.targetY - particle.y) * smoothing;
    
    // Apply friction
    particle.velocityX *= 0.95;
    particle.velocityY *= 0.95;
    
    // Update position
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
  });
  
  animationFrameId = requestAnimationFrame(animateParticles);
};

onMounted(async () => {
  // Detect device capabilities
  detectDeviceCapabilities();
  
  if (sectionRef.value) {
    sectionRef.value.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
  }
  
  // Start typing animation after a short delay
  await nextTick();
  setTimeout(() => {
    startTypingAnimation();
  }, 500);
  
  // Start particle animation only if motion is allowed
  if (shouldAnimate.value) {
    animateParticles();
  }
  
  // Initialize scroll position
  handleScroll();
});

onBeforeUnmount(() => {
  if (sectionRef.value) {
    sectionRef.value.removeEventListener('mousemove', handleMouseMove);
  }
  window.removeEventListener('scroll', handleScroll);
  
  // Cancel animation frame to prevent memory leaks
  if (animationFrameId !== null) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
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

/* Enhanced interactive floating particles - plus visibles */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, var(--mauve) 0%, var(--blue) 30%, transparent 70%);
  opacity: 0.6;
  border-radius: 50%;
  animation: particleFloat linear infinite;
  filter: blur(0px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(203, 166, 247, 0.5);
}

.interactive-particle {
  position: absolute;
  transition: all 0.2s ease-out;
}

.interactive-particle:hover {
  width: 12px;
  height: 12px;
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(203, 166, 247, 0.8);
  filter: blur(0px);
}

.particle:nth-child(odd) {
  width: 8px;
  height: 8px;
  animation-duration: 35s;
  left: calc(var(--random) * 100%);
  background: radial-gradient(circle, var(--mauve) 0%, var(--peach) 40%, transparent 70%);
  opacity: 0.7;
  box-shadow: 0 0 15px rgba(250, 179, 135, 0.6);
}

.particle:nth-child(even) {
  width: 5px;
  height: 5px;
  animation-duration: 45s;
  left: calc(var(--random) * 100%);
  opacity: 0.5;
  background: radial-gradient(circle, var(--blue) 0%, var(--teal) 40%, transparent 70%);
  box-shadow: 0 0 12px rgba(137, 180, 250, 0.5);
}

@keyframes particleFloat {
  from {
    transform: translateY(100vh) rotate(0deg);
  }
  to {
    transform: translateY(-100px) rotate(360deg);
  }
}

/* Désactiver l'animation float pour les particules interactives */
.interactive-particle {
  animation: none !important;
}

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

/* Typing animation styles */
.typing-text {
  display: inline-block;
}

.typing-cursor {
  display: inline-block;
  background-color: var(--text);
  width: 2px;
  margin-left: 2px;
  animation: typingBlink 1s infinite;
}

@keyframes typingBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Button ripple effect */
.ripple-button {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ripple-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.ripple-button:active {
  transform: translateY(0) scale(0.98);
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  transform: scale(0);
  animation: rippleAnimation 1.2s ease-out;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

@keyframes rippleAnimation {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

/* Enhanced scroll reveal animations */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Enhanced particle interactions */
.particle:hover {
  transform: scale(3) !important;
  opacity: 1;
  filter: blur(0px) brightness(1.5);
  z-index: 100;
  transition: all 0.3s ease-out;
}

/* Advanced hover states with magnetic effect */
.hero-section:hover .orb-gradient {
  filter: blur(35px) saturate(180%) brightness(1.1);
}

.hero-section:hover .mesh-gradient {
  opacity: 0.4;
  filter: blur(50px) saturate(150%) hue-rotate(15deg);
}

.hero-section:hover .particles-container .particle {
  animation-duration: 25s;
  opacity: 0.25;
}

/* Responsive enhancements */
@media (max-width: 768px) {
  .particle {
    width: 4px;
    height: 4px;
  }
  
  .particle:nth-child(odd) {
    width: 5px;
    height: 5px;
  }
  
  .particle:nth-child(even) {
    width: 3px;
    height: 3px;
  }
  
  .ripple-button:hover {
    transform: none;
    box-shadow: none;
  }
  
  .profile-container:hover {
    transform: none;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .particle,
  .orb-gradient,
  .mesh-gradient,
  .profile-inner,
  .profile-glow,
  .float-element,
  .gradient-animate {
    animation: none;
  }
  
  .ripple-button,
  .profile-container,
  .interactive-particle {
    transition: none;
    transform: none;
  }
}
</style>