<template>
    <component
      :is="to ? 'NuxtLink' : 'button'"
      :to="to"
      :type="type"
      :class="[
        'inline-flex items-center justify-center space-x-2 rounded-lg font-medium transition-all duration-300 focus:outline-none',
        sizeClasses,
        variantClasses,
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      ]"
      :disabled="disabled"
      @click="$emit('click', $event)"
    >
      <Icon v-if="iconLeft" :name="iconLeft" class="w-5 h-5" />
      <span v-if="$slots.default"><slot /></span>
      <Icon v-if="iconRight" :name="iconRight" class="w-5 h-5" />
    </component>
  </template>
  
  <script setup lang="ts">
  // Props
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
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
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
  })
  
  // Events
  defineEmits(['click'])
  
  // Computed styles
  const sizeClasses = computed(() => {
    const sizes = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    }
    return sizes[props.size as keyof typeof sizes]
  })
  
  const variantClasses = computed(() => {
    const variants = {
      primary: 'bg-mauve hover:bg-lavender text-base shadow-md hover:shadow-lg active:shadow-sm',
      secondary: 'bg-blue hover:bg-sapphire text-base shadow-md hover:shadow-lg active:shadow-sm',
      outline: 'bg-transparent border-2 border-mauve text-mauve hover:bg-mauve/10',
      ghost: 'bg-transparent hover:bg-surface0 text-subtext0 hover:text-text'
    }
    return variants[props.variant as keyof typeof variants]
  })
  </script>