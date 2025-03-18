<template>
  <div :class="mobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-6'">
    <NavLink
      v-for="item in navigationItems"
      :key="item.path"
      :to="item.path"
      :icon="item.icon"
      :label="item.label"
      :mobile="mobile"
      @click="mobile && $emit('navigate')"
    />
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  mobile: {
    type: Boolean,
    default: false
  }
});

// Events
defineEmits(['navigate']);

// Navigation items
const navigationItems = [
  {
    path: '/',
    label: 'Accueil',
    icon: 'heroicons:home'
  },
  {
    path: '/projects',
    label: 'Projets',
    icon: 'heroicons:code-bracket'
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: 'heroicons:envelope'
  }
];
</script>