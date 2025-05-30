<template>
  <div class="terminal-panel font-mono fixed bottom-0 left-0 right-0 bg-base border-t-2 border-surface0 shadow-2xl overflow-hidden z-50 transition-transform duration-300 ease-in-out"
       :style="{ 
         backgroundColor: '#1e1e2e', 
         height: `${terminalHeight}px`,
         minHeight: '150px',
         maxHeight: '80vh',
         transform: isVisible ? 'translateY(0)' : 'translateY(100%)'
       }">
    <!-- Resize handle -->
    <div 
      class="resize-handle absolute top-0 left-0 right-0 h-2 bg-surface1 cursor-ns-resize hover:bg-surface2 transition-colors group"
      @mousedown="startResize"
    >
      <div class="resize-indicator absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-1">
        <div class="w-8 h-0.5 bg-overlay0 rounded-full transition-colors group-hover:bg-text"></div>
      </div>
    </div>
    
    <div class="terminal-content h-full pt-3 px-4 pb-4 flex flex-col">
      <div ref="outputArea" class="terminal-output flex-grow overflow-y-auto mb-2 text-text pr-2">
        <div v-for="(line, index) in outputLines" :key="index" v-html="line"></div>
      </div>
      <div class="terminal-input flex items-center h-8">
        <span class="prompt text-subtext0 mr-2" v-html="prompt"></span>
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
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, computed, onMounted } from 'vue'
import { useTerminal } from '~/composables/useTerminal'
import { useTheme } from '~/composables/useTheme'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
})

const { currentDirectory, executeCommand } = useTerminal()
const { theme: currentTheme, setTheme } = useTheme()

const commandInput = ref('')
const outputLines = ref<string[]>([
  '<span class="text-green-400">Welcome to the Portfolio Terminal!</span>',
  '',
  'This is an interactive terminal for navigating the portfolio.',
  'Type <span class="text-yellow-400">help</span> to see available commands.',
  '',
])

// Terminal height management
const terminalHeight = ref(300) // Default height
const isResizing = ref(false)
const startY = ref(0)
const startHeight = ref(0)

// Log when component mounts
onMounted(() => {
  console.log('TerminalPanel component mounted')
  console.log('Initial visibility:', props.isVisible)
  
  // Debug: Force visibility after mount to test
  setTimeout(() => {
    console.log('Debug check - Is terminal in DOM?', document.querySelector('.terminal-panel'))
    const panel = document.querySelector('.terminal-panel') as HTMLElement
    if (panel) {
      console.log('Terminal panel found, computed styles:', {
        transform: window.getComputedStyle(panel).transform,
        bottom: window.getComputedStyle(panel).bottom,
        height: window.getComputedStyle(panel).height,
        zIndex: window.getComputedStyle(panel).zIndex,
        display: window.getComputedStyle(panel).display,
        visibility: window.getComputedStyle(panel).visibility
      })
    }
  }, 1000)
})
const outputArea = ref<HTMLElement | null>(null)
const inputFieldRef = ref<HTMLInputElement | null>(null)
const commandHistory = ref<string[]>([])
const historyIndex = ref<number>(-1)

// Computed prompt with current directory
const prompt = computed(() => {
  return `<span class="text-green-400">visitor@portfolio</span>:<span class="text-blue-400">${currentDirectory.value}</span>$`
})

// Scroll to bottom when output changes
watch(outputLines, async () => {
  await nextTick()
  if (outputArea.value) {
    outputArea.value.scrollTop = outputArea.value.scrollHeight
  }
}, { deep: true })

// Temporary storage for input when navigating history
let currentInputBeforeHistory = ''

const handleCommand = async () => {
  const input = commandInput.value.trim()
  if (!input) return

  // Add to history if it's not the same as the last command
  if (commandHistory.value.length === 0 || commandHistory.value[commandHistory.value.length - 1] !== input) {
    commandHistory.value.push(input)
  }
  historyIndex.value = commandHistory.value.length
  currentInputBeforeHistory = ''

  // Add user input to output with prompt
  outputLines.value.push(`${prompt.value} ${input}`)
  commandInput.value = ''

  // Execute command using the terminal composable
  const result = await executeCommand(input)
  
  // Handle special commands
  if (result.length === 1 && result[0] === 'CLEAR_TERMINAL') {
    outputLines.value = []
  } else if (input.toLowerCase().startsWith('theme')) {
    // Handle theme command specifically
    const [, themeName] = input.split(/\s+/)
    if (themeName && ['latte', 'frappe', 'macchiato', 'mocha'].includes(themeName.toLowerCase())) {
      setTheme(themeName.toLowerCase() as any)
      outputLines.value.push(`<span class="text-green-400">Theme changed to ${themeName}</span>`)
    } else if (!themeName) {
      outputLines.value.push('Usage: theme <variant>')
      outputLines.value.push('Available themes: latte, frappe, macchiato, mocha')
    } else {
      outputLines.value.push(`<span class="text-red-400">Invalid theme: ${themeName}</span>`)
      outputLines.value.push('Available themes: latte, frappe, macchiato, mocha')
    }
  } else {
    // Add command result to output
    outputLines.value.push(...result)
  }

  // Ensure scroll to bottom after command execution
  await nextTick()
  if (outputArea.value) {
    outputArea.value.scrollTop = outputArea.value.scrollHeight
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

// Resize functions
const startResize = (event: MouseEvent) => {
  isResizing.value = true
  startY.value = event.clientY
  startHeight.value = terminalHeight.value
  
  document.addEventListener('mousemove', doResize)
  document.addEventListener('mouseup', stopResize)
  
  // Prevent text selection during resize
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'ns-resize'
}

const doResize = (event: MouseEvent) => {
  if (!isResizing.value) return
  
  const deltaY = startY.value - event.clientY
  const newHeight = startHeight.value + deltaY
  
  // Clamp height between min and max
  const minHeight = 150
  const maxHeight = window.innerHeight * 0.8
  
  terminalHeight.value = Math.max(minHeight, Math.min(newHeight, maxHeight))
  
  // Save to localStorage
  localStorage.setItem('terminal-height', terminalHeight.value.toString())
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', doResize)
  document.removeEventListener('mouseup', stopResize)
  
  // Restore cursor
  document.body.style.userSelect = ''
  document.body.style.cursor = ''
}

// Load saved height on mount
onMounted(() => {
  console.log('TerminalPanel component mounted')
  console.log('Initial visibility:', props.isVisible)
  
  // Load saved terminal height
  const savedHeight = localStorage.getItem('terminal-height')
  if (savedHeight) {
    terminalHeight.value = parseInt(savedHeight, 10)
  }
})

// Ensure input field gets focus when terminal becomes visible
watch(() => props.isVisible, (newValue) => {
  console.log('Terminal visibility changed in component:', newValue)
  if (newValue) {
    nextTick(() => {
      inputFieldRef.value?.focus()
    })
  }
})

</script>

<style scoped>
/* Scoped styles for the terminal panel - primarily for scrollbars */
.terminal-panel {
  font-size: 0.9rem;
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
  outline: none;
}

/* Resize handle styling */
.resize-handle {
  touch-action: none;
}

.resize-handle::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  right: 0;
  height: 8px;
  cursor: ns-resize;
}
</style>