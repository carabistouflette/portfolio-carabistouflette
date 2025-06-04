<template>
  <nav 
    ref="navRef"
    aria-label="Main navigation" 
    :class="mobile ? 'flex flex-col space-y-4' : 'nav-desktop flex items-center space-x-6 relative'"
  >
    <!-- Indicateur animé pour desktop -->
    <span 
      v-if="!mobile && indicatorStyle"
      class="nav-indicator"
      :style="indicatorStyle"
    />
    
    <NavLink
      v-for="(item, index) in navigationItems"
      :key="item.path"
      :ref="el => setNavLinkRef(index, el)"
      :to="item.path"
      :icon="item.icon"
      :label="item.label"
      :color="item.color"
      :mobile="mobile"
      @click="mobile && $emit('navigate')"
      @mouseenter="!mobile && updateHoverIndex(index)"
      @mouseleave="!mobile && updateHoverIndex(null)"
    />
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { colors } from '~/constants/colors';

// Props
const props = defineProps({
  mobile: {
    type: Boolean,
    default: false
  }
});

// Events
defineEmits(['navigate']);

// State
const route = useRoute();
const navRef = ref<HTMLElement>();
const navLinkRefs = ref<(InstanceType<typeof NavLink> | null)[]>([]);
const activeIndex = ref<number | null>(null);
const hoverIndex = ref<number | null>(null);
const indicatorStyle = ref<Record<string, string> | null>(null);

// Navigation items avec couleurs spécifiques
const navigationItems = [
  {
    path: '/',
    label: 'Accueil',
    icon: 'heroicons:home',
    color: 'mauve' as const
  },
  {
    path: '/projects',
    label: 'Projets',
    icon: 'heroicons:code-bracket',
    color: 'blue' as const
  },
  {
    path: '/portfolio-apprentissage',
    label: 'Portfolio d\'apprentissage',
    icon: 'heroicons:academic-cap',
    color: 'peach' as const
  },
  {
    path: '/github',
    label: 'GitHub',
    icon: 'mdi:github',
    color: 'green' as const
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: 'heroicons:envelope',
    color: 'lavender' as const
  }
];

// Refs management
const setNavLinkRef = (index: number, el: InstanceType<typeof NavLink> | null) => {
  navLinkRefs.value[index] = el;
};

// Hover management
const updateHoverIndex = (index: number | null) => {
  hoverIndex.value = index;
};

// Find active index based on route
const findActiveIndex = () => {
  return navigationItems.findIndex(item => {
    if (item.path === '/') {
      return route.path === '/';
    }
    return route.path.startsWith(item.path);
  });
};

// Update indicator position
const updateIndicator = async () => {
  if (props.mobile) return;
  
  await nextTick();
  
  const targetIndex = hoverIndex.value !== null ? hoverIndex.value : activeIndex.value;
  
  if (targetIndex === null || !navLinkRefs.value[targetIndex]) {
    indicatorStyle.value = null;
    return;
  }
  
  const linkEl = navLinkRefs.value[targetIndex]?.$el;
  if (!linkEl) return;
  
  const navEl = navRef.value;
  if (!navEl) return;
  
  const linkRect = linkEl.getBoundingClientRect();
  const navRect = navEl.getBoundingClientRect();
  
  const left = linkRect.left - navRect.left;
  const width = linkRect.width;
  const color = navigationItems[targetIndex].color;
  
  indicatorStyle.value = {
    transform: `translateX(${left}px)`,
    width: `${width}px`,
    backgroundColor: colors[color],
    opacity: hoverIndex.value !== null ? '0.8' : '1'
  };
};

// Watch route changes
watch(() => route.path, () => {
  activeIndex.value = findActiveIndex();
  updateIndicator();
}, { immediate: true });

// Watch hover changes
watch(hoverIndex, () => {
  updateIndicator();
});

// Handle resize
let resizeObserver: globalThis.ResizeObserver | null = null;

onMounted(() => {
  activeIndex.value = findActiveIndex();
  updateIndicator();
  
  // Observe nav for size changes
  if (navRef.value && !props.mobile && typeof globalThis.ResizeObserver !== 'undefined') {
    resizeObserver = new globalThis.ResizeObserver(() => {
      updateIndicator();
    });
    resizeObserver.observe(navRef.value);
  }
  
  // Listen for window resize
  window.addEventListener('resize', updateIndicator);
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', updateIndicator);
});
</script>

<style scoped>
/* Navigation desktop styles */
.nav-desktop {
  position: relative;
}

/* Indicateur animé */
.nav-indicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: var(--mauve);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border-radius: 1px;
  box-shadow: 0 0 8px currentColor;
}

/* Animation d'entrée */
@keyframes indicatorEntry {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

.nav-indicator {
  animation: indicatorEntry 0.6s ease-out;
}

</style>