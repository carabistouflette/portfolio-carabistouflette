<template>
  <div class="terminal-panel font-mono fixed bottom-0 left-0 right-0 h-1/3 bg-base p-4 border-t border-surface0 shadow-lg overflow-hidden transition-transform duration-300 ease-in-out"
       :class="{ 'translate-y-full': !isVisible }">
    <div ref="outputArea" class="terminal-output h-[calc(100%-2rem)] overflow-y-auto mb-2 text-text pr-2"> <!-- Adjusted height calculation -->
      <div v-for="(line, index) in outputLines" :key="index" v-html="line"></div>
    </div>
    <div class="terminal-input flex items-center h-8"> <!-- Added fixed height for input area -->
      <span class="prompt text-subtext0 mr-2">&gt;</span>
      <!-- Input field with command history navigation -->
      <input
        ref="inputFieldRef"
        v-model="commandInput"
        type="text"
        class="input-field flex-grow bg-transparent border-none outline-none text-text placeholder-overlay0 focus:ring-0"
        placeholder="Enter command..."
        aria-label="Terminal command input"
        @keydown.enter="handleCommand"
        @keydown.up.prevent="navigateHistoryUp"
        @keydown.down.prevent="navigateHistoryDown"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'; // Added onMounted
import { useRouter } from 'vue-router'; // Use vue-router directly for better type inference in editor
import { useTheme } from '~/composables/useTheme'; // Assuming path

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const { theme: currentTheme, setTheme } = useTheme(); // Assuming useTheme returns theme and setTheme

const commandInput = ref('');
const outputLines = ref<string[]>([
  'Welcome to the interactive terminal!',
  "Type 'help' for available commands. (Not implemented yet)",
]);
const outputArea = ref<HTMLElement | null>(null);
const inputFieldRef = ref<HTMLInputElement | null>(null); // Ref for the input field
const commandHistory = ref<string[]>([]);
const historyIndex = ref<number>(-1); // -1 indicates not currently navigating history

// Scroll to bottom when output changes
watch(outputLines, async () => {
  await nextTick();
  if (outputArea.value) {
    outputArea.value.scrollTop = outputArea.value.scrollHeight;
  }
}, { deep: true });

// Temporary storage for input when navigating history
let currentInputBeforeHistory = '';

const handleCommand = async () => {
  const input = commandInput.value.trim();
  if (!input) return;

  // Add to history if it's not the same as the last command
  if (commandHistory.value.length === 0 || commandHistory.value[commandHistory.value.length - 1] !== input) {
    commandHistory.value.push(input);
  }
  historyIndex.value = commandHistory.value.length; // Reset history index to the end (ready for new up arrow press)
  currentInputBeforeHistory = ''; // Clear temporary storage

  // Add user input to output
  outputLines.value.push(`<span class="text-subtext0">&gt;</span> ${input}`);
  commandInput.value = ''; // Clear input field

  // Parse command and arguments
  const [command, ...args] = input.split(/\s+/);
  const argument = args.join(' '); // Re-join args in case they contain spaces

  // --- Command Execution Logic ---
  switch (command.toLowerCase()) {
    case 'nav':
      await handleNavCommand(argument);
      break;
    case 'theme':
      handleThemeCommand(argument);
      break;
    case 'filter':
      handleFilterCommand(argument);
      break;
    case 'show':
      handleShowCommand(argument);
      break;
    case 'clear': // Added case for clear command
      outputLines.value = []; // Clear the output history
      break;
    // case 'help': // Future implementation
    //   outputLines.value.push("Available commands: nav, theme, filter, show, help, clear");
    //   break;
    // case 'clear': // Future implementation - REMOVED as implemented above
    //   outputLines.value = ["Terminal cleared."];
    //   break;
    default:
      outputLines.value.push(`Error: Unknown command "${command}"`);
  }

  // Ensure scroll to bottom after command execution potentially adds more lines
  await nextTick();
   if (outputArea.value) {
    outputArea.value.scrollTop = outputArea.value.scrollHeight;
  }
};

const navigateHistoryUp = () => {
  if (commandHistory.value.length === 0) return;

  if (historyIndex.value === commandHistory.value.length) {
    // Store current input before starting history navigation
    currentInputBeforeHistory = commandInput.value;
  }

  if (historyIndex.value > 0) {
    historyIndex.value--;
    commandInput.value = commandHistory.value[historyIndex.value];
    moveCursorToEnd();
  }
};

const navigateHistoryDown = () => {
  if (commandHistory.value.length === 0) return;

  if (historyIndex.value < commandHistory.value.length - 1) {
    historyIndex.value++;
    commandInput.value = commandHistory.value[historyIndex.value];
    moveCursorToEnd();
  } else if (historyIndex.value === commandHistory.value.length - 1) {
    // Reached the end of history, restore original input or clear
    historyIndex.value++;
    commandInput.value = currentInputBeforeHistory;
    moveCursorToEnd();
  }
};

// Helper function to move cursor to the end of the input
const moveCursorToEnd = () => {
  nextTick(() => {
    if (inputFieldRef.value) {
      inputFieldRef.value.selectionStart = inputFieldRef.value.selectionEnd = inputFieldRef.value.value.length;
      // Optional: Scroll input into view if needed, though usually not necessary for single-line inputs
      // inputFieldRef.value.scrollLeft = inputFieldRef.value.scrollWidth;
    }
  });
};

// Ensure input field gets focus when terminal becomes visible (optional but good UX)
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    nextTick(() => {
      inputFieldRef.value?.focus();
    });
  }
});

// Focus input on component mount if initially visible (optional)
// onMounted(() => {
//   if (props.isVisible) {
//      nextTick(() => {
//       inputFieldRef.value?.focus();
//     });
//   }
// });

const handleNavCommand = async (page: string) => {
  const validPages = ['index', 'projects', 'contact']; // Assuming these are the route names or paths
  const targetPage = page.toLowerCase();

  if (!targetPage) {
     outputLines.value.push('Usage: nav &lt;page&gt; (e.g., nav projects)');
     return;
  }

  // Map common names to route paths/names if necessary
  let routeTarget = targetPage;
  if (targetPage === 'home') routeTarget = 'index';

  if (validPages.includes(routeTarget)) {
    outputLines.value.push(`Navigating to ${page}...`);
    try {
      // Use route name if defined in pages/, otherwise use path
      await router.push({ name: routeTarget }); // Prefer named routes if they exist
      // Or use path: await router.push(routeTarget === 'index' ? '/' : `/${routeTarget}`);
    } catch (error) {
       console.error("Navigation error:", error);
       // Check if error is due to route not found - Safely access message
       if (error instanceof Error && error.message.includes('No match found for location with name')) {
           outputLines.value.push(`Error: Route named "${routeTarget}" not found. Trying path...`);
           try {
               await router.push(routeTarget === 'index' ? '/' : `/${routeTarget}`); // Use path directly
           } catch (pathError) {
               console.error("Path navigation error:", pathError);
               outputLines.value.push(`Error: Page "${page}" not found.`);
           }
       } else {
            outputLines.value.push(`Error navigating to "${page}".`);
       }
    }
  } else {
    outputLines.value.push(`Error: Page "${page}" not found. Valid pages: home, projects, contact.`);
  }
};

const handleThemeCommand = (variant: string) => {
   const validThemes = ['latte', 'frappe', 'macchiato', 'mocha']; // From useTheme or constants
   const targetTheme = variant.toLowerCase();

   if (!targetTheme) {
     outputLines.value.push('Usage: theme &lt;variant&gt; (e.g., theme mocha)');
     return;
   }

   if (validThemes.includes(targetTheme)) {
     setTheme(targetTheme as any); // Cast needed if setTheme expects specific literal types
     outputLines.value.push(`Theme set to ${variant}.`);
   } else {
     outputLines.value.push(`Error: Theme variant "${variant}" not recognized. Valid themes: ${validThemes.join(', ')}.`);
   }
};

const handleFilterCommand = (tag: string) => {
  if (!tag) {
    outputLines.value.push('Usage: filter &lt;tag&gt; (e.g., filter vue)');
    return;
  }
  // Placeholder for actual filtering logic
  outputLines.value.push(`Filtering projects by tag: "${tag}" (Implementation pending)`);
};

const handleShowCommand = (info: string) => {
  const validInfo = ['contact', 'skills', 'about']; // Example info types
  const targetInfo = info.toLowerCase();

   if (!targetInfo) {
    outputLines.value.push('Usage: show &lt;info&gt; (e.g., show skills)');
    return;
  }

  if (validInfo.includes(targetInfo)) {
    // Placeholder for actual info display logic
    outputLines.value.push(`Showing info: "${info}" (Implementation pending)`);
  } else {
     outputLines.value.push(`Error: Cannot show info for "${info}". Valid options: ${validInfo.join(', ')}.`);
  }
};

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