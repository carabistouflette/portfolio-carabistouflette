// Types pour les réponses API et les requêtes

export interface ApiResponse<T> {
  data: T
  error?: string
  status: number
  message?: string
}

export interface ApiError {
  message: string
  status: number
  code?: string
  details?: Record<string, unknown>
}

// Types pour l'API de contact
export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot?: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

// Types pour l'API GitHub
export interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GitHubUser
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: string | null
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string | null
    node_id: string
  } | null
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

export interface GitHubLanguages {
  [language: string]: number
}

export interface GitHubContributionDay {
  contributionCount: number
  date: string
  color: string
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[]
  firstDay: string
}

export interface GitHubContributions {
  totalContributions: number
  weeks: GitHubContributionWeek[]
}

export interface GitHubEvent {
  id: string
  type: string
  actor: {
    id: number
    login: string
    display_login: string
    gravatar_id: string
    url: string
    avatar_url: string
  }
  repo: {
    id: number
    name: string
    url: string
  }
  payload: Record<string, unknown>
  public: boolean
  created_at: string
  org?: {
    id: number
    login: string
    gravatar_id: string
    url: string
    avatar_url: string
  }
}

export interface GitHubStats {
  user: GitHubUser
  totalStars: number
  totalForks: number
  languages: GitHubLanguages
  contributions: GitHubContributions
  popularRepos: GitHubRepository[]
  recentActivity: GitHubEvent[]
}