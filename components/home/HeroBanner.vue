<template>
  <section class="relative py-section-padding-md md:py-section-padding-lg overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Animated gradient circles -->
      <div class="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-mauve/10 animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue/10 animate-pulse-slow" style="animation-delay: 1s;"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>

    <div class="container-custom relative z-10">
      <div class="relative flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
        <div class="md:w-7/12 space-y-gap-md animate-slide-up relative z-20"> <!-- Added relative z-20 -->
          <h1 class="font-bold leading-tight">
            <span class="gradient-text opacity-100">{{ props.title }}</span>
          </h1>
          <h2 class="text-xl md:text-2xl font-medium text-subtext0 mb-gap-lg">
            {{ props.subtitle }}
          </h2>
          <p class="text-lg mb-gap-lg max-w-2xl">
            {{ props.description }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-gap-md">
            <Button :to="props.primaryButton.to" variant="solid" color="mauve" :iconRight="props.primaryButton.iconRight">
              {{ props.primaryButton.text }}
            </Button>
            <Button v-if="props.secondaryButton" :to="props.secondaryButton.to" variant="outline">
              {{ props.secondaryButton.text }}
            </Button>
          </div>
        </div>
        
        <!-- Avatar/Image area - Adjusted for overlap -->
        <div class="hidden md:block md:w-5/12 p-component-padding-lg animate-fade-in relative md:-ml-16 lg:-ml-24 z-10"> <!-- Added relative, negative margin, z-10 -->
          <div class="relative">
            <!-- Profile circle with AR initials -->
            <div class="w-64 h-64 rounded-full bg-gradient-to-br from-mauve to-blue mx-auto flex items-center justify-center shadow-lg relative z-10">
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
</script>

<style scoped>
/* Grid pattern for background */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, var(--ctp-mocha-surface0) 1px, transparent 1px),
    linear-gradient(to bottom, var(--ctp-mocha-surface0) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* Add hover effect to profile circle */
.profile-circle {
  transition: transform 0.3s ease-in-out;
}

.profile-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>