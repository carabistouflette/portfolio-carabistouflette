<template>
  <div>
    <!-- Contact Hero -->
    <section class="bg-mantle py-16 md:py-24">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="mb-6 animate-slide-down !text-4xl md:!text-5xl lg:!text-6xl">
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Contact Form -->
          <div class="w-full">
            <Card glass className="p-6 md:p-8 h-full animate-slide-right">
              <h3 class="!text-2xl md:!text-3xl font-bold mb-6">Envoyez-moi un message</h3>
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
            </Card>
          </div>
          
          <!-- Contact Info -->
          <div class="w-full">
            <div class="animate-slide-left h-full">
              <LazyContactInfo
                :title="contactInfoData.title"
                :subtitle="contactInfoData.subtitle"
                :contact-items="contactInfoData.contactItems"
                :availability="contactInfoData.availability"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useSeoMeta } from '#imports'

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
    description: 'Je suis actuellement en recherche de stage pour 2026 dans le domaine du réseau ou de la cybersécurité.'
  }
})

const LazyContactForm = defineAsyncComponent(() => import('@/components/contact/ContactForm.vue'))
const LazyContactInfo = defineAsyncComponent(() => import('@/components/contact/ContactInfo.vue'))

// Page meta
useSeoMeta({
  title: 'Contact - Alexis Robin Portfolio',
  description: 'Contactez Alexis Robin pour discuter de projets, poser des questions ou en savoir plus sur son parcours en informatique, systèmes embarqués et programmation bas niveau.',
  ogTitle: 'Contact - Alexis Robin Portfolio',
  ogDescription: 'Contactez Alexis Robin pour discuter de projets, poser des questions ou en savoir plus sur son parcours en informatique, systèmes embarqués et programmation bas niveau.',
})
</script>