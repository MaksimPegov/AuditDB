import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@bem-react/classname'
import { Link } from '@mui/material'

import React, { useEffect } from 'react'

import { SharedState } from 'shared/state/shared.reducer'
import { UserControl } from 'shared/components/user-contol/UserControl'
import './AppHeader.scss'

const componentId = 'AppHeader'
const bem = cn(componentId)

export const AppHeader: React.FC = () => {
  const user = useSelector((state: SharedState) => state.user)
  const dispatch = useDispatch()

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
