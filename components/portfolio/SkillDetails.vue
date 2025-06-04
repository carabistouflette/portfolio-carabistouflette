<template>
  <div 
    ref="detailCard"
    class="detail-card p-8 rounded-2xl border border-overlay0 bg-surface0/30 hover:bg-surface0/50 transition-all duration-300"
  >
    <div class="flex items-start mb-6">
      <div 
        class="w-16 h-16 rounded-xl flex items-center justify-center mr-6"
        :class="detail.iconBg"
      >
        <Icon :name="detail.icon" class="w-8 h-8" :class="detail.iconColor" />
      </div>
      <div>
        <h3 class="text-xl font-bold text-text mb-2">{{ detail.title }}</h3>
        <p class="text-subtext1">{{ detail.subtitle }}</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 class="font-semibold text-text mb-3">Contexte d'apprentissage</h4>
        <p class="text-subtext1 text-sm leading-relaxed">{{ detail.context }}</p>
      </div>
      <div>
        <h4 class="font-semibold text-text mb-3">Compétences développées</h4>
        <ul class="space-y-2">
          <li 
            v-for="competence in detail.competences" 
            :key="competence"
            class="flex items-center text-sm text-subtext1"
          >
            <Icon name="heroicons:star" :class="detail.starColor" class="w-4 h-4 mr-2" />
            {{ competence }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface SkillDetail {
  id: string
  title: string
  subtitle: string
  icon: string
  iconBg: string
  iconColor: string
  starColor: string
  context: string
  competences: string[]
}

interface Props {
  detail: SkillDetail
}

const props = defineProps<Props>()

const detailCard = ref<HTMLElement>()

defineExpose({ detailCard })
</script>