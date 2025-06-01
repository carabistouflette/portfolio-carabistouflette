<template>
  <div class="simple-map-container">
    <div class="map-content">
      <div class="map-background">
        <!-- Simple SVG representation of Montpellier area -->
        <svg viewBox="0 0 400 300" class="map-svg">
          <!-- Water/Sea -->
          <rect x="0" y="0" width="400" height="300" fill="var(--sapphire)" opacity="0.1"/>
          
          <!-- Land -->
          <path d="M 50 250 Q 100 200 150 180 T 250 160 Q 300 150 350 180 L 350 300 L 50 300 Z" 
                fill="var(--surface1)" 
                stroke="var(--surface2)" 
                stroke-width="2"/>
          
          <!-- Rivers -->
          <path d="M 180 50 Q 190 100 200 150 T 210 250" 
                fill="none" 
                stroke="var(--sapphire)" 
                stroke-width="2" 
                opacity="0.5"/>
          
          <!-- City areas -->
          <circle cx="200" cy="180" r="25" fill="var(--surface2)" opacity="0.5"/>
          <circle cx="150" cy="200" r="15" fill="var(--surface2)" opacity="0.3"/>
          <circle cx="250" cy="170" r="20" fill="var(--surface2)" opacity="0.3"/>
          
          <!-- Marker -->
          <g transform="translate(200, 180)">
            <path d="M 0 -20 C -11 -20 -20 -11 -20 0 C -20 11 0 30 0 30 C 0 30 20 11 20 0 C 20 -11 11 -20 0 -20 Z" 
                  fill="var(--red)" 
                  stroke="var(--surface0)" 
                  stroke-width="2"/>
            <circle cx="0" cy="-5" r="5" fill="var(--surface0)"/>
          </g>
        </svg>
      </div>
      
      <div class="map-info">
        <div class="location-badge">
          <Icon name="heroicons:map-pin" class="w-5 h-5" />
          <span>Montpellier, France</span>
        </div>
        <p class="location-description">
          Ville étudiante dynamique du sud de la France
        </p>
      </div>
    </div>
    
    <div class="map-actions">
      <a 
        href="https://www.google.com/maps/place/Montpellier,+France/@43.6112422,3.8767337,13z"
        target="_blank"
        rel="noopener noreferrer"
        class="map-link"
      >
        <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
        Voir sur Google Maps
      </a>
    </div>
  </div>
</template>

<style scoped>
.simple-map-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.map-content {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  min-height: 400px;
}

@media (max-width: 768px) {
  .map-content {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

.map-background {
  position: relative;
  background: var(--base);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.map-svg {
  width: 100%;
  height: 100%;
  max-width: 400px;
}

.map-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--surface1);
  color: var(--text);
  border-radius: 9999px;
  font-weight: 600;
  width: fit-content;
}

.location-badge svg {
  color: var(--red);
}

.location-description {
  color: var(--subtext0);
  line-height: 1.6;
  font-size: 1.125rem;
}

.map-actions {
  padding: 1rem 2rem;
  background: var(--mantle);
  border-top: 1px solid var(--surface1);
  display: flex;
  justify-content: center;
}

.map-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--surface0);
  color: var(--blue);
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.map-link:hover {
  background: var(--surface1);
  transform: translateY(-1px);
}
</style>