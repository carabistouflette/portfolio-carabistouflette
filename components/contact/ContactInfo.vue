<template>
  <div class="space-y-8">
    <!-- Section title -->
    <div>
      <h3 class="text-2xl font-bold mb-2">Contactez-moi</h3>
      <p class="text-subtext0">
        N'hésitez pas à me contacter via le formulaire ou directement en utilisant l'une des méthodes ci-dessous.
      </p>
    </div>
    
    <!-- Contact items -->
    <div class="space-y-6">
      <div
        v-for="item in contactItems"
        :key="item.type"
        class="flex items-center p-4 bg-surface0/50 rounded-lg border border-surface1 transition-transform hover:translate-x-1"
      >
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center mr-4"
          :class="item.iconBg"
        >
          <Icon :name="item.icon" class="w-6 h-6 text-base" />
        </div>
        <div>
          <h4 class="font-medium text-text">{{ item.title }}</h4>
          <a
            :href="item.href"
            class="text-subtext0 hover:text-mauve transition-colors"
            :target="item.type === 'website' ? '_blank' : undefined"
            rel="noopener noreferrer"
          >
            {{ item.value }}
          </a>
        </div>
      </div>
    </div>
    
    <!-- Availability info -->
    <div class="bg-mauve/10 border border-mauve/20 rounded-lg p-5">
      <div class="flex items-center mb-3">
        <Icon name="heroicons:clock" class="w-5 h-5 mr-2 text-mauve" />
        <h4 class="font-medium">Disponibilité</h4>
      </div>
      <p class="text-subtext0">
        Je suis actuellement en alternance en systèmes embarqués et disponible pour des projets ponctuels.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Contact items
const contactItems = [
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
]
</script>