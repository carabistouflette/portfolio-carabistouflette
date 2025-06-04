<template>
  <div class="text-center p-8 bg-base border border-surface1 rounded-2xl hover:border-pink/30 transition-colors group">
    <div class="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
         :class="bgClass">
      <Icon :name="icon" class="w-10 h-10" :class="iconClass" />
    </div>
    <h3 class="text-2xl font-bold mb-4">{{ title }}</h3>
    <p class="text-subtext0 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  bgClass: string
  iconClass: string
}

defineProps<Props>()
</script>