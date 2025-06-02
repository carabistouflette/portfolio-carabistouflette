<template>
  <div ref="pageWrapperRef" class="relative overflow-hidden">
    <!-- Background parallax layers -->
    <div class="fixed inset-0 pointer-events-none">
      <div 
        ref="bgLayer1"
        class="absolute inset-0 opacity-20"
        :style="{ transform: bgLayer1Transform }"
      >
        <div class="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-mauve/30 to-pink/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-blue/20 to-teal/20 rounded-full blur-3xl"></div>
      </div>
      <div 
        ref="bgLayer2"
        class="absolute inset-0 opacity-10"
        :style="{ transform: bgLayer2Transform }"
      >
        <div class="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-green/30 to-yellow/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-40 w-72 h-72 bg-gradient-to-br from-lavender/25 to-mauve/25 rounded-full blur-3xl"></div>
      </div>
    </div>
    
    <HeroBanner
      :title="'Alexis Robin'"
      :subtitle="'Développeur Full Stack & Passionné de Programmation'"
      :description="'Étudiant à l\'IUT informatique de Montpellier en parcours DACS, je suis un passionné de programmation bas niveau, de philosophie et de photographie.'"
      :primary-button="{ to: '/projects', text: 'Découvrir mes projets', iconRight: 'heroicons:arrow-right' }"
      :profile-image="'/profile-logo.svg'"
    />
    
    <div ref="aboutRef" class="relative">
      <AboutSection
        :title="aboutSectionData.title"
        :about-text="aboutSectionData.aboutText"
        :skills="aboutSectionData.skills"
      />
    </div>
    
    <div ref="timelineRef" class="relative">
      <TimelineSection
        :title="timelineSectionData.title"
        :timeline-items="timelineSectionData.timelineItems"
      />
    </div>
    
    <section ref="ctaRef" class="section-padding bg-mantle relative">
      <div class="container-custom text-center relative z-10">
        <h2 class="mb-6 animate-slide-up !text-3xl md:!text-4xl">Envie de voir mes projets ?</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto">
          Découvrez mes réalisations en programmation, développement web et plus encore.
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
      <!-- Floating elements with parallax -->
      <div 
        class="absolute inset-0 pointer-events-none overflow-hidden"
        :style="{ transform: ctaParallaxTransform }"
      >
        <div class="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-mauve/20 to-pink/20 rounded-lg rotate-12 blur-sm"></div>
        <div class="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-blue/20 to-teal/20 rounded-full blur-sm"></div>
        <div class="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-green/15 to-yellow/15 rounded-lg -rotate-6 blur-sm"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"> // Changed to lang="ts" for better type checking
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { scroll, animate } from 'motion'
import { colors } from '@/constants/colors' // Import colors
import { useSeoMeta, useHead } from '#imports'
import { useParallax } from '~/composables/useParallax'

const pageWrapperRef = ref<HTMLElement | null>(null)
const bgLayer1 = ref<HTMLElement | null>(null)
const bgLayer2 = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

// Parallax effects
const { transform: bgLayer1Transform } = useParallax(bgLayer1, { speed: 0.3 })
const { transform: bgLayer2Transform } = useParallax(bgLayer2, { speed: 0.5 })
const { transform: ctaParallaxTransform } = useParallax(ctaRef, { speed: 0.2, offset: -50 })

onMounted(() => {
  if (pageWrapperRef.value) {
    scroll(
      animate(pageWrapperRef.value, {
        // Transition background color based on scroll progress
        backgroundColor: [colors.base, colors.mantle]
      }),
      // Options for scroll(): target window, offset defines start/end points
      // Default offset is ["start start", "end end"], meaning animation plays
      // from when the top of the window hits the top of the document
      // to when the bottom of the window hits the bottom of the document.
      // This effectively maps the animation to the full scrollable range.
    )
  }
})

// Explicitly type refs for better DX, though Vue can often infer
const aboutSectionData = ref({
  title: 'À propos de moi',
  aboutText: [
    'Développeur <span class="text-peach">passionné</span> et <span class="text-green">créatif</span>, je suis étudiant à l\'IUT informatique de Montpellier en parcours DACS. Ma <span class="text-blue">curiosité insatiable</span> et mon <span class="text-lavender">esprit analytique</span> me poussent constamment à explorer de nouvelles technologies et à repousser les limites du possible.',
    'Reconnu pour ma <span class="text-yellow">rigueur</span>, mon <span class="text-sky">autonomie</span> et ma capacité à <span class="text-peach">résoudre des problèmes complexes</span>, j\'ai développé une expertise solide en <span class="text-green">Java</span>, <span class="text-blue">SQL</span>, <span class="text-lavender">Python</span>, et <span class="text-yellow">développement Full Stack</span>. Mon approche méthodique et mon souci du détail me permettent de concevoir des solutions élégantes et performantes.',
    'Au-delà du code, je cultive un <span class="text-lavender">esprit critique</span> nourri par ma passion pour la philosophie, et un <span class="text-sky">regard créatif</span> aiguisé par la photographie. Cette polyvalence enrichit ma vision du développement et me permet d\'apporter des perspectives innovantes à chaque projet.'
  ],
  skills: [
    {
      title: 'Programmation Java',
      description: 'Développement orienté objet, design patterns et applications robustes',
      icon: 'mdi:language-java',
      bgColor: 'bg-peach',
      level: 85
    },
    {
      title: 'Base de données',
      description: 'Conception, optimisation et administration de bases SQL/NoSQL',
      icon: 'mdi:database',
      bgColor: 'bg-blue',
      level: 80
    },
    {
      title: 'Développement Web',
      description: 'Applications modernes avec Vue.js, React et technologies Full Stack',
      icon: 'mdi:web',
      bgColor: 'bg-green',
      level: 90
    },
    {
      title: 'Systèmes Linux',
      description: 'Administration avancée, scripting Shell et optimisation système',
      icon: 'mdi:linux',
      bgColor: 'bg-yellow',
      level: 75
    }
  ]
})

const timelineSectionData = ref({
  title: 'Mon parcours',
  subtitle: 'Une passion pour la technologie qui ne cesse de grandir',
  timelineItems: [
    {
      year: 2015,
      title: 'Premier contact avec l\'informatique',
      description: 'Découverte du monde numérique grâce à mon père. Cette première approche a éveillé ma curiosité pour comprendre comment fonctionnent les ordinateurs et les logiciels.',
      icon: 'heroicons:computer-desktop',
      skills: ['Windows', 'Bureautique', 'Internet']
    },
    {
      year: 2020,
      title: 'Débuts en programmation',
      description: 'Apprentissage autodidacte de Python, mon premier langage de programmation. J\'ai rapidement été fasciné par la capacité de créer et d\'automatiser des tâches.',
      icon: 'mdi:language-python',
      skills: ['Python', 'Algorithmes', 'Git', 'VS Code']
    },
    {
      year: 2022,
      title: 'Exploration du bas niveau',
      description: 'Plongée dans les langages bas niveau comme C et Rust, motivé par mon intérêt pour Linux et les systèmes d\'exploitation. Cette période m\'a permis de comprendre les fondements de l\'informatique.',
      icon: 'mdi:chip',
      skills: ['C', 'Rust', 'Linux', 'Shell', 'Systèmes embarqués']
    },
    {
      year: 2023,
      title: 'Études supérieures en informatique',
      description: 'Début de mon parcours DACS à l\'IUT de Montpellier. Acquisition de compétences solides en Java, PHP, bases de données et méthodologies de développement professionnel.',
      icon: 'heroicons:academic-cap',
      skills: ['Java', 'PHP', 'SQL', 'UML', 'Agile', 'Docker']
    },
    {
      year: 2024,
      title: 'Développement Full Stack',
      description: 'Approfondissement des technologies web modernes et création de projets personnels. Maîtrise de frameworks comme Vue.js et développement d\'applications complètes.',
      icon: 'heroicons:code-bracket-square',
      skills: ['Vue.js', 'Node.js', 'TypeScript', 'Tailwind', 'PostgreSQL']
    }
  ]
})

// Import components directly
import TimelineSection from '@/components/home/TimelineSection.vue'

// Page meta
useSeoMeta({
  title: 'Accueil - Alexis Robin Portfolio',
  description: 'Portfolio d\'Alexis Robin, étudiant en informatique passionné par la programmation, le développement web et l\'administration système.',
  ogTitle: 'Accueil - Alexis Robin Portfolio',
  ogDescription: 'Portfolio d\'Alexis Robin, étudiant en informatique passionné par la programmation, le développement web et l\'administration système.',
})

// Schema.org Person
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Alexis Robin',
        url: 'https://portfolio-carabistouflette.pages.dev/', // Replace with actual deployed URL if different
        sameAs: [
          // Add links to social profiles like GitHub, LinkedIn, etc.
          // e.g., 'https://github.com/yourusername',
          // 'https://linkedin.com/in/yourprofile'
        ],
        jobTitle: 'Développeur Full Stack', // Extracted from subtitle
        description: 'Étudiant à l\'IUT informatique de Montpellier en parcours DACS, passionné de programmation bas niveau, de philosophie et de photographie.', // Extracted from HeroBanner description
        image: '/profile-logo.svg' // Extracted from HeroBanner profileImage
      })
    }
  ]
})
</script>