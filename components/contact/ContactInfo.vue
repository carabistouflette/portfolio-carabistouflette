<template>
  <div class="h-full flex flex-col space-y-6">
    <!-- Section title -->
    <div>
      <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
      <p class="text-subtext0">
        {{ subtitle }}
      </p>
    </div>
    
    <!-- Contact items -->
    <div class="flex-1 space-y-4">
      <div
        v-for="item in contactItems"
        :key="item.type"
        class="group flex items-center p-4 glass-card hover:bg-surface0/70 transition-all duration-300"
      >
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-transform group-hover:scale-110"
          :class="item.iconBg"
        >
          <Icon :name="item.icon" class="w-6 h-6 text-text" />
        </div>
        <div class="flex-1">
          <h4 class="font-medium text-text mb-1">{{ item.title }}</h4>
          <a
            :href="item.href"
            class="text-subtext0 hover:text-mauve transition-colors inline-flex items-center gap-1"
            :target="item.type === 'website' ? '_blank' : undefined"
            rel="noopener noreferrer"
          >
            {{ item.value }}
            <Icon v-if="item.type === 'website'" name="heroicons:arrow-top-right-on-square" class="w-4 h-4 opacity-60" />
          </a>
        </div>
      </div>
    </div>
    
    <!-- Availability info -->
    <div class="bg-gradient-to-br from-mauve/10 to-lavender/10 border border-mauve/20 rounded-lg p-5">
      <div class="flex items-center mb-3">
        <Icon :name="availability.icon" class="w-5 h-5 mr-2 text-mauve" />
        <h4 class="font-medium text-text">{{ availability.title }}</h4>
      </div>
      <p class="text-subtext0 leading-relaxed">
        {{ availability.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ContactItem {
  type: string;
  title: string;
  value: string;
  icon: string;
  iconBg: string;
  href: string;
}

interface ContactInfoProps {
  title: string;
  subtitle: string;
  contactItems: ContactItem[];
  availability: {
    icon: string;
    title: string;
    description: string;
  };
}

const props = defineProps<ContactInfoProps>();
</script>