<template>
  <div>
    <HeroBanner
      :title="'Alexis Robin'"
      :subtitle="'Développeur Système Embarqué & Passionné de Programmation Bas Niveau'"
      :description="'Étudiant à l\'IUT informatique de Montpellier en parcours DACS, je suis un passionné de programmation bas niveau, de philosophie et de photographie.'"
      :primary-button="{ to: '/projects', text: 'Découvrir mes projets', iconRight: 'heroicons:arrow-right' }"
      :profile-image="'/profile-logo.svg'"
    />
    <AboutSection
      :title="aboutSectionData.title"
      :about-text="aboutSectionData.aboutText"
      :skills="aboutSectionData.skills"
    />
    <Suspense>
      <template #default>
        <LazyTimelineSection
          :title="timelineSectionData.title"
          :timeline-items="timelineSectionData.timelineItems"
        />
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
          variant="solid"
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
import { defineAsyncComponent, ref } from 'vue'

const LoadingState = defineAsyncComponent(() => import('@/components/ui/LoadingState.vue'))
// Data for components
const aboutSectionData = ref({
  title: 'À propos de moi',
  aboutText: [
    'Étudiant à l\'IUT informatique de Montpellier en parcours DACS, je suis passionné par la programmation bas niveau et les systèmes embarqués.',
    'Mon parcours m\'a permis de développer des compétences en <span class="text-peach">C</span>, <span class="text-blue">SQL</span>, <span class="text-green">Java</span>, et <span class="text-yellow">administration réseau</span>.',
    'En dehors de l\'informatique, je développe un intérêt pour la <span class="text-lavender">philosophie</span> et la <span class="text-sky">photographie</span>.'
  ],
  skills: [
    {
      title: 'Programmation C',
      description: 'Développement bas niveau et systèmes embarqués',
      icon: 'mdi:language-c',
      bgColor: 'bg-peach'
    },
    {
      title: 'Base de données',
      description: 'Gestion et administration SQL',
      icon: 'mdi:database',
      bgColor: 'bg-blue'
    },
    {
      title: 'Réseau',
      description: 'Configuration et maintenance des infrastructures',
      icon: 'mdi:server-network',
      bgColor: 'bg-green'
    },
    {
      title: 'Systèmes Linux',
      description: 'Administration et optimisation de systèmes Linux',
      icon: 'mdi:linux',
      bgColor: 'bg-yellow'
    }
  ]
})

const timelineSectionData = ref({
  title: 'Mon parcours',
  timelineItems: [
    {
      year: 2015,
      title: 'Premier contact avec l\'informatique',
      description: 'Je développe un premier goût de l\'informatique grâce à mon père.'
    },
    {
      year: 2020,
      title: 'Débuts en programmation',
      description: 'Je commence la programmation avec en premier lieu Python, découvrant l\'univers du développement.'
    },
    {
      year: 2022,
      title: 'Exploration du bas niveau',
      description: 'J\'essaye des langages bas niveau grâce à mon intérêt pour Linux et les systèmes d\'exploitation.'
    },
    {
      year: 2023,
      title: 'Études supérieures',
      description: 'Je débute mes études supérieures et j\'apprends le Java ainsi que le PHP à l\'IUT de Montpellier.'
    }
  ]
})

const LazyTimelineSection = defineAsyncComponent(() => import('@/components/home/TimelineSection.vue'))

// Page meta
useHead({
  title: 'Alexis Robin | Portfolio',
  meta: [
    { name: 'description', content: 'Portfolio d\'Alexis Robin - Étudiant en informatique spécialisé en programmation bas niveau et systèmes embarqués' }
  ]
})
</script>