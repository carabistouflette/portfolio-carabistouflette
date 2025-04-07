<template>
  <div class="terminal-panel font-mono fixed bottom-0 left-0 right-0 h-1/3 bg-base p-4 border-t border-surface0 shadow-lg overflow-hidden transition-transform duration-300 ease-in-out"
       :class="{ 'translate-y-full': !isVisible }">
    <div class="terminal-output h-[calc(100%-2rem)] overflow-y-auto mb-2 text-text pr-2"> <!-- Adjusted height calculation -->
      <!-- Output lines will go here -->
      <p>Welcome to the interactive terminal!</p>
      <p>Type 'help' for available commands.</p>
    </div>
    <div class="terminal-input flex items-center h-8"> <!-- Added fixed height for input area -->
      <span class="prompt text-subtext0 mr-2">&gt;</span>
      <input type="text"
             class="input-field flex-grow bg-transparent border-none outline-none text-text placeholder-overlay0 focus:ring-0" <!-- Added focus:ring-0 -->
             placeholder="Enter command..."
             aria-label="Terminal command input">
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

// Basic setup, command handling logic will be added later
</script>

<style scoped>
/* Scoped styles for the terminal panel - primarily for scrollbars */
.terminal-panel {
  /* font-family is now handled by Tailwind's font-mono class */
  font-size: 0.9rem;
  /* Ensure smooth scrolling */
  scrollbar-width: thin;
  scrollbar-color: var(--ctp-mauve) var(--ctp-surface0);
}

/* Webkit scrollbar styling */
.terminal-output::-webkit-scrollbar {
  width: 8px;
}

.terminal-output::-webkit-scrollbar-track {
  background: var(--ctp-surface0);
  border-radius: 4px;
}

.terminal-output::-webkit-scrollbar-thumb {
  background-color: var(--ctp-mauve);
  border-radius: 4px;
  border: 2px solid var(--ctp-surface0);
}

.input-field:focus {
  outline: none; /* Remove default focus outline - handled by focus:ring-0 */
}

/* Removed redundant :root and utility class definitions as they are handled globally and by Tailwind */

</style>