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
        <ProjectsList />
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="bg-mantle py-16">
      <div class="container-custom text-center">
        <div class="glass-card max-w-3xl mx-auto p-8 md:p-12">
          <h2 class="mb-4">Intéressé par mon travail ?</h2>
          <p class="text-lg mb-6">
            N'hésitez pas à me contacter pour discuter de projets ou pour en savoir plus sur mon parcours.
          </p>
          <Button 
            to="/contact" 
            variant="primary" 
            size="lg" 
            iconRight="heroicons:envelope"
          >
            Me contacter
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Projets | Alexis Robin',
  meta: [
    { name: 'description', content: 'Découvrez les projets d\'Alexis Robin - Systèmes embarqués, programmation bas niveau et administration réseau' }
  ]
})
</script>