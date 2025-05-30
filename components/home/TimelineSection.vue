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
        <div ref="timelineLineRef" class="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-surface2" style="opacity: 0;"></div>
        
        <!-- Timeline items -->
        <div class="relative">
          <div
            v-for="(item, index) in timelineItems"
            :key="item.year"
            class="relative mb-16 last:mb-0"
          >
            <!-- Desktop layout -->
            <div class="hidden md:flex md:items-center">
              <!-- Content card - alternates sides on desktop -->
              <div 
                class="md:w-5/12"
                :class="index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:order-3 md:pl-8 md:text-left'"
              >
                <div
                  :ref="(el) => {
                    if (el) {
                      contentCards.set(index, el as HTMLElement);
                    }
                  }"
                  style="opacity: 0;"
                >
                  <Card :glass="true">
                    <template #header>
                      <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                    </template>
                    <p class="text-subtext0">{{ item.description }}</p>
                  </Card>
                </div>
              </div>
              
              <!-- Timeline center column -->
              <div class="md:w-2/12 relative flex justify-center">
                <!-- Connector dot - positioned on the line -->
                <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-mauve rounded-full border-4 border-base z-20"></div>
                
                <!-- Year badge - offset from line -->
                <div
                  :ref="(el) => {
                    if (el) {
                      yearMarkers.set(index, el as HTMLElement);
                    }
                  }"
                  class="relative bg-surface1 text-text px-6 py-2 rounded-full font-bold text-lg shadow-xl border border-surface2"
                  :class="index % 2 === 0 ? '-translate-x-32' : 'translate-x-32'"
                  style="opacity: 0;"
                >
                  {{ item.year }}
                </div>
              </div>
              
              <!-- Empty space for alternating layout -->
              <div 
                class="md:w-5/12"
                :class="index % 2 === 0 ? 'order-3' : 'order-1'"
              ></div>
            </div>
            
            <!-- Mobile layout -->
            <div class="md:hidden">
              <!-- Year with dot -->
              <div class="flex justify-center mb-4">
                <div class="relative">
                  <div
                    :ref="(el) => {
                      if (el) {
                        yearMarkers.set(index + 100, el as HTMLElement);
                      }
                    }"
                    class="bg-surface1 text-text px-6 py-2 rounded-full font-bold text-lg shadow-xl border border-surface2"
                    style="opacity: 0;"
                  >
                    {{ item.year }}
                  </div>
                </div>
              </div>
              
              <!-- Content -->
              <div
                :ref="(el) => {
                  if (el) {
                    contentCards.set(index + 100, el as HTMLElement);
                  }
                }"
                style="opacity: 0;"
              >
                <Card :glass="true">
                  <template #header>
                    <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                  </template>
                  <p class="text-subtext0">{{ item.description }}</p>
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
        const actualIndex = index >= 100 ? index - 100 : index;
        setTimeout(() => {
          marker.style.opacity = '1';
          marker.classList.add('animate-fade-in');
        }, 400 + (actualIndex * 200));
      }
    });
    
    contentCards.forEach((card, index) => {
      if (card) {
        const actualIndex = index >= 100 ? index - 100 : index;
        const isMobile = index >= 100;
        setTimeout(() => {
          card.style.opacity = '1';
          if (isMobile) {
            card.classList.add('animate-fade-in');
          } else {
            card.classList.add(actualIndex % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left');
          }
        }, 500 + (actualIndex * 200));
      }
    });
  }, 100); // Small delay to ensure DOM is ready
});
</script>