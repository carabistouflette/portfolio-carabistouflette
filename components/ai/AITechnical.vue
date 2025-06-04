<template>
  <section id="technical" class="py-20 px-4 bg-base">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue to-green">
        Aspects techniques
      </h2>
      
      <div class="mb-12 text-center">
        <p class="text-xl text-text/80">
          Comprendre comment fonctionne l'IA pour mieux l'utiliser
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-surface0 p-6 rounded-lg hover:bg-surface1 transition-colors">
          <Icon name="heroicons:cpu-chip" class="w-12 h-12 text-blue mb-4" />
          <h3 class="text-xl font-semibold mb-3 text-blue">Architecture neuronale</h3>
          <p class="text-text/70">
            Les réseaux de neurones, transformers et mécanismes d'attention qui 
            permettent à l'IA de comprendre et générer du contenu.
          </p>
        </div>
        
        <div class="bg-surface0 p-6 rounded-lg hover:bg-surface1 transition-colors">
          <Icon name="heroicons:chart-bar" class="w-12 h-12 text-green mb-4" />
          <h3 class="text-xl font-semibold mb-3 text-green">Entraînement et données</h3>
          <p class="text-text/70">
            Comment les modèles apprennent à partir de vastes ensembles de données 
            et l'importance de la qualité des données d'entraînement.
          </p>
        </div>
        
        <div class="bg-surface0 p-6 rounded-lg hover:bg-surface1 transition-colors">
          <Icon name="heroicons:code-bracket" class="w-12 h-12 text-lavender mb-4" />
          <h3 class="text-xl font-semibold mb-3 text-lavender">Prompting et contexte</h3>
          <p class="text-text/70">
            L'art de communiquer efficacement avec l'IA : techniques de prompting, 
            gestion du contexte et optimisation des résultats.
          </p>
        </div>
      </div>
      
      <div class="mt-12 bg-surface0/30 p-8 rounded-lg">
        <h3 class="text-2xl font-semibold mb-4 text-mauve">Ce qui me passionne</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <Icon name="heroicons:check-circle" class="w-6 h-6 text-green mr-3 mt-0.5" />
            <span class="text-text/80">Les mécanismes d'attention et comment ils permettent la compréhension contextuelle</span>
          </li>
          <li class="flex items-start">
            <Icon name="heroicons:check-circle" class="w-6 h-6 text-green mr-3 mt-0.5" />
            <span class="text-text/80">L'émergence de capacités non explicitement programmées dans les grands modèles</span>
          </li>
          <li class="flex items-start">
            <Icon name="heroicons:check-circle" class="w-6 h-6 text-green mr-3 mt-0.5" />
            <span class="text-text/80">Les techniques de fine-tuning et d'adaptation de modèles à des tâches spécifiques</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>