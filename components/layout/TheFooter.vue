<template>
  <footer class="bg-mantle border-t border-surface0 py-component-padding-md">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center mb-gap-md md:mb-0">
          <span class="text-sm text-subtext1">© {{ currentYear }} Alexis Robin</span>
        </div>
        
        <div class="flex gap-gap-md">
          <a
            v-if="props.socialLinks.linkedin"
            :href="props.socialLinks.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-subtext1 hover:text-mauve transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Icon name="mdi:linkedin" class="w-5 h-5" />
          </a>
          <a
            v-if="props.socialLinks.email"
            :href="props.socialLinks.email"
            class="text-subtext1 hover:text-mauve transition-colors duration-300"
            aria-label="Email"
          >
            <Icon name="heroicons:envelope" class="w-5 h-5" />
          </a>
          <a
            v-if="props.socialLinks.phone"
            :href="props.socialLinks.phone"
            class="text-subtext1 hover:text-mauve transition-colors duration-300"
            aria-label="Téléphone"
          >
            <Icon name="heroicons:phone" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterProps {
  socialLinks: {
    linkedin?: string;
    email?: string;
    phone?: string;
  };
}

const props = withDefaults(defineProps<FooterProps>(), {
  socialLinks: () => ({
    linkedin: 'https://linkedin.com/in/alexis-robin-41703a2ab',
    email: 'mailto:alexis.robin@etu.umontpellier.fr',
    phone: 'tel:+33761460496'
  })
});

// Current year for copyright
const currentYear = new Date().getFullYear();
</script>