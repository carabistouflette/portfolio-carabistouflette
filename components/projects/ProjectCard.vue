<template>
  <Card 
    :hover="true" 
    :glass="true"
    class="h-full flex flex-col transition-all duration-300"
    @click="navigateToProject"
  >
    <template #header>
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xl font-bold">{{ project.title }}</h3>
        <span class="text-sm font-medium px-3 py-1 rounded-full" :class="categoryClass">
          {{ project.category }}
        </span>
      </div>
    </template>
    
    <p class="mb-4 flex-grow">{{ project.description }}</p>
    
    <template #footer>
      <div class="flex justify-between items-center">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="text-xs font-medium px-2 py-1 bg-surface1 rounded-md"
          >
            {{ tech }}
          </span>
        </div>
        
        <Button 
          variant="ghost" 
          iconRight="heroicons:arrow-right" 
          size="sm"
          class="ml-2"
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