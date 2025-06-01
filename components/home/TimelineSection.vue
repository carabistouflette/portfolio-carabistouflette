<template>
  <section class="section-padding bg-gradient-to-b from-mantle/50 to-base/30">
    <div class="container-custom">
      <div class="mb-16 text-center timeline-header">
        <h2 class="mb-6 gradient-text !text-3xl md:!text-5xl font-bold">{{ title }}</h2>
        <p class="text-lg text-subtext0 max-w-2xl mx-auto mb-8">
          {{ subtitle || 'De mes premiers pas dans le code à aujourd\'hui, découvrez mon évolution' }}
        </p>
        <div class="timeline-divider"></div>
      </div>
      
      <div class="relative max-w-6xl mx-auto">
        <!-- Timeline vertical line with gradient -->
        <div class="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full timeline-line-container">
          <div class="timeline-line"></div>
          <div class="timeline-line-glow"></div>
        </div>
        
        <!-- Timeline items -->
        <div class="space-y-16 lg:space-y-24">
          <div
            v-for="(item, index) in timelineItems"
            :key="item.year"
            class="relative timeline-item"
            :data-index="index"
          >
            <!-- Desktop: Grid layout -->
            <div class="hidden lg:grid lg:grid-cols-[1fr,auto,1fr] lg:gap-12 lg:items-center">
              <!-- Left content (even items) or empty space (odd items) -->
              <div>
                <div v-if="index % 2 === 0" class="ml-auto max-w-lg timeline-card timeline-card-left">
                  <Card :glass="true" class="group hover:scale-[1.02] transition-all duration-300">
                    <template #header>
                      <div class="flex items-start justify-between">
                        <h3 class="text-2xl font-bold mb-3 text-text group-hover:text-mauve transition-colors">
                          {{ item.title }}
                        </h3>
                        <Icon v-if="item.icon" :name="item.icon" class="w-6 h-6 text-mauve opacity-60" />
                      </div>
                    </template>
                    <p class="text-subtext0 leading-relaxed mb-4">{{ item.description }}</p>
                    <div v-if="item.skills" class="flex flex-wrap gap-2">
                      <span
                        v-for="skill in item.skills"
                        :key="skill"
                        class="px-3 py-1 text-xs font-medium bg-surface1/50 text-subtext1 rounded-full"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </Card>
                </div>
              </div>
              
              <!-- Center: Year and dot -->
              <div class="relative flex flex-col items-center justify-center timeline-center">
                <!-- Year badge with enhanced glass effect -->
                <div class="timeline-year-badge mb-4">
                  <span class="timeline-year-text">{{ item.year }}</span>
                  <div class="timeline-year-glow"></div>
                </div>
                <!-- Enhanced dot with connections -->
                <div class="timeline-dot-wrapper">
                  <div class="timeline-dot-container">
                    <div class="timeline-dot"></div>
                    <div class="timeline-dot-pulse"></div>
                    <div class="timeline-dot-ring"></div>
                  </div>
                  <!-- Connection lines to cards -->
                  <div v-if="index % 2 === 0" class="timeline-connector timeline-connector-left"></div>
                  <div v-else class="timeline-connector timeline-connector-right"></div>
                </div>
              </div>
              
              <!-- Right content (odd items) or empty space (even items) -->
              <div>
                <div v-if="index % 2 !== 0" class="max-w-lg timeline-card timeline-card-right">
                  <Card :glass="true" class="group hover:scale-[1.02] transition-all duration-300">
                    <template #header>
                      <div class="flex items-start justify-between">
                        <h3 class="text-2xl font-bold mb-3 text-text group-hover:text-mauve transition-colors">
                          {{ item.title }}
                        </h3>
                        <Icon v-if="item.icon" :name="item.icon" class="w-6 h-6 text-mauve opacity-60" />
                      </div>
                    </template>
                    <p class="text-subtext0 leading-relaxed mb-4">{{ item.description }}</p>
                    <div v-if="item.skills" class="flex flex-wrap gap-2">
                      <span
                        v-for="skill in item.skills"
                        :key="skill"
                        class="px-3 py-1 text-xs font-medium bg-surface1/50 text-subtext1 rounded-full"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            
            <!-- Mobile/Tablet: Stacked layout -->
            <div class="lg:hidden">
              <div class="relative">
                <!-- Mobile timeline line -->
                <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-surface2 to-transparent"></div>
                
                <div class="flex gap-6">
                  <!-- Year and dot column -->
                  <div class="flex flex-col items-center relative z-10">
                    <div class="timeline-year-badge mobile">
                      <span class="timeline-year-text font-bold">{{ item.year }}</span>
                    </div>
                    <div class="timeline-dot-mobile mt-4">
                      <div class="timeline-dot"></div>
                      <div class="timeline-dot-pulse"></div>
                    </div>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1 pb-8 timeline-card">
                    <Card :glass="true" class="group">
                      <template #header>
                        <div class="flex items-start justify-between">
                          <h3 class="text-xl font-bold mb-2 text-text group-hover:text-mauve transition-colors">
                            {{ item.title }}
                          </h3>
                          <Icon v-if="item.icon" :name="item.icon" class="w-5 h-5 text-mauve opacity-60" />
                        </div>
                      </template>
                      <p class="text-subtext0 leading-relaxed mb-3">{{ item.description }}</p>
                      <div v-if="item.skills" class="flex flex-wrap gap-1.5">
                        <span
                          v-for="skill in item.skills"
                          :key="skill"
                          class="px-2.5 py-0.5 text-xs font-medium bg-surface1/50 text-subtext1 rounded-full"
                        >
                          {{ skill }}
                        </span>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Timeline end marker -->
        <div class="relative mt-16 timeline-end">
          <div class="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-8">
            <div class="w-px h-8 bg-gradient-to-b from-surface2 to-transparent"></div>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center gap-2 px-6 py-3 bg-surface1/30 backdrop-blur-sm rounded-full border border-overlay0/20">
              <Icon name="heroicons:rocket-launch" class="w-5 h-5 text-mauve" />
              <span class="text-sm font-medium text-subtext1">Et l'aventure continue...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

interface TimelineItem {
  year: number;
  title: string;
  description: string;
  icon?: string;
  skills?: string[];
}

interface TimelineSectionProps {
  title: string;
  subtitle?: string;
  timelineItems: TimelineItem[];
}

const props = defineProps<TimelineSectionProps>();

let observer: IntersectionObserver | null = null;

// Enhanced timeline animations with intersection observer
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = entry.target.getAttribute('data-index');
        // Add delay based on index for staggered effect
        setTimeout(() => {
          entry.target.classList.add('timeline-visible');
        }, index ? parseInt(index) * 100 : 0);
        
        // Animate the timeline line progress
        const line = document.querySelector('.timeline-line');
        if (line && index === '0') {
          line.classList.add('timeline-line-animate');
        }
      }
    });
  }, observerOptions);
  
  // Observe timeline elements
  document.querySelectorAll('.timeline-item').forEach((item) => {
    observer.observe(item);
  });
  
  // Observe timeline end
  const timelineEnd = document.querySelector('.timeline-end');
  if (timelineEnd) {
    observer.observe(timelineEnd);
  }
  
  // Animate header immediately
  const header = document.querySelector('.timeline-header');
  if (header) {
    requestAnimationFrame(() => {
      header.classList.add('timeline-visible');
    });
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
/* Timeline header animation */
.timeline-header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-header.timeline-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Timeline divider */
.timeline-divider {
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

.timeline-divider::after {
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

/* Timeline line */
.timeline-line-container {
  width: 3px;
  z-index: 10;
}

.timeline-line {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    transparent,
    var(--surface2) 5%,
    var(--surface2) 95%,
    transparent
  );
  position: relative;
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
}

.timeline-line-animate {
  animation: lineGrow 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.timeline-line-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    transparent,
    var(--mauve) 20%,
    transparent 40%
  );
  opacity: 0;
  animation: lineGlow 2s ease-in-out infinite;
  animation-delay: 1.5s;
}

@keyframes lineGrow {
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes lineGlow {
  0%, 100% { 
    opacity: 0;
    transform: translateY(-100%);
  }
  50% { 
    opacity: 0.3;
  }
  100% {
    transform: translateY(100%);
  }
}

/* Timeline items animation */
.timeline-item {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-item.timeline-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Timeline center elements */
.timeline-center {
  z-index: 40;
}

/* Timeline dot wrapper */
.timeline-dot-wrapper {
  @apply relative;
}

.timeline-dot-container {
  @apply relative;
  z-index: 45;
}

.timeline-dot {
  @apply w-5 h-5 rounded-full;
  background: linear-gradient(135deg, var(--mauve), var(--pink));
  border: 3px solid var(--base);
  box-shadow: 0 0 0 6px rgba(var(--mauve-rgb), 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-dot-pulse {
  @apply absolute inset-0 rounded-full;
  background: var(--mauve);
  opacity: 0.4;
  animation: dotPulse 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

.timeline-dot-ring {
  @apply absolute inset-0 rounded-full;
  border: 2px solid var(--mauve);
  opacity: 0;
  animation: ringExpand 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

@keyframes dotPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes ringExpand {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.timeline-visible .timeline-dot {
  transform: scale(1.1);
  box-shadow: 
    0 0 0 6px rgba(var(--mauve-rgb), 0.15),
    0 0 20px rgba(var(--mauve-rgb), 0.4);
}

/* Mobile timeline dot */
.timeline-dot-mobile {
  @apply relative;
}

.timeline-dot-mobile .timeline-dot {
  @apply w-4 h-4;
  border-width: 2px;
}

/* Timeline connectors */
.timeline-connector {
  @apply absolute top-1/2 transform -translate-y-1/2;
  height: 2px;
  width: 40px;
  background: linear-gradient(90deg, var(--mauve), transparent);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s;
}

.timeline-connector-left {
  right: 100%;
  margin-right: 20px;
  background: linear-gradient(270deg, var(--mauve), transparent);
}

.timeline-connector-right {
  left: 100%;
  margin-left: 20px;
}

.timeline-visible .timeline-connector {
  opacity: 0.3;
}

/* Year badge */
.timeline-year-badge {
  @apply relative inline-flex items-center justify-center;
  z-index: 50;
  background: linear-gradient(135deg, 
    rgba(var(--surface1-rgb), 0.9),
    rgba(var(--surface2-rgb), 0.7)
  );
  backdrop-filter: blur(12px);
  border: 1px solid rgba(var(--overlay0-rgb), 0.2);
  border-radius: 9999px;
  padding: 0.625rem 1.75rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.timeline-year-badge.mobile {
  padding: 0.875rem 2.25rem;
  margin-bottom: 0.5rem;
}

.timeline-year-badge:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.timeline-year-text {
  @apply font-bold text-text;
  font-size: 1.125rem;
  letter-spacing: 0.025em;
  position: relative;
  z-index: 1;
}

.timeline-year-glow {
  @apply absolute inset-0;
  background: radial-gradient(circle at center, var(--mauve), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.timeline-year-badge:hover .timeline-year-glow {
  opacity: 0.1;
}

/* Timeline card animations */
.timeline-card {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-card-left {
  transform: translateX(-40px);
}

.timeline-card-right {
  transform: translateX(40px);
}

.timeline-visible .timeline-card-left,
.timeline-visible .timeline-card-right {
  opacity: 1;
  transform: translateX(0);
}

/* Mobile timeline cards */
@media (max-width: 1023px) {
  .timeline-visible .timeline-card {
    opacity: 1;
    transform: translateY(0);
  }
  
  .timeline-card {
    transform: translateY(30px);
  }
}

/* Timeline end animation */
.timeline-end {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-end.timeline-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Enhanced hover states */
@media (hover: hover) {
  .timeline-item:hover .timeline-dot {
    transform: scale(1.3);
    box-shadow: 
      0 0 0 8px rgba(var(--mauve-rgb), 0.2),
      0 0 30px rgba(var(--mauve-rgb), 0.5);
  }
  
  .timeline-item:hover .timeline-connector {
    opacity: 0.6;
    width: 60px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .timeline-header,
  .timeline-item,
  .timeline-line,
  .timeline-line-glow,
  .timeline-dot,
  .timeline-dot-pulse,
  .timeline-dot-ring,
  .timeline-card,
  .timeline-connector,
  .timeline-end {
    transition: none !important;
    animation: none !important;
  }
  
  .timeline-visible .timeline-card,
  .timeline-visible .timeline-dot,
  .timeline-visible .timeline-connector,
  .timeline-visible.timeline-end {
    opacity: 1;
    transform: none;
  }
  
  .timeline-line-animate {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* Dark theme adjustments */
:root.mocha .timeline-divider,
:root.macchiato .timeline-divider,
:root.frappe .timeline-divider {
  filter: brightness(1.2);
}

/* Light theme adjustments */
:root.latte .timeline-year-badge {
  background: linear-gradient(135deg, 
    rgba(var(--surface0-rgb), 0.95),
    rgba(var(--surface1-rgb), 0.85)
  );
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

:root.latte .timeline-dot {
  box-shadow: 0 0 0 6px rgba(var(--mauve-rgb), 0.08);
}
</style>