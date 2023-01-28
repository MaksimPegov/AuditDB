import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'
import { motion } from 'framer-motion'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './AppHeader.scss'

import { selectUser } from 'user/state/user.selectors'
import { UserControl } from 'shared/components/user-contol/UserControl'
import { HeaderLinks } from 'shared/components/header-links/HeaderLinks'
// import { UserNavigate } from 'shared/components/user-navigate/UserNavigate'
import { UserTypeSwitch } from 'shared/components/user-type-switch/UserTypeSwitch'
import { selectUserType } from 'shared/state/shared.selectors'

export const componentId = 'AppHeader'
const bem = cn(componentId)

export const AppHeader: React.FC = () => {
  const actualUserType = useSelector(selectUserType)
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="wrapper">
      <Grid container spacing={2} className={bem()} data-testid={bem()}>
        <Grid xs={3} display="flex">
          <Box className={bem('Logo')} onClick={() => navigate('/main')}>
            <img src="images/AuditDB_logo.png" className={bem('Img')} />
          </Box>
        </Grid>
        <Grid xs={0} md={4.5} display="flex">
          {user === null ? <HeaderLinks navigator={navigate} /> : null}
        </Grid>

        <Grid xs={8} md={4.5} display="flex">
          {user === null ? (
            <motion.div
              className={bem('Buttons')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                color="primary"
                size="small"
                variant="contained"
                className={bem('Button')}
                data-testid={bem('SignIn')}
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </Button>

              <Button
                color="secondary"
                size="small"
                variant="outlined"
                className={bem('Button')}
                data-testid={bem('SignUp')}
                onClick={() => navigate('/sign-up')}
              >
                Sign Up
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={bem('UserPanel')}
            >
              {/* No functional defined for this elements: */}
              {/* <UserNavigate navigator={navigate} /> */}
              <UserControl user={user} />
              <UserTypeSwitch
                userType={actualUserType!}
                setType={dispatch}
                navigator={navigate}
              />
            </motion.div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
