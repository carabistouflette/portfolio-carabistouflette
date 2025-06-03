<template>
  <div class="min-h-screen bg-base">
    <!-- Hero Section -->
    <section class="section-padding bg-gradient-to-br from-base to-mantle relative overflow-hidden">
      <div class="container-custom relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <h1 
            ref="heroTitle"
            class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-mauve to-pink bg-clip-text text-transparent"
          >
            Portfolio d'apprentissage
          </h1>
          <p 
            ref="heroSubtitle"
            class="text-xl text-subtext1 mb-8"
          >
            Compétences maîtrisées lors de ma formation en 2ème année de parcours DACS
          </p>
          <div 
            ref="heroBadge"
            class="inline-flex items-center px-6 py-3 bg-mauve/10 border border-mauve/30 rounded-full hover:bg-mauve/20 transition-all duration-300 cursor-pointer"
            @click="scrollToCompetences"
          >
            <Icon name="heroicons:academic-cap" class="w-6 h-6 mr-3 text-mauve animate-pulse" />
            <span class="text-mauve font-semibold">
              Niveau 2 - Compétences validées
            </span>
          </div>
        </div>
      </div>
      
      <!-- Background decorations animées -->
      <div ref="bgDecor1" class="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-mauve/20 to-pink/20 rounded-full blur-3xl"></div>
      <div ref="bgDecor2" class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue/10 to-teal/10 rounded-full blur-3xl"></div>
      
      <!-- Particules flottantes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          v-for="i in 5" 
          :key="`particle-${i}`"
          class="particle absolute w-2 h-2 bg-mauve/30 rounded-full"
          :style="{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }"
        ></div>
      </div>
    </section>

    <!-- Skills Grid -->
    <section class="section-padding bg-surface0 relative">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div 
            v-for="(skill, index) in skills" 
            :key="skill.id"
            ref="skillCards"
            class="skill-card group relative p-8 rounded-3xl border border-overlay0 bg-mantle hover:border-overlay1 transition-all duration-500 hover:scale-105 cursor-pointer"
            :data-index="index"
            @mouseenter="handleHover(index)"
            @mouseleave="handleLeave(index)"
            @click="toggleSkillDetails(skill.id)"
          >
            <!-- Skill header -->
            <div class="text-center mb-8">
              <div 
                class="skill-icon w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                :class="skill.iconBg"
              >
                <Icon :name="skill.icon" class="w-10 h-10 transition-transform duration-300 group-hover:scale-125" :class="skill.iconColor" />
              </div>
              <h3 class="text-2xl font-bold text-text mb-2">{{ skill.title }}</h3>
              <span 
                class="text-sm px-4 py-2 rounded-full font-medium transition-all duration-300 group-hover:shadow-lg"
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
            
            <!-- Pulse effect on hover -->
            <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none">
              <div class="absolute inset-0 rounded-3xl animate-ping" :class="`bg-${skill.color}/10`"></div>
            </div>
            
            <!-- Click indicator -->
            <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Icon name="heroicons:arrow-right-circle" class="w-6 h-6" :class="skill.iconColor" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed breakdown -->
    <section ref="skillDetailsSection" class="section-padding bg-mantle">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 
            ref="detailsTitle"
            class="text-3xl md:text-4xl font-bold text-text mb-6"
          >
            Détail des compétences acquises
          </h2>
          <p 
            ref="detailsSubtitle"
            class="text-lg text-subtext1 max-w-3xl mx-auto"
          >
            Contexte et projets qui ont permis la validation de ces compétences
          </p>
        </div>

        <div class="space-y-12 max-w-4xl mx-auto">
          <div 
            v-for="(detail, index) in skillDetails" 
            :key="detail.id"
            ref="detailCards"
            class="detail-card p-8 rounded-2xl border border-overlay0 bg-surface0/30 hover:bg-surface0/50 transition-all duration-300"
            :data-index="index"
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
    <section ref="acSection" class="section-padding bg-base">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 
            ref="acTitle"
            class="text-3xl md:text-4xl font-bold text-text mb-6"
          >
            Apprentissages Critiques validés
          </h2>
          <p 
            ref="acSubtitle"
            class="text-lg text-subtext1 max-w-3xl mx-auto"
          >
            Détail des apprentissages critiques (AC) de niveau 2 validés à travers mes projets et expériences
          </p>
        </div>

        <div class="space-y-16">
          <!-- AC par compétence -->
          <div 
            v-for="(competence, compIndex) in apprentissagesCritiques" 
            :key="competence.id"
            ref="acCompetences"
            class="competence-section max-w-5xl mx-auto"
            :data-index="compIndex"
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
                class="ac-card group relative overflow-hidden transform transition-all duration-300 hover:-translate-y-1"
                :data-ac-index="index"
              >
                <div class="p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl cursor-pointer"
                     :class="`border-${competence.color}/30 bg-${competence.color}/5 hover:bg-${competence.color}/10`"
                     @click="toggleAcDetails(competence.id, index)">
                  <!-- AC Title -->
                  <div class="flex items-start mb-4">
                    <span class="ac-number inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          :class="`bg-${competence.color}/20 text-${competence.color}`">
                      AC{{ index + 1 }}
                    </span>
                    <h4 class="font-semibold text-text flex-1 group-hover:text-text transition-colors duration-300">{{ ac.title }}</h4>
                  </div>
                  
                  <!-- Justification -->
                  <div class="pl-14">
                    <Transition name="ac-content">
                      <div v-if="!collapsedAcs[`${competence.id}-${index}`]">
                        <p class="text-subtext1 text-sm leading-relaxed mb-4">{{ ac.justification }}</p>
                        
                        <!-- Exemples concrets -->
                        <div class="space-y-2">
                          <div 
                            v-for="(exemple, exIndex) in ac.exemples" 
                            :key="exemple"
                            class="exemple-item flex items-start text-sm"
                            :style="{ animationDelay: `${exIndex * 100}ms` }"
                          >
                            <Icon name="heroicons:arrow-right" :class="`text-${competence.color} mt-0.5 mr-2 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1`" class="w-4 h-4" />
                            <span class="text-subtext0">{{ exemple }}</span>
                          </div>
                        </div>
                      </div>
                    </Transition>
                    
                    <!-- Toggle indicator -->
                    <div class="mt-4 flex items-center text-xs" :class="`text-${competence.color}`">
                      <Icon 
                        :name="collapsedAcs[`${competence.id}-${index}`] ? 'heroicons:chevron-down' : 'heroicons:chevron-up'" 
                        class="w-4 h-4 mr-1 transition-transform duration-300"
                      />
                      <span>{{ collapsedAcs[`${competence.id}-${index}`] ? 'Voir plus' : 'Voir moins' }}</span>
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
import { ref, onMounted, watch, nextTick } from 'vue'
import { animate, stagger } from 'motion'
import { useIntersectionObserver } from '@vueuse/core'

// Refs pour les animations
const heroTitle = ref<HTMLElement>()
const heroSubtitle = ref<HTMLElement>()
const heroBadge = ref<HTMLElement>()
const bgDecor1 = ref<HTMLElement>()
const bgDecor2 = ref<HTMLElement>()
const skillCards = ref<HTMLElement[]>([])
const detailCards = ref<HTMLElement[]>([])
const detailsTitle = ref<HTMLElement>()
const detailsSubtitle = ref<HTMLElement>()
const skillDetailsSection = ref<HTMLElement>()
const acSection = ref<HTMLElement>()
const acTitle = ref<HTMLElement>()
const acSubtitle = ref<HTMLElement>()
const acCompetences = ref<HTMLElement[]>([])

// State pour l'interactivité
const collapsedAcs = ref<Record<string, boolean>>({})  
const expandedSkills = ref<Set<string>>(new Set())

// Flag pour savoir si les animations sont chargées
const animationsLoaded = ref(false)

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

// Fonction pour scroll vers les compétences
const scrollToCompetences = () => {
  skillDetailsSection.value?.scrollIntoView({ behavior: 'smooth' })
}

// Gestion des interactions  
const handleHover = (index: number) => {
  const card = skillCards.value[index]
  if (card) {
    animate(card, {
      y: -12,
      rotateY: 5,
      scale: 1.03
    }, {
      duration: 0.4,
      easing: 'ease-out'
    })
    
    // Animer l'icône
    const icon = card.querySelector('.skill-icon')
    if (icon) {
      animate(icon, {
        rotate: 360,
        scale: 1.1
      }, {
        duration: 0.6,
        easing: 'ease-out'
      })
    }
  }
}

const handleLeave = (index: number) => {
  const card = skillCards.value[index]
  if (card) {
    animate(card, {
      y: 0,
      rotateY: 0,
      scale: 1
    }, {
      duration: 0.4,
      easing: 'ease-out'
    })
    
    const icon = card.querySelector('.skill-icon')
    if (icon) {
      animate(icon, {
        rotate: 0,
        scale: 1
      }, {
        duration: 0.6,
        easing: 'ease-out'
      })
    }
  }
}

// Toggle des détails de compétences
const toggleSkillDetails = (skillId: string) => {
  if (expandedSkills.value.has(skillId)) {
    expandedSkills.value.delete(skillId)
  } else {
    expandedSkills.value.add(skillId)
  }
}

// Toggle des AC
const toggleAcDetails = (competenceId: string, acIndex: number) => {
  const key = `${competenceId}-${acIndex}`
  collapsedAcs.value[key] = !collapsedAcs.value[key]
}

// Animations d'entrée
const animateHeroSection = async () => {
  // Titre principal
  if (heroTitle.value) {
    await animate(heroTitle.value, {
      opacity: [0, 1],
      y: [30, 0],
      scale: [0.9, 1]
    }, {
      duration: 0.8,
      easing: 'ease-out'
    }).finished
  }
  
  // Sous-titre
  if (heroSubtitle.value) {
    await animate(heroSubtitle.value, {
      opacity: [0, 1],
      y: [20, 0]
    }, {
      duration: 0.6,
      delay: 0.2,
      easing: 'ease-out'
    }).finished
  }
  
  // Badge
  if (heroBadge.value) {
    animate(heroBadge.value, {
      opacity: [0, 1],
      scale: [0.8, 1]
    }, {
      duration: 0.5,
      delay: 0.4,
      easing: 'spring'
    })
  }
  
  // Décorations de fond
  if (bgDecor1.value && bgDecor2.value) {
    animate(bgDecor1.value, {
      scale: [0, 1],
      rotate: [0, 360]
    }, {
      duration: 20,
      repeat: Infinity,
      easing: 'linear'
    })
    
    animate(bgDecor2.value, {
      scale: [0, 1],
      rotate: [360, 0]
    }, {
      duration: 25,
      repeat: Infinity,
      easing: 'linear'
    })
  }
}

// Observer pour les animations au scroll
const setupIntersectionObservers = () => {
  // Cartes de compétences
  skillCards.value.forEach((card, index) => {
    const { stop } = useIntersectionObserver(card, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        animate(card, {
          opacity: [0, 1],
          y: [60, 0],
          scale: [0.8, 1]
        }, {
          duration: 0.6,
          delay: index * 0.15,
          easing: 'ease-out'
        })
        stop() // Stop observing after animation
      }
    }, { threshold: 0.1 })
  })
  
  // Section détails
  if (detailsTitle.value) {
    const { stop } = useIntersectionObserver(detailsTitle.value, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        animate(detailsTitle.value!, {
          opacity: [0, 1],
          y: [30, 0]
        }, {
          duration: 0.6,
          easing: 'ease-out'
        })
        stop()
      }
    }, { threshold: 0.1 })
  }
  
  if (detailsSubtitle.value) {
    const { stop } = useIntersectionObserver(detailsSubtitle.value, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        animate(detailsSubtitle.value!, {
          opacity: [0, 1],
          y: [20, 0]
        }, {
          duration: 0.6,
          delay: 0.2,
          easing: 'ease-out'
        })
        stop()
      }
    }, { threshold: 0.1 })
  }
  
  // Cartes de détails
  detailCards.value.forEach((card, index) => {
    const { stop } = useIntersectionObserver(card, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        animate(card, {
          opacity: [0, 1],
          x: [-50, 0]
        }, {
          duration: 0.6,
          delay: index * 0.1,
          easing: 'ease-out'
        })
        stop()
      }
    }, { threshold: 0.1 })
  })
  
  // Section AC
  if (acTitle.value) {
    const { stop } = useIntersectionObserver(acTitle.value, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        animate(acTitle.value!, {
          opacity: [0, 1],
          y: [30, 0]
        }, {
          duration: 0.6,
          easing: 'ease-out'
        })
        stop()
      }
    }, { threshold: 0.1 })
  }
  
  if (acSubtitle.value) {
    const { stop } = useIntersectionObserver(acSubtitle.value, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        animate(acSubtitle.value!, {
          opacity: [0, 1], 
          y: [20, 0]
        }, {
          duration: 0.6,
          delay: 0.2,
          easing: 'ease-out'
        })
        stop()
      }
    }, { threshold: 0.1 })
  }
  
  // Sections de compétences AC
  acCompetences.value.forEach((section, index) => {
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        animate(section, {
          opacity: [0, 1],
          y: [40, 0]
        }, {
          duration: 0.8,
          delay: index * 0.2,
          easing: 'ease-out'
        })
        
        // Animer les cartes AC à l'intérieur
        const acCards = section.querySelectorAll('.ac-card')
        acCards.forEach((card, cardIndex) => {
          animate(card as HTMLElement, {
            opacity: [0, 1],
            x: [-30, 0]
          }, {
            duration: 0.5,
            delay: index * 0.2 + cardIndex * 0.1,
            easing: 'ease-out'
          })
        })
        stop()
      }
    }, { threshold: 0.1 })
  })
}

onMounted(async () => {
  // Animations initiales
  await animateHeroSection()
  
  // Configuration des observers
  await nextTick()
  setupIntersectionObservers()
  
  // Marquer les animations comme chargées
  animationsLoaded.value = true
})

// Page meta
useSeoMeta({
  title: 'Portfolio d\'apprentissage - Alexis Robin',
  description: 'Portfolio d\'apprentissage - Compétences maîtrisées en 2ème année : Optimiser, Gérer, Conduire',
  ogTitle: 'Portfolio d\'apprentissage - Alexis Robin',
  ogDescription: 'Portfolio d\'apprentissage - Compétences maîtrisées en 2ème année : Optimiser, Gérer, Conduire',
})
</script>

<style scoped>
/* Animations des particules */
@keyframes float-particle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100px) rotate(720deg);
    opacity: 0;
  }
}

.particle {
  animation: float-particle 20s linear infinite;
}

/* Transitions pour les AC */
.ac-content-enter-active,
.ac-content-leave-active {
  transition: all 0.3s ease;
}

.ac-content-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.ac-content-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animation des exemples */
@keyframes slide-in-exemple {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.exemple-item {
  animation: slide-in-exemple 0.5s ease-out forwards;
}

/* Effet de brillance supprimé pour réduire la distraction visuelle */

/* Glow effect on hover */
.ac-card:hover {
  box-shadow: 0 0 30px rgba(var(--color-rgb), 0.15);
}

/* Fallback pour les éléments avec opacity 0 */
.skill-card,
.detail-card,
.competence-section,
.ac-card {
  opacity: 1 !important;
}

/* Smooth number rotation */
.ac-number {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Pulse animation pour le badge hero */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(var(--mauve-rgb), 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(var(--mauve-rgb), 0);
  }
}

.hero-badge:hover {
  animation: pulse-glow 2s infinite;
}
</style>