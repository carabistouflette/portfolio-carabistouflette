<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const mapContainer = ref<HTMLElement | null>(null)
let map: any = null

onMounted(async () => {
  if (process.client) {
    const L = await import('leaflet')
    await import('leaflet/dist/leaflet.css')
    
    if (mapContainer.value) {
      map = L.map(mapContainer.value).setView([43.6109, 3.8767], 13)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      L.marker([43.6109, 3.8767])
        .addTo(map)
        .bindPopup('<b>Montpellier</b><br>Ville étudiante dynamique')
    }
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
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