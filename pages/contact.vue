<template>
  <div>
    <!-- Contact Hero -->
    <section class="bg-mantle py-16 md:py-24">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="mb-6 animate-slide-down">
            <span class="gradient-text">Contact</span>
          </h1>
          <p class="text-lg md:text-xl text-subtext0 mb-8 animate-fade-in">
            Intéressé par mon travail ou vous avez une question ?
            N'hésitez pas à me contacter.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="glass-card p-6 md:p-8 animate-slide-right">
            <Suspense>
              <template #default>
                <LazyContactForm />
              </template>
              <template #fallback>
                <LoadingState />
              </template>
            </Suspense>
          </div>
          
          <!-- Contact Info -->
          <div class="animate-slide-left">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Map Section (optional, could be added later) -->
    <section class="py-16 bg-mantle">
      <div class="container-custom text-center">
        <div class="mb-12">
          <h2 class="mb-4">Me retrouver</h2>
          <p class="text-subtext0 max-w-2xl mx-auto">
            Actuellement basé à Montpellier, je suis disponible pour des rencontres professionnelles et des projets dans la région.
          </p>
        </div>
        
        <!-- Placeholder for a map - in a real project, replace with an actual map -->
        <div class="h-64 md:h-96 bg-surface0 rounded-lg flex items-center justify-center border border-surface1">
          <div class="text-center">
            <Icon name="heroicons:map" class="w-12 h-12 text-overlay0 mb-4" />
            <p class="text-subtext0">Carte de Montpellier</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const LoadingState = defineAsyncComponent(() => import('@/components/ui/LoadingState.vue'))

const LazyContactForm = defineAsyncComponent(() => import('@/components/contact/ContactForm.vue'))
// Page meta
useHead({
  title: 'Contact | Alexis Robin',
  meta: [
    { name: 'description', content: 'Contactez Alexis Robin - Étudiant en informatique spécialisé en programmation bas niveau et systèmes embarqués' }
  ]
})
</script>