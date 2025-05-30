<template>
  <section class="section-padding">
    <div class="container-custom">
      <div ref="headerRef" class="mb-12 text-center opacity-0">
        <h2 class="mb-4">{{ title }}</h2>
        <div class="w-24 h-1 bg-mauve mx-auto rounded-full"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto">
        <!-- Timeline line - only visible on medium screens and up -->
        <div ref="timelineLineRef" class="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-surface2 opacity-0"></div>
        
        <!-- Timeline items -->
        <div class="space-y-16 relative">
          <div
            v-for="(item, index) in timelineItems"
            :key="item.year"
            class="relative"
          >
            <!-- Timeline item -->
            <div
              class="flex flex-col md:grid md:grid-cols-2 md:gap-8 items-center"
            >
              <!-- Content - alternating sides -->
              <div 
                class="w-full"
                :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'"
              >
                <Card
                  :ref="(el) => {
                    if (el && contentCards.value) {
                      contentCards.value[index] = (el as any).$el || el;
                    }
                  }"
                  class="opacity-0"
                  :glass="true"
                >
                  <template #header>
                    <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                  </template>
                  <p class="text-subtext0">{{ item.description }}</p>
                </Card>
              </div>
              
              <!-- Year marker - center column -->
              <div 
                class="w-full flex items-center justify-center relative mt-4 md:mt-0"
                :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
              >
                <!-- Connector dot - only visible on medium screens and up -->
                <div class="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-mauve rounded-full border-4 border-base z-10"></div>
                
                <!-- Year badge -->
                <div
                  :ref="(el) => {
                    if (el && yearMarkers.value) {
                      yearMarkers.value[index] = el as HTMLElement;
                    }
                  }"
                  class="bg-surface1 text-text px-6 py-3 rounded-full font-bold text-lg shadow-xl border border-surface2 opacity-0"
                >
                  {{ item.year }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
// Initialize arrays with the correct length based on timeline items
const yearMarkers = ref<(HTMLElement | null)[]>(new Array(props.timelineItems.length).fill(null));
const contentCards = ref<(HTMLElement | null)[]>(new Array(props.timelineItems.length).fill(null));

onMounted(() => {
  // Simple animation approach without the preloadAnimations composable
  // Apply animations directly after a short delay
  setTimeout(() => {
    if (headerRef.value) {
      headerRef.value.classList.add('animate-slide-up');
      headerRef.value.classList.remove('opacity-0');
    }
    if (timelineLineRef.value) {
      timelineLineRef.value.classList.add('animate-fade-in');
      timelineLineRef.value.classList.remove('opacity-0');
    }
    
    // Animate timeline items with stagger
    if (yearMarkers.value && yearMarkers.value.length > 0) {
      yearMarkers.value.forEach((marker, index) => {
        if (marker) {
          setTimeout(() => {
            marker.classList.add('animate-fade-in');
            marker.classList.remove('opacity-0');
          }, 400 + (index * 200));
        }
      });
    }
    
    if (contentCards.value && contentCards.value.length > 0) {
      contentCards.value.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.classList.add(index % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left');
            card.classList.remove('opacity-0');
          }, 500 + (index * 200));
        }
      });
    }
  }, 100); // Small delay to ensure DOM is ready
});
</script>