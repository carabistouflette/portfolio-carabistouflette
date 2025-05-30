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
      
      <div class="relative max-w-6xl mx-auto">
        <!-- Timeline line - only visible on medium screens and up -->
        <div ref="timelineLineRef" class="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-surface2" style="opacity: 0;"></div>
        
        <!-- Timeline items -->
        <div class="relative">
          <div
            v-for="(item, index) in timelineItems"
            :key="item.year"
            class="relative flex items-center justify-center mb-16 last:mb-0"
          >
            <!-- Desktop layout -->
            <div class="hidden md:flex w-full items-center">
              <!-- Left content -->
              <div class="w-5/12" :class="{ 'order-2 text-left': index % 2 !== 0 }">
                <div
                  v-if="index % 2 === 0"
                  :ref="(el) => {
                    if (el) {
                      contentCards.set(index, el as HTMLElement);
                    }
                  }"
                  style="opacity: 0;"
                  class="ml-auto"
                >
                  <Card :glass="true" class="max-w-md ml-auto">
                    <template #header>
                      <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                    </template>
                    <p class="text-subtext0">{{ item.description }}</p>
                  </Card>
                </div>
              </div>
              
              <!-- Center timeline -->
              <div class="w-2/12 flex justify-center relative">
                <!-- Connector dot -->
                <div class="absolute w-6 h-6 bg-mauve rounded-full border-4 border-base z-10"></div>
                <!-- Year badge -->
                <div
                  :ref="(el) => {
                    if (el) {
                      yearMarkers.set(index, el as HTMLElement);
                    }
                  }"
                  class="bg-surface1 text-text px-4 py-2 rounded-full font-bold text-base shadow-xl border border-surface2 z-20"
                  style="opacity: 0; position: relative;"
                >
                  {{ item.year }}
                </div>
              </div>
              
              <!-- Right content -->
              <div class="w-5/12" :class="{ 'order-1 text-right': index % 2 !== 0 }">
                <div
                  v-if="index % 2 !== 0"
                  :ref="(el) => {
                    if (el) {
                      contentCards.set(index, el as HTMLElement);
                    }
                  }"
                  style="opacity: 0;"
                  class="mr-auto"
                >
                  <Card :glass="true" class="max-w-md">
                    <template #header>
                      <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                    </template>
                    <p class="text-subtext0">{{ item.description }}</p>
                  </Card>
                </div>
              </div>
            </div>
            
            <!-- Mobile layout -->
            <div class="md:hidden w-full">
              <div class="text-center mb-4">
                <div
                  :ref="(el) => {
                    if (el) {
                      yearMarkers.set(index + 100, el as HTMLElement); // Use different index for mobile
                    }
                  }"
                  class="inline-block bg-surface1 text-text px-6 py-3 rounded-full font-bold text-lg shadow-xl border border-surface2"
                  style="opacity: 0;"
                >
                  {{ item.year }}
                </div>
              </div>
              <div
                :ref="(el) => {
                  if (el) {
                    contentCards.set(index + 100, el as HTMLElement); // Use different index for mobile
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
        const delay = index >= 100 ? 400 + ((index - 100) * 200) : 400 + (index * 200);
        setTimeout(() => {
          marker.style.opacity = '1';
          marker.classList.add('animate-fade-in');
        }, delay);
      }
    });
    
    contentCards.forEach((card, index) => {
      if (card) {
        const actualIndex = index >= 100 ? index - 100 : index;
        const delay = index >= 100 ? 500 + ((index - 100) * 200) : 500 + (index * 200);
        const animationClass = index >= 100 ? 'animate-fade-in' : (actualIndex % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left');
        setTimeout(() => {
          card.style.opacity = '1';
          card.classList.add(animationClass);
        }, delay);
      }
    });
  }, 100); // Small delay to ensure DOM is ready
});
</script>