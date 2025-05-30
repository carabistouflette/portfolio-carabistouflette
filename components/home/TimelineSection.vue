<template>
  <section class="section-padding">
    <div class="container-custom">
      <!-- Debug info -->
      <div class="mb-4 p-4 bg-red-500 text-white rounded" v-if="false">
        <p>Timeline Debug:</p>
        <p>Component mounted: {{ isMounted }}</p>
        <p>Title: {{ title }}</p>
        <p>Items count: {{ timelineItems?.length || 0 }}</p>
        <p>Props: {{ JSON.stringify($props) }}</p>
      </div>
      
      <div ref="headerRef" class="mb-12 text-center" style="opacity: 0;">
        <h2 class="mb-4">{{ title }}</h2>
        <div class="w-24 h-1 bg-mauve mx-auto rounded-full"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto">
        <!-- Timeline line - only visible on medium screens and up -->
        <div ref="timelineLineRef" class="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-surface2" style="opacity: 0;"></div>
        
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
                <div
                  :ref="(el) => {
                    if (el) {
                      contentCards.set(index, el as HTMLElement);
                    }
                  }"
                  style="opacity: 0;"
                >
                  <Card
                    :glass="true"
                  >
                    <template #header>
                      <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                    </template>
                    <p class="text-subtext0">{{ item.description }}</p>
                  </Card>
                </div>
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
                    if (el) {
                      yearMarkers.set(index, el as HTMLElement);
                    }
                  }"
                  class="bg-surface1 text-text px-6 py-3 rounded-full font-bold text-lg shadow-xl border border-surface2"
                  style="opacity: 0;"
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
import { ref, onMounted, nextTick } from 'vue';

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
// Use Maps instead of arrays to avoid initialization issues
const yearMarkers = new Map<number, HTMLElement>();
const contentCards = new Map<number, HTMLElement>();

// Debug: Track if component is mounted
const isMounted = ref(false);

onMounted(async () => {
  isMounted.value = true;
  
  // Wait for next tick to ensure DOM is ready
  await nextTick();
  
  // Apply animations after a short delay
  setTimeout(() => {
    if (headerRef.value) {
      headerRef.value.style.opacity = '1';
      headerRef.value.classList.add('animate-slide-up');
    }
    if (timelineLineRef.value) {
      timelineLineRef.value.style.opacity = '1';
      timelineLineRef.value.classList.add('animate-fade-in');
    }
    
    // Animate timeline items with stagger
    yearMarkers.forEach((marker, index) => {
      if (marker) {
        setTimeout(() => {
          marker.style.opacity = '1';
          marker.classList.add('animate-fade-in');
        }, 400 + (index * 200));
      }
    });
    
    contentCards.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          card.style.opacity = '1';
          card.classList.add(index % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left');
        }, 500 + (index * 200));
      }
    });
  }, 100); // Small delay to ensure DOM is ready
});
</script>