export type User = {
  id: number
  name: string
  email: string
  role: UserRole
  created: string
  updated: string
}

export type UserRole = 'admin' | 'auditor' | 'project'
