<template>
  <section class="section-padding" :style="{ backgroundColor: 'rgba(var(--ctp-mantle-rgb), 0.7)' }"> <!-- Use RGBA with 70% opacity -->
    <div class="container-custom">
      <div class="mb-12 text-center">
        <h2 class="mb-4 animate-slide-up">{{ title }}</h2>
        <div class="w-24 h-1 bg-mauve mx-auto rounded-full"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- About text -->
        <div class="space-y-6 animate-slide-right">
          <p
            v-for="(paragraph, index) in aboutText"
            :key="index"
            :ref="el => { if (index === 0) firstParagraph = el as HTMLElement }"
            :class="['transition-all duration-700 ease-out', { 'text-lg': index === 0, 'reveal-mask': index === 0 }]"
          >
            <span v-html="paragraph"></span>
          </p>
          
          <div class="pt-4">
            <Button to="/contact" variant="outline" iconRight="heroicons:arrow-right">
              En savoir plus
            </Button>
          </div>
        </div>
        
        <!-- Skills cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> <!-- Removed animate-slide-left -->
          <Card
            v-for="(skill, index) in skills"
            :key="skill.title"
            :ref="el => setSkillCardRef(el, index)"
            glass
            hover
          >
            <template #header>
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center"
                  :class="skill.bgColor"
                >
                  <Icon :name="skill.icon" class="w-6 h-6 text-base" />
                </div>
                <h3 class="text-xl font-semibold">{{ skill.title }}</h3>
              </div>
            </template>
            <p>{{ skill.description }}</p>
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
const setSkillCardRef = (el: any, index: number) => {
  if (el) {
    // Ensure the array is the correct size
    if (skillCardRefs.value.length <= index) {
      skillCardRefs.value.length = index + 1;
    }
    skillCardRefs.value[index] = el.$el || el // Access underlying element if it's a component instance
  }
}

const { animateListOnScroll } = useAnimations()

onMounted(() => {
  nextTick(() => {
    // Filter out any potential null/undefined entries if refs weren't set correctly
    const validRefs = skillCardRefs.value.filter(el => el) as HTMLElement[]
    const refsWrapper = ref(validRefs) // Wrap in a ref for the composable
    animateListOnScroll(refsWrapper, 'animate-slide-up', 0.1, 150) // Apply staggered slide-up
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