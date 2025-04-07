<template>
  <Card 
    :hover="true" 
    :glass="true"
    class="h-full flex flex-col transition-all duration-300 hover:scale-[1.02] opacity-0 translate-y-5"
    @click="navigateToProject"
  >
    <template #header>
      <!-- Make header relative for absolute positioning of category -->
      <div class="relative flex items-start justify-between mb-4">
        <h3 class="text-xl font-bold pr-16">{{ project.title }}</h3> <!-- Add padding-right to avoid overlap with tag -->
        <!-- Position category tag absolutely -->
        <span
          class="absolute -top-2 -right-2 text-xs font-semibold px-2 py-1 rounded-md shadow-sm z-10"
          :class="[categoryClass, 'bg-opacity-100']"
          style="transform: rotate(3deg);" <!-- Slight rotation for avant-garde feel -->
        >
          {{ project.category }}
        </span>
      </div>
    </template>
    
    <p class="mb-4 flex-grow pt-2">{{ project.description }}</p> <!-- Add padding-top to give space below header -->
    
    <template #footer>
      <div class="flex justify-between items-center">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="text-xs font-medium px-2 py-1 bg-surface1 hover:bg-surface2 transition-colors duration-200 rounded-md"
          > <!-- Added hover effect -->
            {{ tech }}
          </span>
        </div>
        
        <Button
          variant="ghost"
          color="mauve"
          iconRight="heroicons:arrow-right"
          size="sm"
          class="ml-2 hover:bg-mauve/10"
        >
          Détails
        </Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

// Emit
const emit = defineEmits(['navigate'])

// Computed
const categoryClass = computed(() => {
  const categories = {
    'Système Embarqué': 'bg-peach/20 text-peach',
    'Programmation Bas Niveau': 'bg-blue/20 text-blue',
    'Administration Réseau': 'bg-green/20 text-green',
    'Base de Données': 'bg-yellow/20 text-yellow',
    'Web': 'bg-mauve/20 text-mauve'
  }
  
  return categories[props.project.category as keyof typeof categories] || 'bg-overlay0 text-text'
})

// Methods
const navigateToProject = () => {
  emit('navigate', props.project.id)
}
</script>