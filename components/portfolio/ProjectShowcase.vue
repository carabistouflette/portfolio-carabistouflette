<template>
  <div 
    ref="projectCard"
    class="group relative overflow-hidden rounded-2xl border border-overlay0 hover:border-overlay1 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
    :class="project.bgClass || 'bg-surface0'"
  >
    <!-- Project image/preview -->
    <div class="aspect-video overflow-hidden relative">
      <div 
        class="absolute inset-0 flex items-center justify-center p-8"
        :class="project.bgClass || 'bg-surface0'"
      >
        <div class="text-center">
          <Icon 
            :name="project.icon" 
            class="w-24 h-24 mb-4 mx-auto transition-transform duration-500 group-hover:scale-110"
            :class="project.iconColor || 'text-mauve'"
          />
          <h4 class="text-xl font-bold text-text">{{ project.title }}</h4>
          <p class="text-sm text-subtext1 mt-2">{{ project.subtitle }}</p>
        </div>
      </div>
      
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-base/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <div class="w-full">
          <p class="text-sm text-text mb-3">{{ project.description }}</p>
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="text-xs px-2.5 py-1 rounded-full font-medium"
                :class="project.techBadgeClass || 'bg-mauve/20 text-mauve'"
              >
                {{ tech }}
              </span>
            </div>
            <Icon 
              name="heroicons:arrow-top-right-on-square" 
              class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              :class="project.iconColor || 'text-mauve'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  technologies: string[]
  icon: string
  bgClass?: string
  iconColor?: string
  techBadgeClass?: string
}

interface ProjectShowcaseProps {
  project: Project
}

const props = defineProps<ProjectShowcaseProps>()

const projectCard = ref<HTMLElement>()

defineExpose({ projectCard })
</script>