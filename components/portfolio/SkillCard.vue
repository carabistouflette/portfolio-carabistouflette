<template>
  <div 
    ref="skillCard"
    class="skill-card group relative p-8 rounded-3xl border border-overlay0 bg-mantle hover:border-overlay1 transition-all duration-500 hover:scale-105"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <!-- Skill header -->
    <div class="text-center mb-8">
      <div 
        class="skill-icon w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        :class="skill.iconBg"
      >
        <Icon :name="skill.icon" class="w-10 h-10 transition-transform duration-300 group-hover:scale-125" :class="skill.iconColor" />
      </div>
      <h3 class="text-2xl font-bold text-text mb-2">{{ skill.title }}</h3>
      <span 
        class="text-sm px-4 py-2 rounded-full font-medium transition-all duration-300 group-hover:shadow-lg"
        :class="skill.badgeClass"
      >
        {{ skill.level }}
      </span>
    </div>

    <!-- Description -->
    <p class="text-subtext1 mb-8 leading-relaxed text-center">{{ skill.description }}</p>

    <!-- Project examples -->
    <div class="space-y-4">
      <h4 class="text-sm font-semibold text-text uppercase tracking-wider text-center mb-6">
        Exemples concrets
      </h4>
      <div class="space-y-4">
        <div 
          v-for="example in skill.examples" 
          :key="example"
          class="flex items-start text-sm text-subtext1 p-4 rounded-xl bg-surface0/50"
        >
          <Icon name="heroicons:check-circle" :class="skill.checkColor" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <span>{{ example }}</span>
        </div>
      </div>
    </div>

    <!-- Animated gradient border -->
    <div 
      class="gradient-border absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      :class="skill.gradientBorder"
    ></div>

    <!-- Hover glow effect -->
    <div 
      class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
      :class="skill.glowColor"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Skill {
  id: string
  title: string
  level: string
  description: string
  icon: string
  iconBg: string
  iconColor: string
  badgeClass: string
  checkColor: string
  examples: string[]
  gradientBorder: string
  glowColor: string
}

interface SkillCardProps {
  skill: Skill
}

const props = defineProps<SkillCardProps>()

defineEmits<{
  mouseenter: []
  mouseleave: []
}>()

const skillCard = ref<HTMLElement>()

defineExpose({ skillCard })
</script>

<style scoped>
.gradient-border {
  background: linear-gradient(45deg, var(--mauve), var(--pink), var(--blue), var(--teal));
  background-size: 400% 400%;
  animation: gradient-shift 3s ease infinite;
  padding: 2px;
  z-index: -1;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 2px;
  background: var(--mantle);
  border-radius: inherit;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>