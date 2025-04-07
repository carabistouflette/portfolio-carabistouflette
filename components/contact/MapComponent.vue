<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  marker: {
    position: [number, number];
    popup: string;
  };
}

const props = defineProps<MapComponentProps>();

const mapContainer = ref<HTMLElement | null>(null);
let map: any = null;

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const L = await import('leaflet');
    await import('leaflet/dist/leaflet.css');

    if (mapContainer.value) {
      map = L.map(mapContainer.value).setView(props.center, props.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker(props.marker.position)
        .addTo(map)
        .bindPopup(props.marker.popup);
    }
  }
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}
</style>