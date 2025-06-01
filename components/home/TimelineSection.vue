<template>
  <section class="section-padding">
    <div class="container-custom">
      <div class="mb-12 text-center timeline-header">
        <h2 class="mb-4 gradient-text !text-3xl md:!text-4xl">{{ title }}</h2>
        <div class="timeline-divider"></div>
      </div>
      
      <div class="relative max-w-5xl mx-auto">
        <!-- Timeline vertical line with gradient -->
        <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full timeline-line-container">
          <div class="timeline-line"></div>
        </div>
        
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
              <div class="relative flex items-center justify-center">
                <!-- Enhanced dot with pulse -->
                <div class="timeline-dot-container">
                  <div class="timeline-dot"></div>
                  <div class="timeline-dot-pulse"></div>
                </div>
                <!-- Year badge with glass effect -->
                <div class="timeline-year-badge">
                  <span class="timeline-year-text">{{ item.year }}</span>
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
                <div class="timeline-year-badge mobile">
                  <span class="timeline-year-text">{{ item.year }}</span>
                </div>
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

// Enhanced timeline animations with intersection observer
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('timeline-visible');
      }
    });
  }, observerOptions);
  
  // Observe timeline elements
  document.querySelectorAll('.timeline-item').forEach((item) => {
    observer.observe(item);
  });
  
  // Animate header immediately
  const header = document.querySelector('.timeline-header');
  if (header) {
    setTimeout(() => {
      header.classList.add('timeline-visible');
    }, 100);
  }
});
</script>

<style scoped>
/* Timeline header animation */
.timeline-header {
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--animation-slow) var(--ease-out);
}

.timeline-header.timeline-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Timeline divider */
.timeline-divider {
  width: 6rem;
  height: 3px;
  margin: 0 auto;
  background: linear-gradient(90deg, transparent, var(--mauve), transparent);
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
}

.timeline-divider::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Timeline line */
.timeline-line-container {
  width: 2px;
}

.timeline-line {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    transparent,
    var(--surface2) 10%,
    var(--surface2) 90%,
    transparent
  );
  opacity: 0;
  animation: lineGrow 1s var(--ease-out) forwards;
  animation-delay: 0.3s;
}

@keyframes lineGrow {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* Timeline items animation */
.timeline-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all var(--animation-slow) var(--ease-out);
}

.timeline-item.timeline-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger effect for items */
.timeline-item:nth-child(1) { transition-delay: 0.1s; }
.timeline-item:nth-child(2) { transition-delay: 0.2s; }
.timeline-item:nth-child(3) { transition-delay: 0.3s; }
.timeline-item:nth-child(4) { transition-delay: 0.4s; }
.timeline-item:nth-child(5) { transition-delay: 0.5s; }

/* Timeline dot */
.timeline-dot-container {
  @apply absolute left-1/2 transform -translate-x-1/2;
  z-index: 10;
}

.timeline-dot {
  @apply w-4 h-4 rounded-full;
  background: var(--mauve);
  border: 4px solid var(--base);
  transition: all var(--animation-base) var(--ease-spring);
}

.timeline-dot-pulse {
  @apply absolute inset-0 rounded-full;
  background: var(--mauve);
  opacity: 0.3;
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(2);
    opacity: 0;
  }
}

.timeline-visible .timeline-dot {
  transform: scale(1.2);
}

/* Year badge */
.timeline-year-badge {
  @apply relative z-20 inline-flex items-center justify-center;
  background: linear-gradient(135deg, 
    rgba(var(--surface1-rgb, 69, 71, 90), 0.8),
    rgba(var(--surface2-rgb, 88, 91, 112), 0.6)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--overlay0-rgb, 108, 112, 134), 0.3);
  border-radius: 9999px;
  padding: 0.5rem 1.5rem;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all var(--animation-base) var(--ease-out);
}

.timeline-year-badge.mobile {
  padding: 0.75rem 2rem;
}

.timeline-year-badge:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.timeline-year-text {
  @apply font-bold text-text;
  letter-spacing: 0.05em;
}

/* Timeline card animations */
.timeline-card {
  opacity: 0;
  transition: all var(--animation-slow) var(--ease-out);
}

.timeline-visible .timeline-card:nth-child(even) {
  animation: slideInRight var(--animation-slow) var(--ease-out) forwards;
}

.timeline-visible .timeline-card:nth-child(odd) {
  animation: slideInLeft var(--animation-slow) var(--ease-out) forwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile timeline cards */
@media (max-width: 767px) {
  .timeline-visible .timeline-card {
    animation: fadeInUp var(--animation-slow) var(--ease-out) forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Hover effects for cards */
.timeline-card:hover {
  transform: scale(1.02);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .timeline-header,
  .timeline-item,
  .timeline-line,
  .timeline-dot,
  .timeline-card {
    transition-duration: 0.01ms !important;
    animation: none !important;
  }
  
  .timeline-visible .timeline-card,
  .timeline-visible .timeline-dot {
    opacity: 1;
    transform: none;
  }
}
</style>