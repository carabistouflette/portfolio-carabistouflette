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
                <LazyContactForm
                  :form-fields="contactFormData.formFields"
                  :submit-button-text="contactFormData.submitButtonText"
                />
              </template>
              <template #fallback>
                <LoadingState />
              </template>
            </Suspense>
          </div>
          
          <!-- Contact Info -->
          <div class="animate-slide-left">
            <LazyContactInfo
              :title="contactInfoData.title"
              :subtitle="contactInfoData.subtitle"
              :contact-items="contactInfoData.contactItems"
              :availability="contactInfoData.availability"
            />
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
        
        <!-- Interactive Map -->
        <Suspense>
          <template #default>
            <LazyMapComponent
              :center="mapComponentData.center"
              :zoom="mapComponentData.zoom"
              :marker="mapComponentData.marker"
            />
          </template>
          <template #fallback>
            <LoadingState />
          </template>
        </Suspense>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

interface MapCoordinates {
  center: [number, number];
  zoom: number;
  marker: {
    position: [number, number];
    popup: string;
  };
}

const LoadingState = defineAsyncComponent(() => import('@/components/ui/LoadingState.vue'))

// Data for components
const contactFormData = ref({
  formFields: [
    {
      name: 'name',
      label: 'Nom',
      type: 'text',
      validation: {
        required: true,
        minLength: 2
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: {
        required: true,
        email: true
      }
    },
    {
      name: 'subject',
      label: 'Sujet',
      type: 'text',
      validation: {
        required: true,
        minLength: 5
      }
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      validation: {
        required: true,
        minLength: 10
      }
    }
  ],
  submitButtonText: 'Envoyer le message'
})

const contactInfoData = ref({
  title: 'Contactez-moi',
  subtitle: 'N\'hésitez pas à me contacter via le formulaire ou directement en utilisant l\'une des méthodes ci-dessous.',
  contactItems: [
    {
      type: 'email',
      title: 'Email',
      value: 'alexis.robin@etu.umontpellier.fr',
      icon: 'heroicons:envelope',
      iconBg: 'bg-blue/20',
      href: 'mailto:alexis.robin@etu.umontpellier.fr'
    },
    {
      type: 'phone',
      title: 'Téléphone',
      value: '+33 7 61 46 04 96',
      icon: 'heroicons:phone',
      iconBg: 'bg-green/20',
      href: 'tel:+33761460496'
    },
    {
      type: 'website',
      title: 'LinkedIn',
      value: 'linkedin.com/in/alexis-robin-41703a2ab',
      icon: 'mdi:linkedin',
      iconBg: 'bg-sky/20',
      href: 'https://linkedin.com/in/alexis-robin-41703a2ab'
    },
    {
      type: 'location',
      title: 'Localisation',
      value: 'Montpellier, France',
      icon: 'heroicons:map-pin',
      iconBg: 'bg-peach/20',
      href: 'https://goo.gl/maps/Montpellier'
    }
  ],
  availability: {
    icon: 'heroicons:clock',
    title: 'Disponibilité',
    description: 'Je suis actuellement en alternance en systèmes embarqués et disponible pour des projets ponctuels.'
  }
})

const mapComponentData = ref<MapCoordinates>({
  center: [43.6109, 3.8767],
  zoom: 13,
  marker: {
    position: [43.6109, 3.8767],
    popup: '<b>Montpellier</b><br>Ville étudiante dynamique'
  }
})

const LazyContactForm = defineAsyncComponent(() => import('@/components/contact/ContactForm.vue'))
const LazyContactInfo = defineAsyncComponent(() => import('@/components/contact/ContactInfo.vue'))
const LazyMapComponent = defineAsyncComponent(() => import('@/components/contact/MapComponent.vue'))

// Page meta
useHead({
  title: 'Contact | Alexis Robin',
  meta: [
    { name: 'description', content: 'Contactez Alexis Robin - Étudiant en informatique spécialisé en programmation bas niveau et systèmes embarqués' }
  ]
})
</script>