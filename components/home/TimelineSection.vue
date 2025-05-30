<template>
  <section class="section-padding">
    <div class="container-custom">
      <div class="mb-12 text-center timeline-header">
        <h2 class="mb-4">{{ title }}</h2>
        <div class="w-24 h-1 bg-mauve mx-auto rounded-full"></div>
      </div>
      
      <div class="relative max-w-5xl mx-auto">
        <!-- Timeline vertical line -->
        <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-surface2 timeline-line"></div>
        
        <!-- Timeline items -->
        <div class="space-y-12">
          <div
            v-for="(item, index) in timelineItems"
            :key="item.year"
            class="relative timeline-item"
          >
            <!-- Desktop: Grid layout -->
            <div class="hidden md:grid md:grid-cols-[1fr,auto,1fr] md:gap-8 md:items-center">
              <!-- Left content (even items) or empty space (odd items) -->
              <div>
                <div v-if="index % 2 === 0" class="ml-auto max-w-md timeline-card">
                  <Card :glass="true">
                    <template #header>
                      <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                    </template>
                    <p class="text-subtext0">{{ item.description }}</p>
                  </Card>
                </div>
              </div>
              
              <!-- Center: Year and dot -->
              <div class="relative flex items-center">
                <!-- Dot on the line -->
                <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-mauve rounded-full border-4 border-base"></div>
                <!-- Year badge -->
                <div class="bg-surface1 text-text px-4 py-2 rounded-full font-semibold whitespace-nowrap timeline-year">
                  {{ item.year }}
                </div>
              </div>
              
              <!-- Right content (odd items) or empty space (even items) -->
              <div>
                <div v-if="index % 2 !== 0" class="max-w-md timeline-card">
                  <Card :glass="true">
                    <template #header>
                      <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                    </template>
                    <p class="text-subtext0">{{ item.description }}</p>
                  </Card>
                </div>
              </div>
            </div>
            
            <!-- Mobile: Stacked layout -->
            <div class="md:hidden space-y-4">
              <div class="text-center timeline-year">
                <span class="bg-surface1 text-text px-6 py-3 rounded-full font-bold inline-block">
                  {{ item.year }}
                </span>
              </div>
              <div class="timeline-card">
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
import { onMounted } from 'vue';

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

// Simple animation using class selectors
onMounted(() => {
  // Initial opacity for all elements
  const header = document.querySelector('.timeline-header') as HTMLElement;
  const line = document.querySelector('.timeline-line') as HTMLElement;
  const years = document.querySelectorAll('.timeline-year');
  const cards = document.querySelectorAll('.timeline-card');
  
  // Set initial opacity
  if (header) header.style.opacity = '0';
  if (line) line.style.opacity = '0';
  years.forEach(el => (el as HTMLElement).style.opacity = '0');
  cards.forEach(el => (el as HTMLElement).style.opacity = '0');
  
  // Animate after a short delay
  setTimeout(() => {
    // Animate header
    if (header) {
      header.style.opacity = '1';
      header.classList.add('animate-slide-up');
    }
    
    // Animate line
    if (line) {
      setTimeout(() => {
        line.style.opacity = '1';
        line.classList.add('animate-fade-in');
      }, 200);
    }
    
    // Animate timeline items
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      const year = item.querySelector('.timeline-year') as HTMLElement;
      const card = item.querySelector('.timeline-card') as HTMLElement;
      
      setTimeout(() => {
        if (year) {
          year.style.opacity = '1';
          year.classList.add('animate-fade-in');
        }
        if (card) {
          card.style.opacity = '1';
          card.classList.add(index % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left');
        }
      }, 400 + (index * 150));
    });
  }, 100);
});
</script>