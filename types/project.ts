// Types pour les projets

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  category: ProjectCategory
  github?: string
  demo?: string
  image?: string
  featured?: boolean
  date: string
  status: 'completed' | 'in-progress' | 'planned'
  highlights?: string[]
  challenges?: string[]
  learnings?: string[]
}

export type ProjectCategory = 
  | 'web'
  | 'mobile'
  | 'desktop'
  | 'api'
  | 'ai'
  | 'security'
  | 'devops'
  | 'other'

export interface ProjectFilters {
  category?: ProjectCategory
  technologies?: string[]
  status?: Project['status']
  featured?: boolean
}

export interface ProjectCardProps {
  project: Project
  index?: number
  featured?: boolean
  onClick?: () => void
}

export interface ProjectStats {
  totalProjects: number
  completedProjects: number
  inProgressProjects: number
  technologiesUsed: string[]
  categoriesCount: Record<ProjectCategory, number>
}