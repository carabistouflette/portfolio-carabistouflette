<template>
  <section class="section-padding">
    <div class="container-custom">
      <div class="mb-12 text-center">
        <h2 class="mb-4 animate-slide-up">Mon parcours</h2>
        <div class="w-24 h-1 bg-mauve mx-auto rounded-full"></div>
      </div>
      
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-surface2 rounded-full"></div>
        
        <!-- Timeline items -->
        <div class="space-y-12">
          <div 
            v-for="(item, index) in timelineItems"
            :key="item.year"
            class="relative"
          >
            <!-- Timeline item -->
            <div 
              class="flex flex-col md:flex-row items-center"
              :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <!-- Year marker -->
              <div class="mb-8 md:mb-0 md:w-1/2 flex justify-center">
                <div 
                  class="bg-mauve text-base px-6 py-2 rounded-full font-bold text-xl shadow-lg animate-fade-in"
                  :style="{ animationDelay: `${index * 0.2}s` }"
                >
                  {{ item.year }}
                </div>
              </div>
              
              <!-- Content -->
              <div class="relative md:w-1/2">
                <!-- Connector dot -->
                <div class="absolute top-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-5 h-5 bg-mauve rounded-full border-4 border-base"></div>
                
                <!-- Content card -->
                <Card 
                  class="max-w-md mx-auto md:mx-0 md:ml-8"
                  :class="index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'"
                  :glass="true"
                >
                  <template #header>
                    <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
                  </template>
                  <p>{{ item.description }}</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Timeline data
const timelineItems = [
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
</script>