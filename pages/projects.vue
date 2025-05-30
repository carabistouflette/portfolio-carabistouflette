<template>
  <div>
    <!-- Projects Hero -->
    <section class="bg-mantle py-16 md:py-24">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="mb-6 animate-slide-down">
            <span class="gradient-text">Mes Projets</span>
          </h1>
          <p class="text-lg md:text-xl text-subtext0 mb-8 animate-fade-in">
            Découvrez mes réalisations en programmation bas niveau, 
            systèmes embarqués et administration réseau.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Projects List -->
    <section class="section-padding">
      <div class="container-custom">
        <Suspense>
          <template #default>
            <ProjectsList />
          </template>
          <template #fallback>
            <LoadingState />
          </template>
        </Suspense>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="bg-mantle py-16">
      <div class="container-custom text-center">
        <Card glass className="max-w-3xl mx-auto p-8 md:p-12">
          <h2 class="mb-4">Intéressé par mon travail ?</h2>
          <p class="text-lg mb-6">
            N'hésitez pas à me contacter pour discuter de projets ou pour en savoir plus sur mon parcours.
          </p>
          <Button 
            to="/contact" 
            variant="solid"
            size="lg" 
            iconRight="heroicons:envelope"
          >
            Me contacter
          </Button>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useSeoMeta } from '#imports'
import LoadingState from '@/components/ui/LoadingState.vue'

const ProjectsList = defineAsyncComponent(() => import('@/components/projects/ProjectsList.vue'))
// Page meta
useSeoMeta({
  title: 'Projets - Alexis Robin Portfolio',
  description: 'Explorez les projets réalisés par Alexis Robin, incluant des travaux en programmation bas niveau, systèmes embarqués, et administration réseau.',
  ogTitle: 'Projets - Alexis Robin Portfolio',
  ogDescription: 'Explorez les projets réalisés par Alexis Robin, incluant des travaux en programmation bas niveau, systèmes embarqués, et administration réseau.',
})
</script>