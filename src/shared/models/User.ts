export type User = {
  _id: number
  name: string
  email: string
  role?: UserRole
  created: string
  updated: string
}

export type UserRole = 'admin' | 'user'
