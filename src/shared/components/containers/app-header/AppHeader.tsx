import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@bem-react/classname'
import { Avatar, IconButton, Link, Menu, MenuItem } from '@mui/material'

import React, { useEffect } from 'react'

import { SharedState } from 'shared/state/shared.reducer'
import { UserControl } from 'shared/components/user-contol/UserControl'
import './AppHeader.scss'
import { User } from 'shared/models/User'

const componentId = 'AppHeader'
const bem = cn(componentId)

export const AppHeader: React.FC = () => {
  const user = useSelector((state: SharedState) => state.user)
  const dispatch = useDispatch()

  // const user: User = {
  //   id: 1,
  //   name: 'Makism',
  //   email: 'maksim.peg@gmail.com',
  //   role: 'auditor',
  //   created: '28.11.2021',
  //   updated: '28.11.2021',
  // }

  return (
    <div className={bem()} data-testid={bem()}>
      <h1 className={bem('Header')} data-testid={bem('Header')}>
        Audit
      </h1>
      {user == null ? (
        <div className={bem('Links')} data-testd={bem('Links')}>
          <Link className={bem('Link')} data-testid={bem('signIn')} href="#">
            Sign in
          </Link>
          <Link className={bem('Link')} data-testid={bem('registration')} href="#">
            Registration
          </Link>
        </div>
      ) : (
        <UserControl user={user} />
      )}
    </div>
  )
}
