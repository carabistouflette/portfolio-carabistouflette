<template>
  <section class="py-20 px-4 bg-mantle">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-peach to-pink">
        Impact mesurable
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="bg-surface0 p-6 rounded-lg text-center">
          <div class="text-4xl font-bold text-peach mb-2">50%</div>
          <p class="text-text/80">Réduction du temps de développement</p>
        </div>
        
        <div class="bg-surface0 p-6 rounded-lg text-center">
          <div class="text-4xl font-bold text-pink mb-2">3x</div>
          <p class="text-text/80">Plus de tests écrits</p>
        </div>
        
        <div class="bg-surface0 p-6 rounded-lg text-center">
          <div class="text-4xl font-bold text-mauve mb-2">80%</div>
          <p class="text-text/80">Moins de bugs en production</p>
        </div>
      </div>
      
      <div class="bg-surface0/30 p-8 rounded-lg">
        <h3 class="text-2xl font-semibold mb-6 text-center">Avant vs Après l'IA</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between mb-2">
              <span>Temps de setup projet</span>
              <span class="text-text/60">2h → 30min</span>
            </div>
            <div class="w-full bg-surface1 rounded-full h-2">
              <div class="bg-gradient-to-r from-red to-green h-2 rounded-full" style="width: 75%"></div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between mb-2">
              <span>Documentation complète</span>
              <span class="text-text/60">40% → 95%</span>
            </div>
            <div class="w-full bg-surface1 rounded-full h-2">
              <div class="bg-gradient-to-r from-yellow to-green h-2 rounded-full" style="width: 95%"></div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between mb-2">
              <span>Couverture de tests</span>
              <span class="text-text/60">60% → 90%</span>
            </div>
            <div class="w-full bg-surface1 rounded-full h-2">
              <div class="bg-gradient-to-r from-peach to-green h-2 rounded-full" style="width: 90%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <p class="text-xl text-text/70 mb-6">
          L'IA n'est pas juste un gadget, c'est un véritable accélérateur de productivité 
          quand elle est utilisée intelligemment.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-block px-8 py-4 bg-gradient-to-r from-peach to-pink text-base font-semibold rounded-lg hover:shadow-lg hover:shadow-peach/25 transform hover:scale-105 transition-all duration-300"
        >
          Discutons de l'IA ensemble
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>