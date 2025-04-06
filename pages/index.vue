<template>
  <div>
    <HeroBanner />
    <AboutSection />
    <Suspense>
      <template #default>
        <LazyTimelineSection />
      </template>
      <template #fallback>
        <LoadingState />
      </template>
    </Suspense>
    <section class="section-padding bg-mantle">
      <div class="container-custom text-center">
        <h2 class="mb-6 animate-slide-up">Envie de voir mes projets ?</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto">
          Découvrez mes réalisations en programmation bas niveau, systèmes embarqués et plus encore.
        </p>
        <Button 
          to="/projects" 
          variant="primary" 
          size="lg" 
          iconRight="heroicons:arrow-right"
          class="animate-slide-up"
        >
          Explorer mes projets
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const LoadingState = defineAsyncComponent(() => import('@/components/ui/LoadingState.vue'))

const LazyTimelineSection = defineAsyncComponent(() => import('@/components/home/TimelineSection.vue'))
// Page meta
useHead({
  title: 'Alexis Robin | Portfolio',
  meta: [
    { name: 'description', content: 'Portfolio d\'Alexis Robin - Étudiant en informatique spécialisé en programmation bas niveau et systèmes embarqués' }
  ]
})
</script>