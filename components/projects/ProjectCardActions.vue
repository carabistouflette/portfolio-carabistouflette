<template>
  <div class="actions">
    <NuxtLink 
      v-if="!externalLink"
      :to="detailLink || `/projects/${slug}`"
      class="action-button primary-action focus:outline-none focus-visible:ring-2 focus-visible:ring-mauve focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      :aria-label="`Voir les détails du projet ${title}`"
    >
      <span>Voir le projet</span>
      <Icon name="heroicons:arrow-right" class="action-icon" />
    </NuxtLink>
    
    <a 
      v-else
      :href="externalLink"
      target="_blank"
      rel="noopener noreferrer"
      class="action-button primary-action focus:outline-none focus-visible:ring-2 focus-visible:ring-mauve focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      :aria-label="`Voir le projet ${title} (lien externe)`"
      @click.stop
    >
      <span>Voir le projet</span>
      <Icon name="heroicons:arrow-top-right-on-square" class="action-icon" />
    </a>
    
    <a 
      v-if="demoLink"
      :href="demoLink"
      target="_blank"
      rel="noopener noreferrer"
      class="action-button secondary-action focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      :aria-label="`Voir la démo de ${title}`"
      @click.stop
    >
      <span>Démo</span>
      <Icon name="heroicons:play" class="action-icon" />
    </a>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  slug?: string
  detailLink?: string
  externalLink?: string
  demoLink?: string
}

defineProps<Props>()
</script>

<style scoped>
.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.primary-action {
  background-color: var(--mauve);
  color: var(--base);
}

.primary-action:hover {
  background-color: var(--mauve-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--mauve-alpha-30);
}

.secondary-action {
  background-color: var(--surface0);
  color: var(--text);
  border-color: var(--surface1);
}

.secondary-action:hover {
  background-color: var(--surface1);
  border-color: var(--surface2);
  transform: translateY(-1px);
}

.action-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
}

.primary-action:hover .action-icon {
  transform: translateX(2px);
}

.secondary-action:hover .action-icon {
  transform: scale(1.1);
}
</style>