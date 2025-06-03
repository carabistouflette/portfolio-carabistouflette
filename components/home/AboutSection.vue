<template>
  <section class="section-padding relative overflow-hidden" :style="{ backgroundColor: 'rgba(var(--ctp-mantle-rgb), 0.7)' }">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-20 left-20 w-96 h-96 bg-mauve rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-pink rounded-full blur-3xl"></div>
    </div>
    
    <div class="container-custom relative z-10">
      <div class="mb-12 text-center about-header">
        <h2 class="mb-6 gradient-text !text-3xl md:!text-5xl font-bold">{{ title }}</h2>
        <p class="text-lg text-subtext0 max-w-2xl mx-auto mb-8">
          Passionné par la technologie et toujours en quête de nouveaux défis
        </p>
        <div class="about-divider"></div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- About text -->
        <div class="space-y-6 about-content">
          <div class="prose prose-lg max-w-none">
            <p
              v-for="(paragraph, index) in aboutText"
              :key="index"
              :ref="el => { if (index === 0) firstParagraph = el as HTMLElement }"
              :class="[
                'transition-all duration-700 ease-out text-subtext0',
                { 
                  'text-xl leading-relaxed font-medium text-text': index === 0,
                  'reveal-mask': index === 0 
                }
              ]"
            >
              {{ paragraph }}
            </p>
          </div>
          
          <div class="flex flex-wrap gap-4 pt-4">
            <Button to="/contact" variant="outline" iconRight="heroicons:arrow-right" size="lg">
              Me contacter
            </Button>
            <Button to="/projects" variant="ghost" iconRight="heroicons:sparkles" size="lg">
              Voir mes projets
            </Button>
          </div>
          
          <!-- Quick stats -->
          <div class="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-overlay0/20">
            <div class="text-center">
              <div class="text-2xl font-bold text-mauve">{{ new Date().getFullYear() - 2020 }}+</div>
              <div class="text-sm text-subtext0">Années d'expérience</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-pink">10+</div>
              <div class="text-sm text-subtext0">Technologies maîtrisées</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green">∞</div>
              <div class="text-sm text-subtext0">Passion pour apprendre</div>
            </div>
          </div>
        </div>
        
        <!-- Skills cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          <Card
            v-for="(skill, index) in skills"
            :key="skill.title"
            :ref="el => setSkillCardRef(el, index)"
            glass
            hover
            class="group skill-card"
          >
            <template #header>
              <div class="flex items-center space-x-4">
                <div
                  class="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  :class="skill.bgColor"
                >
                  <Icon :name="skill.icon" class="w-7 h-7 text-base" />
                </div>
                <h3 class="text-xl font-bold group-hover:text-mauve transition-colors">{{ skill.title }}</h3>
              </div>
            </template>
            <p class="text-subtext0 leading-relaxed">{{ skill.description }}</p>
            <div v-if="skill.level" class="mt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs text-subtext1">Niveau de maîtrise</span>
                <span class="text-xs font-medium text-mauve">{{ skill.level }}%</span>
              </div>
              <div class="w-full h-2 bg-surface1 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-mauve to-pink rounded-full transition-all duration-1000 skill-progress"
                  :style="{ width: '0%' }"
                  :data-level="skill.level"
                ></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useAnimations } from '@/composables/useAnimations'
interface Skill {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  level?: number;
}

interface AboutSectionProps {
  title: string;
  aboutText: string[];
  skills: Skill[];
}

const props = defineProps<AboutSectionProps>();

const firstParagraph = ref<HTMLElement | null>(null)
const skillCardRefs = ref<HTMLElement[]>([])

// Function ref to collect skill card elements
const setSkillCardRef = (el: HTMLElement | { $el: HTMLElement } | null, index: number) => {
  if (el) {
    // Ensure the array is the correct size
    if (skillCardRefs.value.length <= index) {
      skillCardRefs.value.length = index + 1;
    }
    skillCardRefs.value[index] = '$el' in el ? el.$el : el // Access underlying element if it's a component instance
  }
}

const { animateListOnScroll } = useAnimations()

onMounted(() => {
  nextTick(() => {
    // Filter out any potential null/undefined entries if refs weren't set correctly
    const validRefs = skillCardRefs.value.filter(el => el) as HTMLElement[]
    const refsWrapper = ref(validRefs) // Wrap in a ref for the composable
    animateListOnScroll(refsWrapper, 'animate-slide-up', 0.1, 150) // Apply staggered slide-up
    
    // Animate skill progress bars on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress')
          progressBars.forEach((bar: Element) => {
            const level = (bar as HTMLElement).dataset.level
            if (level) {
              setTimeout(() => {
                (bar as HTMLElement).style.width = `${level}%`
              }, 300)
            }
          })
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })
    
    // Observe skill cards for progress animation
    validRefs.forEach(card => {
      if (card) observer.observe(card)
    })
  })
})

useIntersectionObserver(
  firstParagraph,
  ([{ isIntersecting }]) => {
    if (isIntersecting && firstParagraph.value) {
      firstParagraph.value.classList.add('reveal-visible')
      // Optional: Stop observing after first reveal
      // stop()
    }
  },
  { threshold: 0.3 } // Trigger when 30% is visible
)
</script>

<style scoped>
/* About header animation */
.about-header {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* About divider */
.about-divider {
  width: 8rem;
  height: 4px;
  margin: 0 auto;
  background: linear-gradient(90deg, 
    transparent, 
    var(--mauve) 20%, 
    var(--pink) 50%,
    var(--mauve) 80%,
    transparent
  );
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
}

.about-divider::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.6), 
    transparent
  );
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-200%); }
  100% { transform: translateX(200%); }
}

/* About content animation */
.about-content {
  opacity: 0;
  transform: translateX(-30px);
  animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Skill cards animation */
.skill-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.skill-card.animate-slide-up {
  opacity: 1;
  transform: translateY(0);
}

/* Reveal mask effect */
.reveal-mask {
  position: relative;
  overflow: hidden;
}

.reveal-mask::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--base);
  transform: translateX(0);
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal-mask.reveal-visible::after {
  transform: translateX(101%);
}

/* Enhanced hover states */
@media (hover: hover) {
  .skill-card:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(var(--mauve-rgb), 0.1);
  }
}

/* Stats animation */
.about-content > div:last-child > div {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.about-content > div:last-child > div:nth-child(1) { animation-delay: 0.6s; }
.about-content > div:last-child > div:nth-child(2) { animation-delay: 0.7s; }
.about-content > div:last-child > div:nth-child(3) { animation-delay: 0.8s; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .about-header,
  .about-content,
  .skill-card,
  .skill-progress {
    animation: none !important;
    transition: none !important;
  }
  
  .about-header,
  .about-content,
  .skill-card.animate-slide-up {
    opacity: 1;
    transform: none;
  }
  
  .skill-progress {
    transition: none !important;
  }
}
</style>