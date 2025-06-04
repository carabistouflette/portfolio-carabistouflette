<template>
  <div 
    ref="acSection"
    class="competence-section max-w-5xl mx-auto"
  >
    <!-- Header de la compétence -->
    <div class="flex items-center mb-8">
      <div 
        class="w-14 h-14 rounded-xl flex items-center justify-center mr-4"
        :class="competence.iconBg"
      >
        <Icon :name="competence.icon" class="w-7 h-7" :class="competence.iconColor" />
      </div>
      <h3 class="text-2xl font-bold text-text">{{ competence.title }}</h3>
    </div>

    <!-- Grille des AC -->
    <div class="grid gap-6">
      <div 
        v-for="(ac, index) in competence.acs" 
        :key="`${competence.id}-ac${index}`"
        class="ac-card group relative overflow-hidden transform transition-all duration-300 hover:-translate-y-1"
        :data-ac-index="index"
      >
        <div class="p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl cursor-pointer"
             :class="`border-${competence.color}/30 bg-${competence.color}/5 hover:bg-${competence.color}/10`"
             @click="toggleAcDetails(index)">
          <!-- AC Title -->
          <div class="flex items-start mb-4">
            <span class="ac-number inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  :class="`bg-${competence.color}/20 text-${competence.color}`">
              AC{{ index + 1 }}
            </span>
            <h4 class="font-semibold text-text flex-1 group-hover:text-text transition-colors duration-300">{{ ac.title }}</h4>
          </div>
          
          <!-- Justification -->
          <div class="pl-14">
            <Transition name="ac-content">
              <div v-if="!isCollapsed(index)">
                <p class="text-subtext1 text-sm leading-relaxed mb-4">{{ ac.justification }}</p>
                
                <!-- Exemples concrets -->
                <div class="space-y-2">
                  <div 
                    v-for="(exemple, exIndex) in ac.exemples" 
                    :key="exemple"
                    class="exemple-item flex items-start text-sm"
                    :style="{ animationDelay: `${exIndex * 100}ms` }"
                  >
                    <Icon name="heroicons:arrow-right" :class="`text-${competence.color} mr-2 mt-0.5`" class="w-4 h-4 flex-shrink-0" />
                    <span class="text-subtext1">{{ exemple }}</span>
                  </div>
                </div>
                
                <!-- Status badge -->
                <div class="mt-4 flex items-center">
                  <Icon name="heroicons:check-badge" :class="`text-${competence.color}`" class="w-5 h-5 mr-2" />
                  <span class="text-xs font-medium" :class="`text-${competence.color}`">Validé et maîtrisé</span>
                </div>
              </div>
            </Transition>
            
            <!-- Toggle indicator -->
            <div class="flex items-center justify-center mt-3">
              <Icon 
                :name="isCollapsed(index) ? 'heroicons:chevron-down' : 'heroicons:chevron-up'" 
                class="w-5 h-5 text-subtext1 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface AC {
  title: string
  justification: string
  exemples: string[]
}

interface Competence {
  id: string
  title: string
  icon: string
  iconBg: string
  iconColor: string
  color: string
  acs: AC[]
}

interface Props {
  competence: Competence
}

const props = defineProps<Props>()

const collapsedAcs = ref<Record<number, boolean>>({})

const toggleAcDetails = (index: number) => {
  collapsedAcs.value[index] = !collapsedAcs.value[index]
}

const isCollapsed = (index: number) => {
  return collapsedAcs.value[index] || false
}

const acSection = ref<HTMLElement>()

defineExpose({ acSection })
</script>

<style scoped>
/* Transitions pour les AC */
.ac-content-enter-active,
.ac-content-leave-active {
  transition: all 0.3s ease;
}

.ac-content-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.ac-content-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animation des exemples */
@keyframes slide-in-exemple {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.exemple-item {
  animation: slide-in-exemple 0.5s ease-out forwards;
}

/* Glow effect on hover */
.ac-card:hover {
  box-shadow: 0 0 30px rgba(var(--color-rgb), 0.15);
}

/* Smooth number rotation */
.ac-number {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>