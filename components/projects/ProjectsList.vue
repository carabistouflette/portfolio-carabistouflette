<template>
  <div>
    <!-- Filters -->
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un projet..."
          class="w-full sm:w-64 px-4 py-2 pl-10 bg-surface0 border border-surface1 rounded-lg focus:border-mauve transition-colors"
        />
        <Icon
          name="heroicons:magnifying-glass"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-overlay0 w-5 h-5"
        />
      </div>
      
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="toggleCategory(category)"
          class="px-3 py-1 text-sm rounded-full transition-colors"
          :class="activeCategories.includes(category) 
            ? (categoryClasses[category] || 'bg-overlay0 text-text')
            : 'bg-surface1 text-overlay0 hover:bg-surface2'"
        >
          {{ category }}
        </button>
        <button
          v-if="activeCategories.length > 0"
          @click="clearFilters"
          class="px-3 py-1 text-sm rounded-full bg-red/20 text-red hover:bg-red/30 transition-colors"
        >
          Réinitialiser
        </button>
      </div>
    </div>
    
    <!-- Projects grid -->
    <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(project, index) in filteredProjects" 
        :key="project.id"
        class="animate-slide-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <Suspense>
          <template #default>
            <LazyProjectCard
              :project="project"
              @navigate="navigateToProject"
            />
          </template>
          <template #fallback>
            <LoadingState />
          </template>
        </Suspense>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <Icon name="heroicons:folder-open" class="w-16 h-16 mx-auto text-overlay0 mb-4" />
      <h3 class="text-xl mb-2">Aucun projet trouvé</h3>
      <p class="text-subtext0">Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.</p>
      <Button @click="clearFilters" variant="outline" class="mt-4">
        Réinitialiser les filtres
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const LoadingState = defineAsyncComponent(() => import('@/components/ui/LoadingState.vue'))

// State
const searchQuery = ref('')
const activeCategories = ref<string[]>([])

// Mock projects data
const projects = ref([
  {
    id: 1,
    title: 'Système de monitoring embarqué',
    description: 'Développement d\'un système de monitoring pour applications embarquées avec interface de visualisation en temps réel.',
    category: 'Système Embarqué',
    technologies: ['C', 'ARM', 'RTOS'],
    image: '/images/projects/embedded-monitoring.jpg'
  },
  {
    id: 2,
    title: 'Gestionnaire de base de données SQL optimisé',
    description: 'Implémentation d\'un gestionnaire de base de données SQL avec optimisation des requêtes et indexation avancée.',
    category: 'Base de Données',
    technologies: ['SQL', 'C++', 'Algorithmes'],
    image: '/images/projects/db-manager.jpg'
  },
  {
    id: 3,
    title: 'Configuration réseau automatisée',
    description: 'Outil d\'automatisation de configuration réseau pour environnements multi-serveurs avec monitoring intégré.',
    category: 'Administration Réseau',
    technologies: ['Shell', 'Python', 'Networking'],
    image: '/images/projects/network-config.jpg'
  },
  {
    id: 4,
    title: 'Compilateur minimaliste',
    description: 'Implémentation d\'un compilateur minimaliste pour un langage de programmation expérimental orienté systèmes embarqués.',
    category: 'Programmation Bas Niveau',
    technologies: ['C', 'Assembly', 'Compiler Design'],
    image: '/images/projects/compiler.jpg'
  },
  {
    id: 5,
    title: 'Interface de contrôle pour microcontrôleurs',
    description: 'Conception d\'une interface web permettant de programmer et contrôler des microcontrôleurs à distance.',
    category: 'Web',
    technologies: ['JavaScript', 'Vue', 'WebSockets', 'C'],
    image: '/images/projects/microcontroller-ui.jpg'
  },
  {
    id: 6,
    title: 'Système de fichiers personnalisé',
    description: 'Implémentation d\'un système de fichiers léger optimisé pour les systèmes embarqués avec ressources limitées.',
    category: 'Programmation Bas Niveau',
    technologies: ['C', 'Kernel', 'File Systems'],
    image: '/images/projects/filesystem.jpg'
  }
])

// Extract unique categories
const categories = computed(() => {
  return [...new Set(projects.value.map(project => project.category))]
})

// Category classes for styling
const categoryClasses: Record<string, string> = {
  'Système Embarqué': 'bg-peach/20 text-peach',
  'Programmation Bas Niveau': 'bg-blue/20 text-blue',
  'Administration Réseau': 'bg-green/20 text-green',
  'Base de Données': 'bg-yellow/20 text-yellow',
  'Web': 'bg-mauve/20 text-mauve'
}

// Filtered projects based on search and category filters
const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    // Filter by search query
    const matchesSearch = 
      searchQuery.value === '' || 
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Filter by categories
    const matchesCategory = 
      activeCategories.value.length === 0 || 
      activeCategories.value.includes(project.category)
    
    return matchesSearch && matchesCategory
  })
})

// Methods
const toggleCategory = (category: string) => {
  if (activeCategories.value.includes(category)) {
    activeCategories.value = activeCategories.value.filter(c => c !== category)
  } else {
    activeCategories.value.push(category)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  activeCategories.value = []
}

const navigateToProject = (projectId: number) => {
  // In a real app, you might want to navigate to a detailed project page
  // For this example, we'll just log the ID
  console.log(`Navigating to project ${projectId}`)
}
</script>