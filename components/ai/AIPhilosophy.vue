<template>
  <section id="philosophy" class="py-20 px-4 bg-mantle relative overflow-hidden">
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full">
        <svg class="w-full h-full">
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" class="text-mauve animate-pulse" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <div class="animate-fade-in-up">
        <h2 class="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-mauve to-pink">
          Ma philosophie de l'IA
        </h2>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="animate-fade-in-up animation-delay-100">
          <div class="bg-surface0/80 backdrop-blur-sm p-8 rounded-lg hover:bg-surface0/90 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-lavender/20">
            <div class="flex items-start mb-4">
              <div class="p-3 bg-lavender/20 rounded-lg mr-4 group-hover:bg-lavender/30 transition-colors">
                <Icon name="heroicons:light-bulb" class="w-6 h-6 text-lavender" />
              </div>
              <h3 class="text-2xl font-semibold text-lavender">Une nécessité incontournable</h3>
            </div>
            <p class="text-text/80 mb-4 leading-relaxed">
              L'Intelligence Artificielle est devenue un outil indispensable dans le développement moderne. 
              Elle nous permet d'automatiser des tâches répétitives, d'accélérer notre productivité et 
              d'explorer de nouvelles solutions créatives.
            </p>
            <p class="text-text/80 leading-relaxed">
              Refuser l'IA aujourd'hui, c'est comme refuser l'IDE hier. C'est se priver d'un levier 
              de performance qui redéfinit notre façon de travailler.
            </p>
            <div class="mt-6 flex items-center text-lavender/70 text-sm">
              <Icon name="heroicons:arrow-trending-up" class="w-4 h-4 mr-2" />
              <span>Évolution constante du métier</span>
            </div>
          </div>
        </div>
        
        <div class="animate-fade-in-up animation-delay-200">
          <div class="bg-surface0/80 backdrop-blur-sm p-8 rounded-lg hover:bg-surface0/90 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-peach/20">
            <div class="flex items-start mb-4">
              <div class="p-3 bg-peach/20 rounded-lg mr-4 group-hover:bg-peach/30 transition-colors">
                <Icon name="heroicons:shield-check" class="w-6 h-6 text-peach" />
              </div>
              <h3 class="text-2xl font-semibold text-peach">Vigilance intellectuelle</h3>
            </div>
            <p class="text-text/80 mb-4 leading-relaxed">
              Mais attention : l'IA n'est qu'un outil. Il est crucial de ne pas tomber dans la 
              paresse intellectuelle. Comprendre ce que l'on fait, pourquoi on le fait, et comment 
              cela fonctionne reste fondamental.
            </p>
            <p class="text-text/80 leading-relaxed">
              L'IA augmente nos capacités, elle ne les remplace pas. Rester maître de l'outil, 
              c'est continuer à apprendre, questionner et comprendre.
            </p>
            <div class="mt-6 flex items-center text-peach/70 text-sm">
              <Icon name="heroicons:academic-cap" class="w-4 h-4 mr-2" />
              <span>Apprentissage perpétuel</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="animate-fade-in-up animation-delay-300">
        <div class="mt-12 bg-surface0/50 p-8 rounded-lg text-center relative overflow-hidden group hover:bg-surface0/60 transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-r from-mauve/5 via-transparent to-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <p class="text-xl italic text-text/70 relative z-10">
            "L'IA est un amplificateur de compétences, pas un substitut à la réflexion."
          </p>
          <div class="mt-4 flex justify-center space-x-2">
            <span class="w-2 h-2 bg-mauve rounded-full animate-pulse" />
            <span class="w-2 h-2 bg-pink rounded-full animate-pulse animation-delay-2000" />
            <span class="w-2 h-2 bg-lavender rounded-full animate-pulse animation-delay-4000" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>