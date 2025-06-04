<template>
  <div class="ai-page min-h-screen bg-base overflow-hidden">
    <AIHero />
    <AIPhilosophy />
    <AITechnical />
    <AIInteractive />
    <AIUsage />
    <AIMetrics />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Et l\'IA? - Réflexions sur l\'Intelligence Artificielle',
  meta: [
    {
      name: 'description',
      content: 'Mes réflexions sur l\'usage de l\'IA dans le développement, entre nécessité et vigilance intellectuelle'
    }
  ]
})
</script>

<style scoped>
.ai-page {
  position: relative;
}
</style>