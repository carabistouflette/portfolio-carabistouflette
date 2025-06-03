<template>
  <div class="map-wrapper">
    <div v-if="!mapLoaded" class="map-loading">
      <div class="loading-spinner"></div>
      <p>Chargement de la carte...</p>
    </div>
    <div ref="mapContainer" class="map-container"></div>
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

// Type definitions for Leaflet (local types since we're dynamically importing)
type LeafletMap = {
  remove: () => void;
  invalidateSize: () => void;
};

type LeafletModule = {
  map: (element: HTMLElement) => {
    setView: (center: [number, number], zoom: number) => LeafletMap;
  };
  tileLayer: (url: string, options: Record<string, unknown>) => {
    on: (event: string, handler: (error?: unknown) => void) => void;
    setUrl: (url: string) => void;
    addTo: (map: LeafletMap) => void;
  };
  marker: (position: [number, number]) => {
    addTo: (map: LeafletMap) => {
      bindPopup: (content: string) => {
        openPopup: () => void;
      };
    };
  };
  Icon: {
    Default: {
      prototype: Record<string, unknown>;
      mergeOptions: (options: Record<string, string>) => void;
    };
  };
};

const mapContainer = ref<HTMLElement | null>(null);
const mapLoaded = ref(false);
let map: LeafletMap | null = null;
let L: LeafletModule | null = null;

onMounted(async () => {
  if (typeof window !== 'undefined') {
    try {
      // Import Leaflet
      L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Fix default marker icon
      delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapContainer.value) return;

      // Initialize map
      map = L.map(mapContainer.value).setView(props.center, props.zoom);

      // Add tile layer - using standard OSM
      const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 1
      });

      // Track loading state
      let tilesLoaded = 0;
      let tilesErrored = 0;

      tileLayer.on('tileload', () => {
        tilesLoaded++;
        if (tilesLoaded === 1) {
          mapLoaded.value = true;
        }
      });

      tileLayer.on('tileerror', (error: unknown) => {
        tilesErrored++;
        // If too many errors, try fallback
        if (tilesErrored > 5 && tilesLoaded === 0) {
          tileLayer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        }
      });

      tileLayer.addTo(map);

      // Add marker
      const marker = L.marker(props.marker.position)
        .addTo(map)
        .bindPopup(props.marker.popup)
        .openPopup();

      // Force resize after a delay
      setTimeout(() => {
        if (map) {
          map.invalidateSize();
        }
      }, 250);

    } catch (error) {
      mapLoaded.value = false;
    }
  }
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--surface0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.map-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1000;
  color: var(--text);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--surface1);
  border-top-color: var(--blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.map-container {
  width: 100%;
  height: 100%;
}

/* Leaflet overrides */
:deep(.leaflet-tile-pane) {
  opacity: 1 !important;
}

:deep(.leaflet-tile) {
  visibility: visible !important;
}

:deep(.leaflet-container) {
  background-color: #f0f0f0;
  font-family: inherit;
}

/* Fix marker icons */
:deep(.leaflet-marker-icon) {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png) !important;
  width: 25px !important;
  height: 41px !important;
}

:deep(.leaflet-marker-shadow) {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png) !important;
}

/* Theme controls */
:deep(.leaflet-control-zoom) {
  border: 2px solid var(--surface0) !important;
  border-radius: 8px !important;
  overflow: hidden;
}

:deep(.leaflet-control-zoom-in),
:deep(.leaflet-control-zoom-out) {
  background: var(--surface0) !important;
  color: var(--text) !important;
  border: none !important;
  width: 36px !important;
  height: 36px !important;
  line-height: 36px !important;
  font-size: 18px !important;
  transition: all 0.2s ease;
}

:deep(.leaflet-control-zoom-in:hover),
:deep(.leaflet-control-zoom-out:hover) {
  background: var(--surface1) !important;
  color: var(--blue) !important;
}

:deep(.leaflet-control-attribution) {
  background: var(--base) !important;
  color: var(--subtext0) !important;
  font-size: 11px !important;
  opacity: 0.8;
}

:deep(.leaflet-control-attribution a) {
  color: var(--blue) !important;
}

:deep(.leaflet-popup-content-wrapper) {
  background: var(--surface0) !important;
  color: var(--text) !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

:deep(.leaflet-popup-tip) {
  background: var(--surface0) !important;
}
</style>