<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <Icon v-if="iconLeft" :name="iconLeft" class="w-5 h-5 mr-2" />
    <span v-if="$slots.default"><slot /></span>
    <Icon v-if="iconRight" :name="iconRight" class="w-5 h-5 ml-2" />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <Icon v-if="iconLeft" :name="iconLeft" class="w-5 h-5 mr-2" />
    <span v-if="$slots.default"><slot /></span>
    <Icon v-if="iconRight" :name="iconRight" class="w-5 h-5 ml-2" />
  </button>
</template>

<script setup>
// Définition des propriétés
const props = defineProps({
  to: {
    type: String,
    default: undefined
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  iconLeft: {
    type: String,
    default: ''
  },
  iconRight: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});

// Gestion des événements
defineEmits(['click']);

// Classes de taille
const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

// Classes de variante
const variantClasses = {
  primary: 'bg-mauve hover:bg-lavender text-base shadow-md hover:shadow-lg active:shadow-sm hover:-translate-y-1 active:translate-y-0',
  secondary: 'bg-blue hover:bg-sapphire text-base shadow-md hover:shadow-lg active:shadow-sm hover:-translate-y-1 active:translate-y-0',
  outline: 'bg-transparent border-2 border-mauve text-mauve hover:bg-mauve/10 hover:-translate-y-1 active:translate-y-0',
  ghost: 'bg-transparent hover:bg-surface0 text-subtext0 hover:text-text hover:-translate-y-1 active:translate-y-0'
};

// Génération des classes combinées
const buttonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none transform',
    sizeClasses[props.size] || sizeClasses.md,
    variantClasses[props.variant] || variantClasses.primary,
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95',
    props.className
  ];
});
</script>