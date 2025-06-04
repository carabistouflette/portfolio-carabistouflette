<template>
  <Card 
    ref="competenceCard"
    class="group h-full hover:border-overlay1 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
    :class="[comp.colorClasses?.card || 'bg-mantle']"
  >
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-6">
        <div 
          class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          :class="comp.colorClasses?.iconBg || 'bg-mauve/10'"
        >
          <Icon :name="comp.icon" class="w-7 h-7" :class="comp.colorClasses?.icon || 'text-mauve'" />
        </div>
        <span 
          class="text-sm px-4 py-2 rounded-full font-medium transition-all duration-300 group-hover:shadow-lg"
          :class="comp.colorClasses?.badge || 'bg-mauve/10 text-mauve'"
        >
          {{ comp.code }}
        </span>
      </div>
      <h3 class="text-xl font-bold text-text leading-tight">{{ comp.title }}</h3>
    </div>
    
    <!-- Description -->
    <p class="text-subtext1 mb-6 leading-relaxed">{{ comp.description }}</p>
    
    <!-- Critères de performance -->
    <div class="space-y-3 mb-6">
      <h4 class="text-sm font-semibold text-text/70 uppercase tracking-wider mb-4">
        Critères de performance
      </h4>
      <div 
        v-for="critere in comp.criteres" 
        :key="critere"
        class="flex items-start text-sm p-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
        :class="comp.colorClasses?.critereBg || 'bg-mauve/5 hover:bg-mauve/10'"
      >
        <Icon 
          name="heroicons:check-badge" 
          class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
          :class="comp.colorClasses?.checkIcon || 'text-mauve'"
        />
        <span class="text-subtext1">{{ critere }}</span>
      </div>
    </div>
    
    <!-- Apprentissages critiques -->
    <div class="space-y-3">
      <h4 class="text-sm font-semibold text-text/70 uppercase tracking-wider mb-4">
        Apprentissages critiques
      </h4>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="ac in comp.apprentissagesCritiques" 
          :key="ac"
          class="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 hover:scale-105"
          :class="comp.colorClasses?.acBadge || 'bg-mauve/10 text-mauve hover:bg-mauve/20'"
        >
          {{ ac }}
        </span>
      </div>
    </div>
    
    <!-- Hover gradient effect -->
    <div 
      class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
      :class="comp.colorClasses?.gradient || 'bg-gradient-to-br from-mauve to-pink'"
    ></div>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Competence {
  id: string
  code: string
  title: string
  description: string
  icon: string
  criteres: string[]
  apprentissagesCritiques: string[]
  colorClasses?: {
    card?: string
    iconBg?: string
    icon?: string
    badge?: string
    critereBg?: string
    checkIcon?: string
    acBadge?: string
    gradient?: string
  }
}

interface CompetenceCardProps {
  comp: Competence
}

const props = defineProps<CompetenceCardProps>()

const competenceCard = ref<HTMLElement>()

defineExpose({ competenceCard })
</script>