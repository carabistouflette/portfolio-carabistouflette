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
    <ScrollRevealList
      v-if="filteredProjects.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
      direction="scale"
      :stagger="120"
      :delay="200"
      :duration="800"
      :threshold="0.1"
    >
      <div 
        v-for="project in filteredProjects" 
        :key="project.id"
        class="h-full"
      >
        <ProjectCard
          :project="project"
          @navigate="navigateToProject"
          class="h-full"
        />
      </div>
    </ScrollRevealList>
    
    <!-- Empty state -->
    <ScrollReveal v-else direction="fade" :delay="300" class="text-center py-12">
      <Icon name="heroicons:folder-open" class="w-16 h-16 mx-auto text-overlay0 mb-4" />
      <h3 class="text-xl mb-2">Aucun projet trouvé</h3>
      <p class="text-subtext0">Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.</p>
      <Button @click="clearFilters" variant="outline" class="mt-4">
        Réinitialiser les filtres
      </Button>
    </ScrollReveal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { navigateTo } from '#app'
import ProjectCard from '@/components/projects/ProjectCard.vue'

// State
const searchQuery = ref('')
const activeCategories = ref<string[]>([])

// Mock projects data
const projects = ref([
  {
    id: 1,
    title: 'Application de gestion de tâches',
    description: 'Développement d\'une application web moderne pour la gestion de tâches et projets. Interface intuitive et responsive.',
    category: 'Développement Web',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    hasDetailsPage: false
  },
  {
    id: 2,
    title: 'Gestionnaire de Bulk CSV SMAG',
    description: 'Application full-stack innovante pour simplifier la gestion des fichiers CSV chez SMAG. Automatisation des jointures et interface intuitive.',
    category: 'Développement Web',
    technologies: ['Vue.js', 'FastAPI', 'Python', 'Pandas'],
    hasDetailsPage: true
  },
  {
    id: 3,
    title: 'Configuration réseau automatisée',
    description: 'Outil d\'automatisation pour la configuration réseau. Gestion multi-serveurs avec monitoring intégré.',
    category: 'Administration Réseau',
    technologies: ['Shell', 'Python', 'Networking'],
    hasDetailsPage: false
  },
  {
    id: 4,
    title: 'API REST pour e-commerce',
    description: 'Conception et implémentation d\'une API REST complète pour une plateforme e-commerce. Documentation avec Swagger.',
    category: 'Développement Web',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    hasDetailsPage: false
  },
  {
    id: 5,
    title: 'Interface de contrôle pour microcontrôleurs',
    description: 'Interface web pour programmer et contrôler des microcontrôleurs. Communication à distance en temps réel.',
    category: 'Web',
    technologies: ['JavaScript', 'Vue', 'WebSockets', 'C'],
    hasDetailsPage: false
  },
  {
    id: 6,
    title: 'Dashboard analytique',
    description: 'Tableau de bord interactif pour la visualisation de données. Graphiques temps réel et export de rapports.',
    category: 'Développement Web',
    technologies: ['React', 'D3.js', 'Node.js'],
    hasDetailsPage: false
  }
])

// Extract unique categories
const categories = computed(() => {
  return [...new Set(projects.value.map(project => project.category))]
})

// Category classes for styling
const categoryClasses: Record<string, string> = {
  'Full Stack': 'bg-peach/20 text-peach',
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

const navigateToProject = async (projectId: number) => {
  const project = projects.value.find(p => p.id === projectId)
  if (!project || !project.hasDetailsPage) {
    return
  }
  
  // Navigate to project detail page
  if (projectId === 2) {
    await navigateTo('/projects/bulk-csv-smag')
  } else {
    console.log(`Navigating to project ${projectId}`)
  }
}

// No additional animations needed - handled by ScrollReveal components
</script>