export interface GitHubUser {
  login: string
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface GitHubStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  languages: Record<string, number>
  recentActivity: GitHubActivity[]
}

export interface GitHubActivity {
  type: string
  repo: string
  date: string
  description: string
}

export interface GitHubEvent {
  type: string
  repo: { name: string }
  created_at: string
  payload: {
    commits?: { length: number }
    ref_type?: string
    ref?: string
    action?: string
    pull_request?: { number: number }
    issue?: { number: number }
  }
}