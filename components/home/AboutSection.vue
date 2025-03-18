<template>
  <section class="section-padding bg-mantle">
    <div class="container-custom">
      <div class="mb-12 text-center">
        <h2 class="mb-4 animate-slide-up">À propos de moi</h2>
        <div class="w-24 h-1 bg-mauve mx-auto rounded-full"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- About text -->
        <div class="space-y-6 animate-slide-right">
          <p class="text-lg">
            Étudiant à l'IUT informatique de Montpellier en parcours DACS, je suis passionné par la programmation bas niveau 
            et les systèmes embarqués.
          </p>
          <p>
            Mon parcours m'a permis de développer des compétences en <span class="text-peach">C</span>, 
            <span class="text-blue">SQL</span>, <span class="text-green">Java</span>, et 
            <span class="text-yellow">administration réseau</span>.
          </p>
          <p>
            En dehors de l'informatique, je développe un intérêt pour la <span class="text-lavender">philosophie</span> 
            et la <span class="text-sky">photographie</span>.
          </p>
          
          <div class="pt-4">
            <Button to="/contact" variant="outline" iconRight="heroicons:arrow-right">
              En savoir plus
            </Button>
          </div>
        </div>
        
        <!-- Skills cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-left">
          <Card v-for="skill in skills" :key="skill.title" glass hover>
            <template #header>
              <div class="flex items-center space-x-4">
                <div 
                  class="w-12 h-12 rounded-lg flex items-center justify-center"
                  :class="skill.bgColor"
                >
                  <NuxtIcon :name="skill.icon" class="w-6 h-6 text-base" />
                </div>
                <h3 class="text-xl font-semibold">{{ skill.title }}</h3>
              </div>
            </template>
            <p>{{ skill.description }}</p>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Skills data
const skills = [
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
</script>