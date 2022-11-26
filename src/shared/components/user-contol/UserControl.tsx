import React from 'react'
import { User } from 'shared/models/User'

export const UserControl: React.FC<{ user: User }> = ({ user }) => {
  return <div>{user.name}</div>
}
