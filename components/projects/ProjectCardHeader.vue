<template>
  <div class="relative">
    <h3 class="text-xl font-bold pr-40">{{ title }}</h3>
    <span
      class="project-category-badge group-hover:animate-pulse"
      :class="categoryClass"
    >
      {{ category }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  category: string
  categoryClass: string
}

defineProps<Props>()
</script>

<style scoped>
.project-category-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}
</style>