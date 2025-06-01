<template>
  <Card 
    :hover="true" 
    :glass="true"
    :loading="loading"
    class="h-full flex flex-col project-card group"
    ref="cardRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <!-- Floating elements for enhanced visual effect -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <div 
        class="absolute w-3 h-3 bg-gradient-to-r from-mauve/40 to-pink/40 rounded-full blur-sm transition-all duration-500"
        :style="floatingElementStyle(0)"
      ></div>
      <div 
        class="absolute w-2 h-2 bg-gradient-to-r from-blue/40 to-teal/40 rounded-full blur-sm transition-all duration-700"
        :style="floatingElementStyle(1)"
      ></div>
      <div 
        class="absolute w-4 h-4 bg-gradient-to-r from-green/30 to-yellow/30 rounded-full blur-sm transition-all duration-600"
        :style="floatingElementStyle(2)"
      ></div>
    </div>
    <template #header>
      <!-- Make header relative for absolute positioning of category -->
      <div class="relative">
        <h3 class="text-xl font-bold pr-40">{{ project.title }}</h3> <!-- Increased padding-right to avoid overlap with tag -->
        <!-- Position category tag absolutely -->
        <span
          class="project-category-badge group-hover:animate-pulse"
          :class="categoryClass"
        >
          {{ project.category }}
        </span>
      </div>
    </template>
    
    <p class="text-subtext0 line-clamp-4">{{ project.description }}</p>
    
    <template #footer>
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(tech, index) in project.technologies" 
            :key="tech"
            class="tech-tag group-hover:animate-bounce"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            {{ tech }}
          </span>
        </div>
        
        <div v-if="project.hasDetailsPage" class="flex justify-center mt-4">
          <Button
            variant="primary"
            color="mauve"
            iconRight="heroicons:arrow-right"
            size="md"
            class="details-button w-full justify-center font-semibold shadow-lg hover:shadow-xl"
            @click="navigateToProject"
          >
            Voir les détails
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '#imports'

// Props
const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Emit
const emit = defineEmits(['navigate'])

// Card interaction state
const cardRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const mousePosition = ref({ x: 0, y: 0 })

// Floating elements positions
const floatingElements = ref([
  { x: 10, y: 15, baseX: 10, baseY: 15 },
  { x: 85, y: 25, baseX: 85, baseY: 25 },
  { x: 75, y: 80, baseX: 75, baseY: 80 }
])

// Computed
const categoryClass = computed(() => {
  const categories = {
    'Développement Web': 'category-webdev',
    'Programmation Bas Niveau': 'category-lowlevel',
    'Administration Réseau': 'category-network',
    'Base de Données': 'category-database',
    'Web': 'category-web'
  }
  
  return categories[props.project.category as keyof typeof categories] || 'category-default'
})

// Mouse interaction handlers
const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
  // Reset floating elements to base positions
  floatingElements.value.forEach((element) => {
    element.x = element.baseX
    element.y = element.baseY
  })
}

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value || !isHovered.value) return
  
  const rect = cardRef.value.getBoundingClientRect()
  mousePosition.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100
  }
  
  // Update floating elements with parallax effect
  floatingElements.value.forEach((element, index) => {
    const strength = (index + 1) * 0.5 // Different strength for each element
    const offsetX = (mousePosition.value.x - 50) * strength * 0.2
    const offsetY = (mousePosition.value.y - 50) * strength * 0.2
    
    element.x = Math.max(0, Math.min(100, element.baseX + offsetX))
    element.y = Math.max(0, Math.min(100, element.baseY + offsetY))
  })
}

// Floating element style
const floatingElementStyle = (index: number) => {
  const element = floatingElements.value[index]
  return {
    left: `${element.x}%`,
    top: `${element.y}%`,
    opacity: isHovered.value ? 0.8 : 0.4
  }
}

// Methods
const navigateToProject = () => {
  emit('navigate', props.project.id)
}

// Schema.org Project
const projectSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Project',
  name: props.project.title,
  description: props.project.description,
  // Assuming project detail pages exist at /projects/{id}
  // Adjust if the URL structure is different
  url: `https://portfolio-carabistouflette.pages.dev/projects/${props.project.id}`,
  // Potential properties to add if available in props:
  // applicationCategory: props.project.category,
  // keywords: props.project.technologies.join(', ')
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify(projectSchema.value) // Use innerHTML for script content
    }
  ]
})
</script>

<style scoped>
/* Project card enhancements */
.project-card {
  transition: var(--transition-base), transform var(--animation-base) var(--ease-spring);
}

.project-card:hover {
  transform: translateY(-4px) scale(1.01);
}

/* Category badge styling */
.project-category-badge {
  @apply absolute top-0 right-0 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md z-10;
  transform: rotate(2deg);
  transition: var(--transition-spring);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}

.project-card:hover .project-category-badge {
  transform: rotate(-2deg) scale(1.05);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.2);
}

/* Category color variants */
.category-webdev {
  background: linear-gradient(135deg, rgba(250, 179, 135, 0.2), rgba(250, 179, 135, 0.3));
  color: var(--peach);
  border-color: rgba(250, 179, 135, 0.3);
}

.category-lowlevel {
  background: linear-gradient(135deg, rgba(137, 180, 250, 0.2), rgba(137, 180, 250, 0.3));
  color: var(--blue);
  border-color: rgba(137, 180, 250, 0.3);
}

.category-network {
  background: linear-gradient(135deg, rgba(166, 227, 161, 0.2), rgba(166, 227, 161, 0.3));
  color: var(--green);
  border-color: rgba(166, 227, 161, 0.3);
}

.category-database {
  background: linear-gradient(135deg, rgba(249, 226, 175, 0.2), rgba(249, 226, 175, 0.3));
  color: var(--yellow);
  border-color: rgba(249, 226, 175, 0.3);
}

.category-web {
  background: linear-gradient(135deg, rgba(203, 166, 247, 0.2), rgba(203, 166, 247, 0.3));
  color: var(--mauve);
  border-color: rgba(203, 166, 247, 0.3);
}

.category-default {
  background: linear-gradient(135deg, rgba(108, 112, 134, 0.2), rgba(108, 112, 134, 0.3));
  color: var(--overlay0);
  border-color: rgba(108, 112, 134, 0.3);
}

/* Technology tags */
.tech-tag {
  @apply text-xs font-medium px-2.5 py-1 rounded-md;
  background: rgba(var(--surface1-rgb, 69, 71, 90), 0.6);
  border: 1px solid rgba(var(--surface2-rgb, 88, 91, 112), 0.3);
  transition: var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.tech-tag::before {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity var(--animation-fast) var(--ease-out);
}

.tech-tag:hover {
  background: rgba(var(--surface2-rgb, 88, 91, 112), 0.7);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.tech-tag:hover::before {
  opacity: 1;
}

/* Loading state skeleton */
.project-card :deep(.skeleton) {
  @apply rounded-lg;
}

.project-card :deep(.skeleton-title) {
  @apply h-7 w-3/4;
}

.project-card :deep(.skeleton-text) {
  @apply h-4;
}

.project-card :deep(.skeleton-text:nth-child(2)) {
  @apply w-full;
}

.project-card :deep(.skeleton-text:nth-child(3)) {
  @apply w-5/6;
}

/* Card footer animation */
.project-card :deep(.card-footer) {
  transition: var(--transition-base);
}

.project-card:hover :deep(.card-footer) {
  border-color: rgba(var(--surface2-rgb, 88, 91, 112), 0.5);
}

/* Button enhancement inside card */
.project-card :deep(.button-base) {
  transition: var(--transition-spring);
}

.project-card:hover :deep(.button-base) {
  transform: translateX(4px);
}

/* Details button specific styling */
.details-button {
  @apply relative overflow-hidden;
  background: linear-gradient(135deg, var(--mauve), rgba(203, 166, 247, 0.8));
  border: 1px solid rgba(203, 166, 247, 0.3);
  transition: all var(--animation-base) var(--ease-spring);
}

.details-button::before {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2));
  transform: translateX(-100%);
  transition: transform var(--animation-base) var(--ease-out);
}

.details-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px -5px rgba(203, 166, 247, 0.4);
  background: linear-gradient(135deg, rgba(203, 166, 247, 0.9), var(--mauve));
}

.details-button:hover::before {
  transform: translateX(100%);
}

.details-button:active {
  transform: translateY(0) scale(0.98);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-category-badge,
  .tech-tag {
    transition-duration: 0.01ms !important;
  }
  
  .project-card:hover {
    transform: none;
  }
  
  .project-card:hover .project-category-badge {
    transform: rotate(2deg);
  }
}
</style>