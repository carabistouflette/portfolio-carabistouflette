<template>
  <div class="min-h-screen bg-base">
    <!-- Hero Section -->
    <section class="section-padding bg-gradient-to-br from-base to-mantle relative overflow-hidden">
      <div class="container-custom relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-mauve to-pink bg-clip-text text-transparent">
            Portfolio d'apprentissage
          </h1>
          <p class="text-xl text-subtext1 mb-8">
            Compétences maîtrisées lors de ma formation en 3ème année de parcours DACS
          </p>
          <div class="inline-flex items-center px-6 py-3 bg-mauve/10 border border-mauve/30 rounded-full">
            <Icon name="heroicons:academic-cap" class="w-6 h-6 mr-3 text-mauve" />
            <span class="text-mauve font-semibold">
              Niveau 2 - Compétences validées
            </span>
          </div>
        </div>
      </div>
      
      <!-- Background decorations -->
      <div class="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-mauve/20 to-pink/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue/10 to-teal/10 rounded-full blur-3xl"></div>
    </section>

    <!-- Skills Grid -->
    <section class="section-padding bg-surface0 relative">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div 
            v-for="(skill, index) in skills" 
            :key="skill.id"
            ref="skillCards"
            class="group relative p-8 rounded-3xl border border-overlay0 bg-mantle hover:border-overlay1 transition-all duration-500 hover:scale-105"
            @mouseenter="handleHover(index)"
            @mouseleave="handleLeave(index)"
          >
            <!-- Skill header -->
            <div class="text-center mb-8">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                :class="skill.iconBg"
              >
                <Icon :name="skill.icon" class="w-10 h-10" :class="skill.iconColor" />
              </div>
              <h3 class="text-2xl font-bold text-text mb-2">{{ skill.title }}</h3>
              <span 
                class="text-sm px-4 py-2 rounded-full font-medium"
                :class="skill.badgeClass"
              >
                {{ skill.level }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-subtext1 mb-8 leading-relaxed text-center">{{ skill.description }}</p>

            <!-- Project examples -->
            <div class="space-y-4">
              <h4 class="text-sm font-semibold text-text uppercase tracking-wider text-center mb-6">
                Exemples concrets
              </h4>
              <div class="space-y-4">
                <div 
                  v-for="example in skill.examples" 
                  :key="example"
                  class="flex items-start text-sm text-subtext1 p-4 rounded-xl bg-surface0/50"
                >
                  <Icon name="heroicons:check-circle" :class="skill.checkColor" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>{{ example }}</span>
                </div>
              </div>
            </div>

            <!-- Animated gradient border -->
            <div 
              class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              :class="skill.gradientBorder"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed breakdown -->
    <section class="section-padding bg-mantle">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-6">
            Détail des compétences acquises
          </h2>
          <p class="text-lg text-subtext1 max-w-3xl mx-auto">
            Contexte et projets qui ont permis la validation de ces compétences
          </p>
        </div>

        <div class="space-y-12 max-w-4xl mx-auto">
          <div 
            v-for="detail in skillDetails" 
            :key="detail.id"
            class="p-8 rounded-2xl border border-overlay0 bg-surface0/30"
          >
            <div class="flex items-start mb-6">
              <div 
                class="w-16 h-16 rounded-xl flex items-center justify-center mr-6"
                :class="detail.iconBg"
              >
                <Icon :name="detail.icon" class="w-8 h-8" :class="detail.iconColor" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-text mb-2">{{ detail.title }}</h3>
                <p class="text-subtext1">{{ detail.subtitle }}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-text mb-3">Contexte d'apprentissage</h4>
                <p class="text-subtext1 text-sm leading-relaxed">{{ detail.context }}</p>
              </div>
              <div>
                <h4 class="font-semibold text-text mb-3">Compétences développées</h4>
                <ul class="space-y-2">
                  <li 
                    v-for="competence in detail.competences" 
                    :key="competence"
                    class="flex items-center text-sm text-subtext1"
                  >
                    <Icon name="heroicons:star" :class="detail.starColor" class="w-4 h-4 mr-2" />
                    {{ competence }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { animate } from 'motion'

const skillCards = ref<HTMLElement[]>([])

const skills = ref([
  {
    id: 'optimiser',
    title: 'Optimiser',
    level: 'Niveau 2 - Maîtrisé',
    description: 'Sélectionner les algorithmes adéquats pour répondre à un problème donné',
    icon: 'heroicons:cog-6-tooth',
    iconBg: 'bg-peach/20',
    iconColor: 'text-peach',
    badgeClass: 'bg-peach/20 text-peach border border-peach/30',
    gradientBorder: 'bg-gradient-to-br from-peach/30 to-red/30',
    checkColor: 'text-peach',
    examples: [
      'Application de vote en ligne : choix El Gamal avec preuve DDH pour la sécurité cryptographique',
      'Sélection de technologies adaptées comme Spring Boot pour l\'architecture backend',
      'Optimisation des requêtes SQL complexes avec index et jointures efficaces'
    ]
  },
  {
    id: 'gerer',
    title: 'Gérer',
    level: 'Niveau 2 - Maîtrisé',
    description: 'Optimiser une base de données, intégrer avec une application et mettre en œuvre la sécurité',
    icon: 'heroicons:circle-stack',
    iconBg: 'bg-green/20',
    iconColor: 'text-green',
    badgeClass: 'bg-green/20 text-green border border-green/30',
    gradientBorder: 'bg-gradient-to-br from-green/30 to-teal/30',
    checkColor: 'text-green',
    examples: [
      'SAE Application de vote sécurisé : stockage des utilisateurs et votes avec chiffrement',
      'SAE Site médiathèque : gestion des données utilisateurs, livres et emprunts',
      'Mise en place de contraintes d\'intégrité et politiques de sécurité'
    ]
  },
  {
    id: 'conduire',
    title: 'Conduire',
    level: 'Niveau 2 - Maîtrisé',
    description: 'Appliquer une démarche de suivi de projet en fonction des besoins métiers des clients et des utilisateurs',
    icon: 'heroicons:users',
    iconBg: 'bg-blue/20',
    iconColor: 'text-blue',
    badgeClass: 'bg-blue/20 text-blue border border-blue/30',
    gradientBorder: 'bg-gradient-to-br from-blue/30 to-sapphire/30',
    checkColor: 'text-blue',
    examples: [
      'Collaboration étroite en équipe sur l\'ensemble des projets universitaires',
      'Suivi de projet méthodique lors du stage professionnel en entreprise',
      'Gestion des besoins clients et adaptation aux retours utilisateurs'
    ]
  }
])

const skillDetails = ref([
  {
    id: 'optimiser-detail',
    title: 'Compétence Optimiser',
    subtitle: 'Choix algorithmiques et optimisation des performances',
    icon: 'heroicons:cog-6-tooth',
    iconBg: 'bg-peach/20',
    iconColor: 'text-peach',
    starColor: 'text-peach',
    context: 'Cette compétence a été particulièrement développée lors du projet d\'application de vote en ligne, où le choix de l\'algorithme El Gamal avec preuve DDH était crucial pour garantir la sécurité cryptographique. J\'ai également dû sélectionner les technologies appropriées comme Spring Boot pour l\'architecture.',
    competences: [
      'Analyse comparative d\'algorithmes cryptographiques (El Gamal vs RSA)',
      'Sélection de frameworks adaptés (Spring Boot, JPA/Hibernate)',
      'Évaluation de la sécurité avec preuves mathématiques (DDH)',
      'Choix d\'architectures logicielles selon les contraintes'
    ]
  },
  {
    id: 'gerer-detail',
    title: 'Compétence Gérer',
    subtitle: 'Gestion et optimisation des bases de données',
    icon: 'heroicons:circle-stack',
    iconBg: 'bg-green/20',
    iconColor: 'text-green',
    starColor: 'text-green',
    context: 'Développée à travers deux projets SAE majeurs : l\'application de vote sécurisé nécessitant le stockage sécurisé des utilisateurs et votes, et le site de médiathèque avec gestion des données bibliothécaires. Ces projets m\'ont permis de maîtriser la conception de bases de données relationnelles.',
    competences: [
      'Conception de schémas relationnels pour applications métier',
      'Intégration base de données avec applications Java/Spring',
      'Gestion des accès et authentification utilisateurs',
      'Stockage sécurisé de données sensibles (votes chiffrés)'
    ]
  },
  {
    id: 'conduire-detail',
    title: 'Compétence Conduire',
    subtitle: 'Suivi de projet et collaboration en équipe',
    icon: 'heroicons:users',
    iconBg: 'bg-blue/20',
    iconColor: 'text-blue',
    starColor: 'text-blue',
    context: 'Acquise grâce à une collaboration constante en équipe durant tous les projets universitaires et renforcée lors de mon stage professionnel où j\'ai dû m\'adapter aux processus d\'entreprise et aux besoins clients.',
    competences: [
      'Méthodologies agiles et suivi de projet',
      'Communication efficace en équipe pluridisciplinaire',
      'Adaptation aux besoins métiers évolutifs',
      'Gestion des retours clients et utilisateurs'
    ]
  }
])

const handleHover = (index: number) => {
  const card = skillCards.value[index]
  if (card) {
    animate(card, {
      y: -8,
      scale: 1.02
    }, {
      duration: 0.3,
      easing: 'ease-out'
    })
  }
}

const handleLeave = (index: number) => {
  const card = skillCards.value[index]
  if (card) {
    animate(card, {
      y: 0,
      scale: 1
    }, {
      duration: 0.3,
      easing: 'ease-out'
    })
  }
}

onMounted(() => {
  // Animate cards on scroll
  if (skillCards.value.length) {
    skillCards.value.forEach((card, index) => {
      animate(card, {
        opacity: [0, 1],
        y: [50, 0]
      }, {
        duration: 0.8,
        delay: index * 0.2,
        easing: 'ease-out'
      })
    })
  }
})

// Page meta
useSeoMeta({
  title: 'Portfolio d\'apprentissage - Alexis Robin',
  description: 'Portfolio d\'apprentissage - Compétences maîtrisées en 3ème année : Optimiser, Gérer, Conduire',
  ogTitle: 'Portfolio d\'apprentissage - Alexis Robin',
  ogDescription: 'Portfolio d\'apprentissage - Compétences maîtrisées en 3ème année : Optimiser, Gérer, Conduire',
})
</script>