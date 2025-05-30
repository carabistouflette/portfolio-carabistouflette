<template>
  <section class="section-padding">
    <div class="container-custom">
      <div ref="headerRef" class="mb-12 text-center opacity-0 transition-all duration-700">
        <h2 class="mb-4">{{ title }}</h2>
        <div class="w-24 h-1 bg-mauve mx-auto rounded-full"></div>
      </div>
      
      <div class="relative">
        <!-- Timeline line -->
        <div ref="timelineLineRef" class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-surface2 rounded-full opacity-0 transition-all duration-700"></div>
        
        <!-- Timeline items -->
        <div class="space-y-12">
          <div
            v-for="(item, index) in timelineItems"
            :key="item.year"
            class="relative"
          >
            <!-- Timeline item -->
            <div
              class="flex flex-col md:flex-row items-center"
              :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <!-- Year marker -->
              <div class="mb-8 md:mb-0 md:w-1/2 flex justify-center">
                <div
                  :ref="(el) => yearMarkers[index] = el as HTMLElement"
                  class="bg-mauve text-base px-6 py-2 rounded-full font-bold text-xl shadow-lg opacity-0 transition-all duration-700"
                >
                  {{ item.year }}
                </div>
              </div>
              
              <!-- Content -->
              <div class="relative md:w-1/2">
                <!-- Connector dot -->
                <div class="absolute top-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-5 h-5 bg-mauve rounded-full border-4 border-base"></div>
                
                <!-- Content card -->
                <Card
                  :ref="(el) => contentCards[index] = el as HTMLElement"
                  class="max-w-md mx-auto md:mx-0 md:ml-8 opacity-0 transition-all duration-700"
                  :class="index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'"
                  :glass="true"
                >
                  <template #header>
                    <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                  </template>
                  <p>{{ item.description }}</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePreloadAnimations } from '~/composables/usePreloadAnimations';

interface TimelineItem {
  year: number;
  title: string;
  description: string;
}

interface TimelineSectionProps {
  title: string;
  timelineItems: TimelineItem[];
}

const props = defineProps<TimelineSectionProps>();

// References
const headerRef = ref<HTMLElement>();
const timelineLineRef = ref<HTMLElement>();
const yearMarkers = ref<HTMLElement[]>([]);
const contentCards = ref<HTMLElement[]>([]);

// Use preload animations
const { preloadAnimations } = usePreloadAnimations();

// Use onMounted to ensure DOM elements are available
import { onMounted } from 'vue';

onMounted(() => {
  // Configure base animations
  const animations = [
    { element: headerRef, animation: 'animate-slide-up', delay: 0, removeClasses: ['opacity-0'] },
    { element: timelineLineRef, animation: 'animate-fade-in', delay: 200, removeClasses: ['opacity-0'] },
  ];
  
  // Add timeline items animations
  yearMarkers.value.forEach((marker, index) => {
    if (marker) {
      animations.push({
        element: ref(marker),
        animation: 'animate-fade-in',
        delay: 400 + (index * 200),
        removeClasses: ['opacity-0']
      });
    }
  });
  
  contentCards.value.forEach((card, index) => {
    if (card) {
      animations.push({
        element: ref(card),
        animation: index % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left',
        delay: 500 + (index * 200),
        removeClasses: ['opacity-0']
      });
    }
  });
  
  preloadAnimations(animations);
});
</script>