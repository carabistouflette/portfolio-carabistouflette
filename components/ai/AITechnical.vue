<template>
  <section id="technical" class="py-20 px-4 bg-base relative overflow-hidden">
    <!-- Circuit Board Background -->
    <div class="absolute inset-0 opacity-5">
      <div class="circuit-pattern" />
    </div>
    
    <div class="max-w-6xl mx-auto relative z-10">
      <div class="animate-fade-in-up">
        <h2 class="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue to-green">
          Aspects techniques
        </h2>
      </div>
      
      <div class="animate-fade-in-up animation-delay-100">
        <div class="mb-12 text-center">
          <p class="text-xl text-text/80">
            Comprendre comment fonctionne l'IA pour mieux l'utiliser
          </p>
        </div>
      </div>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="(item, index) in technicalItems" :key="item.title" class="animate-fade-in-up" :class="`animation-delay-${200 + index * 100}`">
          <div class="technical-card bg-surface0 p-6 rounded-lg hover:bg-surface1 transition-all duration-500 group cursor-pointer relative overflow-hidden"
               @click="selectedItem = item">
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                 :class="`from-${item.color} to-transparent`" />
            
            <div class="relative z-10">
              <div class="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <Icon :name="item.icon" :class="`w-12 h-12 text-${item.color}`" />
              </div>
              <h3 :class="`text-xl font-semibold mb-3 text-${item.color}`">{{ item.title }}</h3>
              <p class="text-text/70 mb-4">{{ item.description }}</p>
              
              <!-- Progress bars for skills -->
              <div class="space-y-2">
                <div v-for="skill in item.skills" :key="skill.name" class="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-text/60">{{ skill.name }}</span>
                    <span :class="`text-${item.color}/70`">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-surface2 rounded-full h-1.5 overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-1000 ease-out skill-bar"
                         :class="`bg-${item.color}`"
                         :style="{ width: '0%' }"
                         :data-width="`${skill.level}%`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="animate-fade-in-up animation-delay-600">
        <div class="mt-12 bg-surface0/30 p-8 rounded-lg backdrop-blur-sm">
          <h3 class="text-2xl font-semibold mb-4 text-mauve">Ce qui me passionne</h3>
          <ul class="space-y-3">
            <li v-for="(passion, index) in passions" :key="index" 
                class="flex items-start transform hover:translate-x-2 transition-transform duration-300">
              <Icon name="heroicons:check-circle" class="w-6 h-6 text-green mr-3 mt-0.5 flex-shrink-0" />
              <span class="text-text/80">{{ passion }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal/Detail View -->
    <Transition name="modal">
      <div v-if="selectedItem" 
           class="fixed inset-0 bg-base/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
           @click="selectedItem = null">
        <div class="bg-surface0 rounded-xl p-8 max-w-2xl w-full transform transition-all duration-300"
             @click.stop>
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center">
              <Icon :name="selectedItem.icon" :class="`w-10 h-10 text-${selectedItem.color} mr-4`" />
              <h3 :class="`text-2xl font-bold text-${selectedItem.color}`">{{ selectedItem.title }}</h3>
            </div>
            <button @click="selectedItem = null" class="text-text/50 hover:text-text transition-colors">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
          <p class="text-text/80 mb-6">{{ selectedItem.detailedDescription }}</p>
          <div class="space-y-4">
            <div v-for="detail in selectedItem.details" :key="detail">
              <div class="flex items-start">
                <Icon name="heroicons:arrow-right" :class="`w-5 h-5 text-${selectedItem.color} mr-2 mt-0.5`" />
                <p class="text-text/70">{{ detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const selectedItem = ref<any>(null)

const technicalItems = [
  {
    icon: 'heroicons:cpu-chip',
    title: 'Architecture neuronale',
    color: 'blue',
    description: 'Les réseaux de neurones, transformers et mécanismes d\'attention qui permettent à l\'IA de comprendre et générer du contenu.',
    detailedDescription: 'Les architectures modernes comme GPT et Claude utilisent des transformers avec des mécanismes d\'attention sophistiqués pour traiter et générer du texte de manière contextuelle.',
    details: [
      'Transformers : Architecture révolutionnaire permettant le traitement parallèle',
      'Attention multi-têtes : Capacité à se concentrer sur différentes parties du contexte',
      'Embeddings : Représentation vectorielle riche du langage',
      'Fine-tuning : Adaptation à des domaines spécifiques'
    ],
    skills: [
      { name: 'Compréhension', level: 85 },
      { name: 'Application', level: 75 },
      { name: 'Innovation', level: 60 }
    ]
  },
  {
    icon: 'heroicons:chart-bar',
    title: 'Entraînement et données',
    color: 'green',
    description: 'Comment les modèles apprennent à partir de vastes ensembles de données et l\'importance de la qualité des données d\'entraînement.',
    detailedDescription: 'L\'entraînement des modèles d\'IA nécessite des ressources considérables et des données de haute qualité pour obtenir des résultats pertinents.',
    details: [
      'Datasets massifs : Des téraoctets de texte pour l\'entraînement',
      'Curation des données : Sélection et nettoyage rigoureux',
      'Reinforcement Learning : Apprentissage par feedback humain',
      'Évaluation continue : Métriques de performance et de sécurité'
    ],
    skills: [
      { name: 'Data Science', level: 70 },
      { name: 'Preprocessing', level: 80 },
      { name: 'Évaluation', level: 75 }
    ]
  },
  {
    icon: 'heroicons:code-bracket',
    title: 'Prompting et contexte',
    color: 'lavender',
    description: 'L\'art de communiquer efficacement avec l\'IA : techniques de prompting, gestion du contexte et optimisation des résultats.',
    detailedDescription: 'Le prompt engineering est devenu une compétence essentielle pour maximiser l\'efficacité des interactions avec l\'IA.',
    details: [
      'Few-shot prompting : Exemples pour guider les réponses',
      'Chain-of-thought : Décomposition des problèmes complexes',
      'Context window : Gestion optimale de la mémoire conversationnelle',
      'System prompts : Configuration du comportement de base'
    ],
    skills: [
      { name: 'Prompt Design', level: 90 },
      { name: 'Optimisation', level: 85 },
      { name: 'Debugging', level: 80 }
    ]
  }
]

const passions = [
  'Les mécanismes d\'attention et comment ils permettent la compréhension contextuelle',
  'L\'émergence de capacités non explicitement programmées dans les grands modèles',
  'Les techniques de fine-tuning et d\'adaptation de modèles à des tâches spécifiques',
  'L\'éthique et la sécurité dans le développement d\'IA responsable'
]

onMounted(() => {
  // Animate skill bars after mount
  setTimeout(() => {
    const skillBars = document.querySelectorAll('.skill-bar')
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width')
      if (width) {
        (bar as HTMLElement).style.width = width
      }
    })
  }, 500)
})
</script>

<style scoped>
.circuit-pattern {
  background-image: 
    linear-gradient(to right, rgba(137, 180, 250, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(137, 180, 250, 0.1) 1px, transparent 1px),
    linear-gradient(45deg, transparent 48%, rgba(137, 180, 250, 0.1) 49%, rgba(137, 180, 250, 0.1) 51%, transparent 52%);
  background-size: 50px 50px, 50px 50px, 100px 100px;
  animation: circuit-flow 20s linear infinite;
}

@keyframes circuit-flow {
  0% { background-position: 0 0, 0 0, 0 0; }
  100% { background-position: 50px 0, 0 50px, 100px 100px; }
}

.technical-card {
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.technical-card:hover {
  transform: translateY(-5px) rotateX(5deg);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>