<template>
  <footer class="bg-mantle border-t border-surface0 py-6">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center mb-4 md:mb-0">
          <span class="text-sm text-subtext1">© {{ currentYear }} Alexis Robin</span>
        </div>
        
        <div class="flex space-x-4">
          <a
            href="https://linkedin.com/in/alexis-robin-41703a2ab"
            target="_blank"
            rel="noopener noreferrer"
            class="text-subtext1 hover:text-mauve transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <NuxtIcon name="mdi:linkedin" class="w-5 h-5" />
          </a>
          <a
            href="mailto:alexis.robin@etu.umontpellier.fr"
            class="text-subtext1 hover:text-mauve transition-colors duration-300"
            aria-label="Email"
          >
            <NuxtIcon name="heroicons:envelope" class="w-5 h-5" />
          </a>
          <a
            href="tel:+33761460496"
            class="text-subtext1 hover:text-mauve transition-colors duration-300"
            aria-label="Téléphone"
          >
            <NuxtIcon name="heroicons:phone" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Current year for copyright
const currentYear = new Date().getFullYear()
</script>