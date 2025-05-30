import { ref, computed } from 'vue'
import { useRouter } from '#app'

export interface Command {
  name: string
  description: string
  usage: string
  execute: (args: string[]) => Promise<string | string[]>
}

export const useTerminal = () => {
  const router = useRouter()
  const currentDirectory = ref('/')
  
  const fileSystem = {
    '/': ['home', 'projects', 'contact', 'about'],
    '/home': ['README.md', 'skills.txt', 'experience.txt'],
    '/projects': ['project1.md', 'project2.md', 'project3.md'],
    '/contact': ['email.txt', 'github.txt', 'linkedin.txt'],
    '/about': ['bio.txt', 'resume.pdf']
  }

  const commands: Record<string, Command> = {
    help: {
      name: 'help',
      description: 'Show available commands',
      usage: 'help [command]',
      execute: async (args) => {
        if (args.length > 0) {
          const cmd = commands[args[0]]
          if (cmd) {
            return [
              `${cmd.name} - ${cmd.description}`,
              `Usage: ${cmd.usage}`
            ]
          }
          return `Command not found: ${args[0]}`
        }
        
        const commandList = Object.values(commands).map(cmd => 
          `  ${cmd.name.padEnd(10)} - ${cmd.description}`
        )
        return [
          'Available commands:',
          ...commandList,
          '',
          'Type "help <command>" for detailed usage'
        ]
      }
    },
    
    cd: {
      name: 'cd',
      description: 'Change directory',
      usage: 'cd <directory>',
      execute: async (args) => {
        if (args.length === 0) {
          currentDirectory.value = '/'
          return 'Changed to root directory'
        }
        
        const target = args[0]
        let newPath = ''
        
        if (target === '..') {
          const parts = currentDirectory.value.split('/').filter(Boolean)
          parts.pop()
          newPath = '/' + parts.join('/')
        } else if (target.startsWith('/')) {
          newPath = target
        } else {
          newPath = currentDirectory.value === '/' 
            ? `/${target}` 
            : `${currentDirectory.value}/${target}`
        }
        
        if (fileSystem[newPath]) {
          currentDirectory.value = newPath || '/'
          await router.push(newPath === '/' ? '/' : newPath.substring(1))
          return `Changed directory to ${currentDirectory.value}`
        }
        
        return `cd: ${target}: No such directory`
      }
    },
    
    ls: {
      name: 'ls',
      description: 'List directory contents',
      usage: 'ls [directory]',
      execute: async (args) => {
        const dir = args.length > 0 ? args[0] : currentDirectory.value
        const contents = fileSystem[dir]
        
        if (!contents) {
          return `ls: ${dir}: No such directory`
        }
        
        return contents.map(item => {
          const isDir = fileSystem[`${dir === '/' ? '' : dir}/${item}`]
          return isDir ? `<span class="text-blue-400">${item}/</span>` : item
        })
      }
    },
    
    pwd: {
      name: 'pwd',
      description: 'Print working directory',
      usage: 'pwd',
      execute: async () => currentDirectory.value
    },
    
    clear: {
      name: 'clear',
      description: 'Clear terminal screen',
      usage: 'clear',
      execute: async () => 'CLEAR_TERMINAL'
    },
    
    echo: {
      name: 'echo',
      description: 'Display text',
      usage: 'echo <text>',
      execute: async (args) => args.join(' ') || ''
    },
    
    cat: {
      name: 'cat',
      description: 'Display file contents',
      usage: 'cat <file>',
      execute: async (args) => {
        if (args.length === 0) {
          return 'cat: missing file operand'
        }
        
        const file = args[0]
        const filePath = file.startsWith('/') ? file : `${currentDirectory.value}/${file}`
        
        const fileContents: Record<string, string[]> = {
          '/home/README.md': [
            '# Welcome to my portfolio!',
            '',
            'I am a passionate developer with expertise in:',
            '- Vue.js / Nuxt.js',
            '- TypeScript',
            '- Node.js',
            '- Cloud technologies'
          ],
          '/home/skills.txt': [
            'Frontend: Vue, React, TypeScript, Tailwind CSS',
            'Backend: Node.js, Express, PostgreSQL, MongoDB',
            'DevOps: Docker, Kubernetes, AWS, CI/CD',
            'Tools: Git, VS Code, Figma'
          ],
          '/contact/email.txt': ['contact@example.com'],
          '/contact/github.txt': ['github.com/username'],
          '/contact/linkedin.txt': ['linkedin.com/in/username']
        }
        
        if (fileContents[filePath]) {
          return fileContents[filePath]
        }
        
        return `cat: ${file}: No such file`
      }
    },
    
    whoami: {
      name: 'whoami',
      description: 'Display current user',
      usage: 'whoami',
      execute: async () => 'visitor'
    },
    
    date: {
      name: 'date',
      description: 'Display current date and time',
      usage: 'date',
      execute: async () => new Date().toString()
    }
  }

  const executeCommand = async (input: string): Promise<string[]> => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return []
    
    const [commandName, ...args] = trimmedInput.split(/\s+/)
    const command = commands[commandName.toLowerCase()]
    
    if (!command) {
      return [`Command not found: ${commandName}. Type 'help' for available commands.`]
    }
    
    try {
      const result = await command.execute(args)
      return Array.isArray(result) ? result : [result]
    } catch (error) {
      return [`Error executing command: ${error}`]
    }
  }

  return {
    currentDirectory: computed(() => currentDirectory.value),
    executeCommand,
    commands
  }
}