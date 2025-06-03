<template>
  <Card 
    :hover="true" 
    :glass="true"
    :loading="loading"
    class="h-full flex flex-col project-card group"
    :style="tiltStyle"
    ref="cardRef"
    data-magnetic
    data-cursor-type="pointer"
    data-cursor-text="VIEW"
    data-cursor-color="var(--mauve)"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
    role="article"
    :aria-label="`Projet: ${project.title}`"
  >
    <!-- Enhanced visual effects -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <!-- Dynamic glow effect -->
      <div 
        class="absolute w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        :style="{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, var(--mauve) 0%, transparent 50%)`
        }"
      ></div>
      
      <!-- Floating elements for enhanced visual effect -->
      <div 
        class="absolute w-3 h-3 bg-gradient-to-r from-mauve/40 to-pink/40 rounded-full transition-all duration-500"
        :style="floatingElementStyle(0)"
      ></div>
      <div 
        class="absolute w-2 h-2 bg-gradient-to-r from-blue/40 to-teal/40 rounded-full transition-all duration-700"
        :style="floatingElementStyle(1)"
      ></div>
      <div 
        class="absolute w-4 h-4 bg-gradient-to-r from-green/30 to-yellow/30 rounded-full transition-all duration-600"
        :style="floatingElementStyle(2)"
      ></div>
      
      <!-- Animated border glow -->
      <div 
        class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style="
          background: linear-gradient(45deg, transparent, var(--mauve), transparent);
          background-size: 200% 200%;
          animation: borderGlow 3s ease-in-out infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
        "
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
        <!-- GitHub badges if project has GitHub info -->
        <div v-if="project.githubRepo && githubStats" class="github-badges">
          <a 
            v-if="githubStats.stars !== undefined"
            :href="`https://github.com/${project.githubRepo}`"
            target="_blank"
            rel="noopener noreferrer"
            class="github-badge stars-badge focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            :aria-label="`${githubStats.stars} étoiles sur GitHub pour ${project.title}`"
            @click.stop
          >
            <Icon name="mdi:star" class="badge-icon" />
            <span>{{ formatNumber(githubStats.stars) }}</span>
          </a>
          <a 
            v-if="githubStats.forks !== undefined"
            :href="`https://github.com/${project.githubRepo}/fork`"
            target="_blank"
            rel="noopener noreferrer"
            class="github-badge forks-badge focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            :aria-label="`${githubStats.forks} forks sur GitHub pour ${project.title}`"
            @click.stop
          >
            <Icon name="mdi:source-fork" class="badge-icon" />
            <span>{{ formatNumber(githubStats.forks) }}</span>
          </a>
          <div 
            v-if="githubStats.language"
            class="github-badge language-badge"
          >
            <Icon name="mdi:language" class="badge-icon" />
            <span>{{ githubStats.language }}</span>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(tech, index) in project.technologies" 
            :key="tech"
            class="tech-tag"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            {{ tech }}
          </span>
        </div>
        
        <div v-if="project.hasDetailsPage" class="flex justify-center mt-4">
          <Button
            variant="solid"
            color="mauve"
            iconRight="heroicons:arrow-right"
            size="md"
            class="details-button w-full justify-center font-semibold shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-mauve focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            @click="navigateToProject($event)"
            :aria-label="`Voir les détails du projet ${project.title}`"
          >
            Voir les détails
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, watchEffect } from 'vue'
import { useHead } from '#imports'
import { useGitHubRepo, formatNumber } from '~/composables/useGitHub'
import { useCardInteractions } from '~/composables/useMicroInteractions'

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
const tiltStyle = ref<Record<string, string>>({})  // Style 3D pour tilt effect
const glowPosition = ref({ x: 50, y: 50 })  // Position pour effet de lueur

// GitHub stats
const githubStats = ref<{ stars?: number; forks?: number; language?: string } | null>(null)

// Enhanced interactions
const { handleCardClick, handleCardHover } = useCardInteractions()

// Fetch GitHub stats if project has a repo
onMounted(async () => {
  if (props.project.githubRepo) {
    try {
      const [owner, repoName] = props.project.githubRepo.split('/')
      const { repo } = useGitHubRepo(owner, repoName)
      
      // Watch for repo data
      watchEffect(() => {
        if (repo.value) {
          githubStats.value = {
            stars: repo.value.stargazers_count,
            forks: repo.value.forks_count,
            language: repo.value.language
          }
        }
      })
    } catch (error) {
    }
  }
})

// Floating elements positions with scale
const floatingElements = ref([
  { x: 10, y: 15, baseX: 10, baseY: 15, scale: 1 },
  { x: 85, y: 25, baseX: 85, baseY: 25, scale: 1 },
  { x: 75, y: 80, baseX: 75, baseY: 80, scale: 1 }
])

// Computed
const categoryClass = computed(() => {
  const categories = {
    'Développement Web': 'category-webdev',
    'Programmation Bas Niveau': 'category-lowlevel',
    'Administration Réseau': 'category-network',
    'Base de Données': 'category-database',
    'Web': 'category-web',
    'Sécurité & Cryptographie': 'category-security',
    'Développement Logiciel': 'category-software'
  }
  
  return categories[props.project.category as keyof typeof categories] || 'category-default'
})

// Enhanced mouse interaction handlers
const handleMouseEnter = () => {
  isHovered.value = true
  handleCardHover(true)
}

const handleMouseLeave = () => {
  isHovered.value = false
  handleCardHover(false)
  
  // Reset tilt
  tiltStyle.value = {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
  
  // Reset floating elements with spring animation
  floatingElements.value.forEach((element) => {
    element.x = element.baseX
    element.y = element.baseY
    element.scale = 1
  })
  
  // Reset glow position
  glowPosition.value = { x: 50, y: 50 }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value || !isHovered.value) return
  
  // Access the root element of the Card component
  const cardElement = cardRef.value.$el as HTMLElement
  if (!cardElement) return
  
  const rect = cardElement.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  
  mousePosition.value = { x, y }
  glowPosition.value = { x, y }
  
  // Calculate 3D tilt
  const tiltX = (y - 50) / 4  // Reduced tilt for subtlety
  const tiltY = (x - 50) / -4
  
  tiltStyle.value = {
    transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`,
    transition: 'none'  // Disable transition during mouse move for responsiveness
  }
  
  // Update floating elements with enhanced parallax effect
  floatingElements.value.forEach((element, index) => {
    const strength = (index + 1) * 0.5
    const offsetX = (x - 50) * strength * 0.3
    const offsetY = (y - 50) * strength * 0.3
    const scale = 1 + (strength * 0.1)  // Add scale variation
    
    element.x = Math.max(-10, Math.min(110, element.baseX + offsetX))
    element.y = Math.max(-10, Math.min(110, element.baseY + offsetY))
    element.scale = scale
  })
}

// Floating element style with scale
const floatingElementStyle = (index: number) => {
  const element = floatingElements.value[index]
  return {
    left: `${element.x}%`,
    top: `${element.y}%`,
    opacity: isHovered.value ? 0.8 : 0.4,
    transform: `translate(-50%, -50%) scale(${element.scale || 1})`,
    filter: isHovered.value ? 'blur(0.5px)' : 'blur(1px)'
  }
}

// Enhanced methods with micro-interactions
const navigateToProject = (event?: MouseEvent) => {
  if (event) {
    handleCardClick(event)
  }
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
      children: JSON.stringify(projectSchema.value) // Use children instead of innerHTML for security
    }
  ]
})
</script>

<style scoped>
/* Project card enhancements */
.project-card {
  transition: var(--transition-base);
  transform-style: preserve-3d;
  will-change: transform;
}

/* Remove default hover transform since we handle it with tilt */
.project-card:hover {
  /* Transform handled by tiltStyle */
}

/* Border glow animation */
@keyframes borderGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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

.category-security {
  background: linear-gradient(135deg, rgba(243, 139, 168, 0.2), rgba(243, 139, 168, 0.3));
  color: var(--red);
  border-color: rgba(243, 139, 168, 0.3);
}

.category-software {
  background: linear-gradient(135deg, rgba(180, 190, 254, 0.2), rgba(180, 190, 254, 0.3));
  color: var(--lavender);
  border-color: rgba(180, 190, 254, 0.3);
}

.category-default {
  background: linear-gradient(135deg, rgba(108, 112, 134, 0.2), rgba(108, 112, 134, 0.3));
  color: var(--overlay0);
  border-color: rgba(108, 112, 134, 0.3);
}

/* Enhanced technology tags with glowing effects */
.tech-tag {
  @apply text-xs font-medium px-2.5 py-1 rounded-md;
  background: rgba(var(--surface1-rgb, 69, 71, 90), 0.6);
  border: 1px solid rgba(var(--surface2-rgb, 88, 91, 112), 0.3);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  animation: none;
  cursor: pointer;
}

/* Hover state animations for tech tags */
.group:hover .tech-tag {
  animation: techTagBounce 0.6s ease-out;
  animation-fill-mode: both;
}

@keyframes techTagBounce {
  0% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-4px) scale(1.05); }
  60% { transform: translateY(2px) scale(0.95); }
  100% { transform: translateY(0) scale(1); }
}

.tech-tag::before {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity var(--animation-fast) var(--ease-out);
}

.tech-tag:hover {
  background: rgba(var(--surface2-rgb, 88, 91, 112), 0.8);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 8px 15px -3px rgba(0, 0, 0, 0.2),
    0 0 15px rgba(var(--mauve-rgb, 203, 166, 247), 0.3);
  border-color: rgba(203, 166, 247, 0.5);
  animation: techTagGlow 0.8s ease-in-out;
}

.tech-tag:hover::before {
  opacity: 1;
}

@keyframes techTagGlow {
  0% {
    box-shadow: 
      0 8px 15px -3px rgba(0, 0, 0, 0.2),
      0 0 15px rgba(var(--mauve-rgb, 203, 166, 247), 0.3);
  }
  50% {
    box-shadow: 
      0 12px 20px -3px rgba(0, 0, 0, 0.3),
      0 0 25px rgba(var(--mauve-rgb, 203, 166, 247), 0.6);
  }
  100% {
    box-shadow: 
      0 8px 15px -3px rgba(0, 0, 0, 0.2),
      0 0 15px rgba(var(--mauve-rgb, 203, 166, 247), 0.3);
  }
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

/* GitHub badges */
.github-badges {
  @apply flex flex-wrap gap-2 mb-2;
}

.github-badge {
  @apply inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium;
  @apply transition-all duration-200 cursor-pointer;
  backdrop-filter: blur(8px);
  border: 1px solid transparent;
}

.badge-icon {
  @apply text-sm;
}

.stars-badge {
  @apply text-yellow;
  background-color: rgba(249, 226, 175, 0.1);
  border-color: rgba(249, 226, 175, 0.2);
}

.stars-badge:hover {
  background-color: rgba(249, 226, 175, 0.25);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 6px 12px -2px rgba(249, 226, 175, 0.4),
    0 0 20px rgba(249, 226, 175, 0.3);
  animation: starPulse 0.6s ease-in-out;
}

@keyframes starPulse {
  0% { transform: translateY(-2px) scale(1.05); }
  50% { transform: translateY(-3px) scale(1.1) rotate(5deg); }
  100% { transform: translateY(-2px) scale(1.05); }
}

.forks-badge {
  @apply text-blue;
  background-color: rgba(137, 180, 250, 0.1);
  border-color: rgba(137, 180, 250, 0.2);
}

.forks-badge:hover {
  background-color: rgba(137, 180, 250, 0.25);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 6px 12px -2px rgba(137, 180, 250, 0.4),
    0 0 20px rgba(137, 180, 250, 0.3);
  animation: forkSpin 0.8s ease-in-out;
}

@keyframes forkSpin {
  0% { transform: translateY(-2px) scale(1.05) rotate(0deg); }
  25% { transform: translateY(-3px) scale(1.1) rotate(-10deg); }
  75% { transform: translateY(-3px) scale(1.1) rotate(10deg); }
  100% { transform: translateY(-2px) scale(1.05) rotate(0deg); }
}

.language-badge {
  @apply text-mauve;
  background-color: rgba(203, 166, 247, 0.1);
  border-color: rgba(203, 166, 247, 0.2);
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
  .tech-tag,
  .github-badge,
  .details-button {
    transition: none !important;
    animation: none !important;
  }
  
  .project-card:hover {
    transform: none !important;
  }
  
  .project-card:hover .project-category-badge {
    transform: rotate(2deg) !important;
  }
  
  .tech-tag:hover,
  .github-badge:hover,
  .details-button:hover {
    transform: none !important;
    animation: none !important;
  }
  
  @keyframes borderGlow,
  @keyframes techTagBounce,
  @keyframes techTagGlow,
  @keyframes starPulse,
  @keyframes forkSpin {
    to {
      transform: none;
    }
  }
}
</style>