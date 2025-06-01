<template>
  <div ref="pageWrapperRef">
    <HeroBanner
      :title="'Alexis Robin'"
      :subtitle="'Développeur Full Stack & Passionné de Programmation'"
      :description="'Étudiant à l\'IUT informatique de Montpellier en parcours DACS, je suis un passionné de programmation bas niveau, de philosophie et de photographie.'"
      :primary-button="{ to: '/projects', text: 'Découvrir mes projets', iconRight: 'heroicons:arrow-right' }"
      :profile-image="'/profile-logo.svg'"
    />
    <AboutSection
      :title="aboutSectionData.title"
      :about-text="aboutSectionData.aboutText"
      :skills="aboutSectionData.skills"
    />
    <TimelineSection
      :title="timelineSectionData.title"
      :timeline-items="timelineSectionData.timelineItems"
    />
    <section class="section-padding bg-mantle">
      <div class="container-custom text-center">
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
    </section>
  </div>
</template>

<script setup lang="ts"> // Changed to lang="ts" for better type checking
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { scroll, animate } from 'motion'
import { colors } from '@/constants/colors' // Import colors
import { useSeoMeta, useHead } from '#imports'

const pageWrapperRef = ref<HTMLElement | null>(null)

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

// Import TimelineSection directly to test
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