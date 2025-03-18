// Import des composants UI
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import NavLink from '../components/ui/NavLink.vue'

// Import des composants de layout
import TheHeader from '../components/layout/TheHeader.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import TheNavigation from '../components/layout/TheNavigation.vue'

// Import des composants spécifiques
import HeroBanner from '../components/home/HeroBanner.vue'
import AboutSection from '../components/home/AboutSection.vue'
import TimelineSection from '../components/home/TimelineSection.vue'
import ProjectCard from '../components/projects/ProjectCard.vue'
import ProjectsList from '../components/projects/ProjectsList.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import ContactInfo from '../components/contact/ContactInfo.vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Enregistrement des composants UI
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('Card', Card)
  nuxtApp.vueApp.component('NavLink', NavLink)
  
  // Enregistrement des composants de layout
  nuxtApp.vueApp.component('TheHeader', TheHeader)
  nuxtApp.vueApp.component('TheFooter', TheFooter)
  nuxtApp.vueApp.component('TheNavigation', TheNavigation)
  
  // Enregistrement des composants spécifiques
  nuxtApp.vueApp.component('HeroBanner', HeroBanner)
  nuxtApp.vueApp.component('AboutSection', AboutSection)
  nuxtApp.vueApp.component('TimelineSection', TimelineSection)
  nuxtApp.vueApp.component('ProjectCard', ProjectCard)
  nuxtApp.vueApp.component('ProjectsList', ProjectsList)
  nuxtApp.vueApp.component('ContactForm', ContactForm)
  nuxtApp.vueApp.component('ContactInfo', ContactInfo)
})