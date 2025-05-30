<template>
  <section ref="sectionRef" class="relative py-section-padding-md md:py-section-padding-lg overflow-hidden hero-section">
    <!-- Background decoration -->
    <div ref="backgroundRef" class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Animated gradient circles -->
      <div class="parallax-bg absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-mauve/30 to-lavender/20 blur-3xl animate-pulse-slow"></div>
      <div class="parallax-bg absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-tl from-blue/30 to-sapphire/20 blur-2xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      <div class="parallax-bg absolute top-3/4 right-1/3 w-80 h-80 rounded-full bg-gradient-to-bl from-peach/25 to-yellow/20 blur-2xl animate-pulse-slow" style="animation-delay: 2s;"></div>
      
      <!-- Animated mesh gradient -->
      <div class="absolute inset-0 opacity-40">
        <div class="mesh-gradient"></div>
      </div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
    </div>

    <div class="container-custom relative z-10">
      <div class="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
        <div class="md:w-7/12 space-y-gap-md">
          <h1 class="font-bold leading-tight hero-animate-item">
            <span class="gradient-text">{{ props.title }}</span>
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
        
        <!-- Avatar/Image area - Adjusted for overlap -->
        <div class="hidden md:block md:w-5/12 p-component-padding-lg relative md:-ml-16 lg:-ml-24 z-10 hero-animate-item hero-delay-4"> <!-- Added relative, negative margin, z-10 -->
          <div class="relative">
            <!-- Profile circle with AR initials -->
            <div class="profile-circle w-64 h-64 rounded-full bg-gradient-to-br from-mauve to-blue mx-auto flex items-center justify-center shadow-lg relative z-10">
              <img :src="props.profileImage" alt="Profile Logo" class="w-32 h-32">
            </div>
            
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-peach rounded-full opacity-70 animate-bounce-slow"></div>
            <div class="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 bg-green rounded-full opacity-60 animate-bounce-slow" style="animation-delay: 1.5s;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';

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

// Cleanup animations on component unmount
onBeforeUnmount(() => {
  const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in, .animate-stagger, .animate-pulse-slow, .animate-bounce-slow');
  animatedElements.forEach(el => {
    el.classList.remove('animate-fade-in-up', 'animate-fade-in', 'animate-stagger', 'animate-pulse-slow', 'animate-bounce-slow');
  });
});
</script>

<style scoped>
/* Grid pattern for background */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, #313244 1px, transparent 1px),
    linear-gradient(to bottom, #313244 1px, transparent 1px);
  background-size: 30px 30px;
}

/* Animated mesh gradient */
.mesh-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -45deg,
    rgba(203, 166, 247, 0.2) 0%,
    rgba(137, 180, 250, 0.2) 25%,
    rgba(148, 226, 213, 0.2) 50%,
    rgba(250, 179, 135, 0.2) 75%,
    rgba(203, 166, 247, 0.2) 100%
  );
  background-size: 400% 400%;
  animation: meshMove 20s ease infinite;
  filter: blur(40px);
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

/* Profile circle hover effect */
.profile-circle {
  transition: transform 0.3s ease-in-out;
  will-change: transform;
}

.profile-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Button hover scale */
.hover-scale {
  transition: transform 0.3s ease-in-out;
  will-change: transform;
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* Parallax background effect */
.parallax-bg {
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateY(0) translateX(0);
}

.parallax-bg:hover {
  transform: translateY(-15px) translateX(5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
  transform: translateY(30px);
  animation: heroFadeInUp 0.8s ease-out forwards;
}

@keyframes heroFadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger delays for sequential animation */
.hero-delay-1 { animation-delay: 0.1s; }
.hero-delay-2 { animation-delay: 0.2s; }
.hero-delay-3 { animation-delay: 0.3s; }
.hero-delay-4 { animation-delay: 0.4s; }
</style>