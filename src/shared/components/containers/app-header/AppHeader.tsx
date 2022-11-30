import { useSelector } from 'react-redux'
import { cn } from '@bem-react/classname'
import { motion } from 'framer-motion'
import { Link } from '@mui/material'

import React, { useEffect } from 'react'

import { UserControl } from 'shared/components/user-contol/UserControl'
import { SharedState } from 'shared/state/shared.reducer'
import './AppHeader.scss'
import { AppState } from 'state'

const componentId = 'AppHeader'
const bem = cn(componentId)

export const AppHeader: React.FC = () => {
  const user = useSelector((state: AppState) => state.shared.user)

  return (
    <div className={bem()} data-testid={bem()}>
      <h1
        className={bem('Header')}
        data-testid={bem('Header')}
        // onClick={() => navigate('/wellcome-page')}
      >
        Audit
      </h1>
      {user == null ? (
        <motion.div
          className={bem('Links')}
          data-testd={bem('Links')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Link className={bem('Link')} data-testid={bem('signIn')} href="/sign-in">
            Sign in
          </Link>
          <Link
            className={bem('Link')}
            data-testid={bem('registration')}
            href="/registration"
          >
            Registration
          </Link>
        </motion.div>
      ) : (
        <UserControl user={user} />
      )}
    </div>
  )
}
