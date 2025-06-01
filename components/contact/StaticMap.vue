<template>
  <div class="static-map-container">
    <iframe
      width="100%"
      height="500"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      :src="`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker.lat},${marker.lng}`"
      style="border: none; border-radius: 12px;"
    ></iframe>
    <div class="map-caption">
      <Icon name="heroicons:map-pin" class="w-4 h-4 mr-2" />
      <span>{{ caption }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StaticMapProps {
  marker: {
    lat: number;
    lng: number;
  };
  bbox: string;
  caption: string;
}

defineProps<StaticMapProps>();
</script>

<style scoped>
.static-map-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: var(--surface0);
}

.map-caption {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--surface0);
  color: var(--text);
  border-top: 1px solid var(--surface1);
  font-size: 0.875rem;
}
</style>