<template>
  <div class="project-card-skeleton">
    <Card :glass="true" class="h-full flex flex-col">
      <template #header>
        <div class="space-y-3">
          <SkeletonLoader variant="title" width="75%" />
          <div class="flex items-center gap-2">
            <SkeletonLoader variant="custom" width="80px" height="24px" rounded="6px" />
          </div>
        </div>
      </template>
      
      <div class="space-y-3">
        <SkeletonLoader variant="text" width="100%" />
        <SkeletonLoader variant="text" width="90%" />
        <SkeletonLoader variant="text" width="80%" />
      </div>
      
      <template #footer>
        <div class="space-y-4">
          <!-- GitHub badges skeleton -->
          <div class="flex gap-2">
            <SkeletonLoader variant="custom" width="60px" height="28px" rounded="6px" />
            <SkeletonLoader variant="custom" width="60px" height="28px" rounded="6px" />
            <SkeletonLoader variant="custom" width="80px" height="28px" rounded="6px" />
          </div>
          
          <!-- Tech tags skeleton -->
          <div class="flex flex-wrap gap-2">
            <SkeletonLoader 
              v-for="i in 4" 
              :key="i"
              variant="custom" 
              :width="`${60 + Math.random() * 40}px`" 
              height="24px" 
              rounded="6px"
              :style="{ animationDelay: `${i * 0.1}s` }"
            />
          </div>
          
          <!-- Button skeleton -->
          <SkeletonLoader variant="custom" width="100%" height="40px" rounded="8px" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '~/components/ui/Card.vue'
import SkeletonLoader from '~/components/ui/SkeletonLoader.vue'
</script>

<style scoped>
.project-card-skeleton {
  animation: skeleton-fade-in 0.5s ease-out;
}

@keyframes skeleton-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>