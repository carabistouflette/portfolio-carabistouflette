<template>
  <section class="section-padding bg-mantle">
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
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-left">
          <Card v-for="skill in skills" :key="skill.title" glass hover>
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
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
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