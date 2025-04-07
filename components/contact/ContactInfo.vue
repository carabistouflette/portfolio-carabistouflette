<template>
  <div class="space-y-8">
    <!-- Section title -->
    <div>
      <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
      <p class="text-subtext0">
        {{ subtitle }}
      </p>
    </div>
    
    <!-- Contact items -->
    <div class="space-y-6">
      <div
        v-for="item in contactItems"
        :key="item.type"
        class="flex items-center p-4 bg-surface0/50 rounded-lg border border-surface1 transition-transform hover:translate-x-1"
      >
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center mr-4"
          :class="item.iconBg"
        >
          <Icon :name="item.icon" class="w-6 h-6 text-base" />
        </div>
        <div>
          <h4 class="font-medium text-text">{{ item.title }}</h4>
          <a
            :href="item.href"
            class="text-subtext0 hover:text-mauve transition-colors"
            :target="item.type === 'website' ? '_blank' : undefined"
            rel="noopener noreferrer"
          >
            {{ item.value }}
          </a>
        </div>
      </div>
    </div>
    
    <!-- Availability info -->
    <div class="bg-mauve/10 border border-mauve/20 rounded-lg p-5">
      <div class="flex items-center mb-3">
        <Icon :name="availability.icon" class="w-5 h-5 mr-2 text-mauve" />
        <h4 class="font-medium">{{ availability.title }}</h4>
      </div>
      <p class="text-subtext0">
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