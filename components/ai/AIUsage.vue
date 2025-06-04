<template>
  <section class="py-20 px-4 bg-base">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green to-blue">
        Usage pratique
      </h2>
      
      <div class="mb-12">
        <h3 class="text-2xl font-semibold mb-6 text-center text-green">Mon workflow avec l'IA</h3>
        <div class="grid md:grid-cols-4 gap-4">
          <div class="bg-surface0 p-6 rounded-lg text-center">
            <div class="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-green">1</span>
            </div>
            <h4 class="font-semibold mb-2">Exploration</h4>
            <p class="text-sm text-text/70">Recherche de solutions et brainstorming initial</p>
          </div>
          
          <div class="bg-surface0 p-6 rounded-lg text-center">
            <div class="w-16 h-16 bg-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-blue">2</span>
            </div>
            <h4 class="font-semibold mb-2">Prototypage</h4>
            <p class="text-sm text-text/70">Génération rapide de code de base</p>
          </div>
          
          <div class="bg-surface0 p-6 rounded-lg text-center">
            <div class="w-16 h-16 bg-mauve/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-mauve">3</span>
            </div>
            <h4 class="font-semibold mb-2">Optimisation</h4>
            <p class="text-sm text-text/70">Amélioration et refactoring du code</p>
          </div>
          
          <div class="bg-surface0 p-6 rounded-lg text-center">
            <div class="w-16 h-16 bg-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-pink">4</span>
            </div>
            <h4 class="font-semibold mb-2">Documentation</h4>
            <p class="text-sm text-text/70">Génération de docs et commentaires</p>
          </div>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-2xl font-semibold mb-4 text-blue">Cas d'usage concrets</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <Icon name="heroicons:sparkles" class="w-6 h-6 text-yellow mr-3 mt-0.5" />
              <div>
                <p class="font-semibold">Boilerplate et scaffolding</p>
                <p class="text-sm text-text/70">Création rapide de structures de projet</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="heroicons:sparkles" class="w-6 h-6 text-yellow mr-3 mt-0.5" />
              <div>
                <p class="font-semibold">Debugging assisté</p>
                <p class="text-sm text-text/70">Identification rapide des problèmes</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="heroicons:sparkles" class="w-6 h-6 text-yellow mr-3 mt-0.5" />
              <div>
                <p class="font-semibold">Tests unitaires</p>
                <p class="text-sm text-text/70">Génération de tests complets</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-2xl font-semibold mb-4 text-mauve">Principes directeurs</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <Icon name="heroicons:shield-check" class="w-6 h-6 text-green mr-3 mt-0.5" />
              <div>
                <p class="font-semibold">Toujours vérifier</p>
                <p class="text-sm text-text/70">Ne jamais faire confiance aveuglément</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="heroicons:shield-check" class="w-6 h-6 text-green mr-3 mt-0.5" />
              <div>
                <p class="font-semibold">Comprendre le code</p>
                <p class="text-sm text-text/70">Analyser et adapter selon les besoins</p>
              </div>
            </li>
            <li class="flex items-start">
              <Icon name="heroicons:shield-check" class="w-6 h-6 text-green mr-3 mt-0.5" />
              <div>
                <p class="font-semibold">Itérer et améliorer</p>
                <p class="text-sm text-text/70">L'IA est un point de départ, pas une fin</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>