<template>
  <section class="relative py-24 md:py-32 overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Animated gradient circles -->
      <div class="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-mauve/10 animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue/10 animate-pulse-slow" style="animation-delay: 1s;"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>

    <div class="container-custom relative z-10">
      <div class="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
        <div class="md:w-7/12 space-y-6 animate-slide-up">
          <h1 class="font-bold leading-tight">
            <span class="gradient-text opacity-100">Alexis Robin</span>
          </h1>
          <h2 class="text-xl md:text-2xl font-medium text-subtext0 mb-6">
            Développeur Système Embarqué &amp; Passionné de Programmation Bas Niveau
          </h2>
          <p class="text-lg mb-8 max-w-2xl">
            Étudiant à l'IUT informatique de Montpellier en parcours DACS, 
            je suis un passionné de programmation bas niveau, de philosophie et de photographie.
          </p>
          <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button to="/projects" variant="primary" iconRight="heroicons:arrow-right">
              Découvrir mes projets
            </Button>
            <Button to="/contact" variant="outline">
              Me contacter
            </Button>
          </div>
        </div>
        
        <!-- Avatar/Image area -->
        <div class="hidden md:block md:w-5/12 p-8 animate-fade-in">
          <div class="relative">
            <!-- Profile circle with AR initials -->
            <div class="w-64 h-64 rounded-full bg-gradient-to-br from-mauve to-blue mx-auto flex items-center justify-center shadow-lg relative z-10">
              <span class="text-base text-6xl font-bold">AR</span>
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
// No additional setup needed for this component
</script>

<style scoped>
/* Grid pattern for background */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, var(--ctp-mocha-surface0) 1px, transparent 1px),
    linear-gradient(to bottom, var(--ctp-mocha-surface0) 1px, transparent 1px);
  background-size: 30px 30px;
}
</style>