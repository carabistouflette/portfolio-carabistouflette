<template>
  <div class="map-image-container">
    <div class="map-image-wrapper">
      <img 
        :src="mapImageUrl"
        :alt="altText"
        class="map-image"
        loading="lazy"
      />
      <div class="map-overlay">
        <div class="marker-popup">
          <Icon name="heroicons:map-pin" class="w-5 h-5 text-red" />
          <span>{{ markerText }}</span>
        </div>
      </div>
    </div>
    <div class="map-caption">
      <Icon name="heroicons:map-pin" class="w-4 h-4 mr-2" />
      <span>{{ caption }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface MapImageProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  width?: number;
  height?: number;
  markerText: string;
  caption: string;
  altText?: string;
}

const props = withDefaults(defineProps<MapImageProps>(), {
  zoom: 13,
  width: 1200,
  height: 500,
  altText: 'Carte de localisation'
});

// Using OpenStreetMap static image API
const mapImageUrl = computed(() => {
  const { lat, lng } = props.center;
  // Create a static map URL using OSM tile server
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${props.zoom}&size=${props.width}x${props.height}&markers=${lat},${lng},red-m`;
});
</script>

<style scoped>
.map-image-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: var(--surface0);
}

.map-image-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  background-color: var(--surface1);
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.marker-popup {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface0);
  color: var(--text);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
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

/* Loading state */
.map-image-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--surface1) 25%, var(--surface2) 50%, var(--surface1) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  z-index: 1;
}

.map-image[src] ~ .map-image-wrapper::before {
  display: none;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>