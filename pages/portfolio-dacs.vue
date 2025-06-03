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
            Compétences maîtrisées lors de ma formation en 2ème année de parcours DACS
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

    <!-- Apprentissages Critiques Section -->
    <section class="section-padding bg-base">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-6">
            Apprentissages Critiques validés
          </h2>
          <p class="text-lg text-subtext1 max-w-3xl mx-auto">
            Détail des apprentissages critiques (AC) de niveau 2 validés à travers mes projets et expériences
          </p>
        </div>

        <div class="space-y-16">
          <!-- AC par compétence -->
          <div 
            v-for="competence in apprentissagesCritiques" 
            :key="competence.id"
            class="max-w-5xl mx-auto"
          >
            <!-- Header de la compétence -->
            <div class="flex items-center mb-8">
              <div 
                class="w-14 h-14 rounded-xl flex items-center justify-center mr-4"
                :class="competence.iconBg"
              >
                <Icon :name="competence.icon" class="w-7 h-7" :class="competence.iconColor" />
              </div>
              <h3 class="text-2xl font-bold text-text">{{ competence.title }}</h3>
            </div>

            <!-- Grille des AC -->
            <div class="grid gap-6">
              <div 
                v-for="(ac, index) in competence.acs" 
                :key="`${competence.id}-ac${index}`"
                class="group relative overflow-hidden"
              >
                <div class="p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg"
                     :class="`border-${competence.color}/30 bg-${competence.color}/5 hover:bg-${competence.color}/10`">
                  <!-- AC Title -->
                  <div class="flex items-start mb-4">
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm mr-4"
                          :class="`bg-${competence.color}/20 text-${competence.color}`">
                      AC{{ index + 1 }}
                    </span>
                    <h4 class="font-semibold text-text flex-1">{{ ac.title }}</h4>
                  </div>
                  
                  <!-- Justification -->
                  <div class="pl-14">
                    <p class="text-subtext1 text-sm leading-relaxed mb-4">{{ ac.justification }}</p>
                    
                    <!-- Exemples concrets -->
                    <div class="space-y-2">
                      <div 
                        v-for="exemple in ac.exemples" 
                        :key="exemple"
                        class="flex items-start text-sm"
                      >
                        <Icon name="heroicons:arrow-right" :class="`text-${competence.color} mt-0.5 mr-2 flex-shrink-0`" class="w-4 h-4" />
                        <span class="text-subtext0">{{ exemple }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Hover effect -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div class="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl"
                       :class="`bg-${competence.color}/10`"></div>
                </div>
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

const apprentissagesCritiques = ref([
  {
    id: 'optimiser-ac',
    title: 'Compétence Optimiser',
    icon: 'heroicons:cog-6-tooth',
    color: 'peach',
    iconBg: 'bg-peach/20',
    iconColor: 'text-peach',
    acs: [
      {
        title: 'Choisir des structures de données complexes adaptées au problème',
        justification: 'Dans l\'application de vote, j\'ai sélectionné des structures cryptographiques complexes comme El Gamal pour garantir la sécurité. J\'ai également optimisé les requêtes SQL avec des index et des jointures efficaces pour améliorer les performances.',
        exemples: [
          'Structures cryptographiques El Gamal pour le vote sécurisé',
          'Optimisation des requêtes SQL complexes avec indexation stratégique',
          'Choix de structures de données adaptées aux contraintes de performance'
        ]
      },
      {
        title: 'Utiliser des techniques algorithmiques adaptées pour des problèmes complexes',
        justification: 'J\'ai réalisé une analyse comparative approfondie entre les algorithmes cryptographiques El Gamal et RSA, en évaluant leurs propriétés mathématiques avec des preuves DDH (Decisional Diffie-Hellman).',
        exemples: [
          'Analyse comparative El Gamal vs RSA pour la cryptographie',
          'Implémentation de preuves mathématiques DDH',
          'Sélection d\'algorithmes selon les contraintes de sécurité'
        ]
      },
      {
        title: 'Comprendre les enjeux et moyens de sécurisation des données et du code',
        justification: 'L\'application de vote intègre une sécurité cryptographique complète avec preuve DDH. J\'ai mis en place un système de stockage sécurisé pour les votes chiffrés, garantissant la confidentialité et l\'intégrité des données.',
        exemples: [
          'Implémentation de la preuve DDH pour la sécurité cryptographique',
          'Stockage sécurisé des votes avec chiffrement homomorphe',
          'Protection contre les attaques par analyse des temps d\'exécution'
        ]
      },
      {
        title: 'Évaluer l\'impact environnemental et sociétal des solutions proposées',
        justification: 'J\'ai sélectionné des architectures logicielles en considérant leur efficacité énergétique et leur maintenabilité. Le choix de Spring Boot a été fait en évaluant son empreinte mémoire et ses performances.',
        exemples: [
          'Choix d\'architectures selon les contraintes énergétiques',
          'Sélection de Spring Boot pour son efficacité',
          'Évaluation de l\'impact des choix technologiques'
        ]
      }
    ]
  },
  {
    id: 'gerer-ac',
    title: 'Compétence Gérer',
    icon: 'heroicons:circle-stack',
    color: 'green',
    iconBg: 'bg-green/20',
    iconColor: 'text-green',
    acs: [
      {
        title: 'Optimiser les modèles de données de l\'entreprise',
        justification: 'J\'ai conçu des schémas relationnels optimisés pour des applications métier complexes. Dans le projet médiathèque, j\'ai modélisé efficacement les relations entre utilisateurs, livres et emprunts.',
        exemples: [
          'Conception de schémas relationnels pour applications métier',
          'Modélisation optimisée pour la médiathèque (utilisateurs, livres, emprunts)',
          'Normalisation des bases de données jusqu\'à la 3NF'
        ]
      },
      {
        title: 'Assurer la confidentialité des données (intégrité et sécurité)',
        justification: 'Dans l\'application de vote, j\'ai implémenté un système complet de chiffrement pour le stockage des utilisateurs et des votes. La gestion des accès et l\'authentification garantissent la confidentialité.',
        exemples: [
          'Stockage des votes avec chiffrement homomorphe',
          'Système d\'authentification multi-facteurs',
          'Gestion fine des droits d\'accès par rôles'
        ]
      },
      {
        title: 'Organiser la restitution de données à travers la programmation et la visualisation',
        justification: 'J\'ai développé une intégration complète entre les bases de données et les applications Java/Spring, avec mise en place de contraintes d\'intégrité et de politiques de sécurité strictes.',
        exemples: [
          'Intégration complète base de données avec Spring Boot',
          'API REST pour la restitution des données',
          'Tableaux de bord pour la visualisation des statistiques'
        ]
      },
      {
        title: 'Manipuler des données hétérogènes',
        justification: 'Le projet médiathèque m\'a permis de gérer différents types de données : utilisateurs, catalogues de livres, historiques d\'emprunts, chacun avec ses spécificités et contraintes.',
        exemples: [
          'Gestion de différents types de données structurées',
          'Traitement et modification d\'images dans les applications',
          'Traitement de formats hétérogènes (JSON, XML, CSV)'
        ]
      }
    ]
  },
  {
    id: 'conduire-ac',
    title: 'Compétence Conduire',
    icon: 'heroicons:users',
    color: 'blue',
    iconBg: 'bg-blue/20',
    iconColor: 'text-blue',
    acs: [
      {
        title: 'Identifier les processus présents dans une organisation en vue d\'améliorer les systèmes d\'information',
        justification: 'Lors de mon stage professionnel, j\'ai analysé et documenté les processus de l\'entreprise pour proposer des améliorations. J\'ai appliqué une approche méthodique pour comprendre les flux de travail existants.',
        exemples: [
          'Analyse des processus métier durant le stage',
          'Documentation des workflows existants',
          'Proposition d\'améliorations des systèmes'
        ]
      },
      {
        title: 'Formaliser les besoins du client et de l\'utilisateur',
        justification: 'J\'ai développé une expertise dans la gestion des besoins clients, avec une adaptation constante aux retours utilisateurs. Cette compétence s\'est affinée à travers tous mes projets universitaires.',
        exemples: [
          'Rédaction de cahiers des charges détaillés',
          'Sessions de recueil des besoins utilisateurs',
          'Adaptation itérative selon les retours'
        ]
      },
      {
        title: 'Identifier les critères de faisabilité d\'un projet informatique',
        justification: 'J\'ai appliqué des méthodologies agiles pour évaluer la faisabilité des projets. La communication en équipe pluridisciplinaire m\'a permis d\'identifier les contraintes techniques et organisationnelles.',
        exemples: [
          'Évaluation des contraintes techniques et budgétaires',
          'Analyse de faisabilité avec méthodologies agiles',
          'Estimation des charges et planification réaliste'
        ]
      },
      {
        title: 'Définir et mettre en œuvre une démarche de suivi de projet',
        justification: 'La collaboration étroite en équipe sur l\'ensemble des projets universitaires m\'a permis de maîtriser le suivi de projet. J\'ai géré efficacement les retours clients et les ajustements nécessaires.',
        exemples: [
          'Mise en place d\'outils de suivi de projet structurés',
          'Organisation de réunions de sprint hebdomadaires',
          'Gestion des livrables et du versioning avec Git'
        ]
      }
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
  description: 'Portfolio d\'apprentissage - Compétences maîtrisées en 2ème année : Optimiser, Gérer, Conduire',
  ogTitle: 'Portfolio d\'apprentissage - Alexis Robin',
  ogDescription: 'Portfolio d\'apprentissage - Compétences maîtrisées en 2ème année : Optimiser, Gérer, Conduire',
})
</script>