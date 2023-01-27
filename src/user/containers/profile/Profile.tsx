import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Tooltip,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'
import { User } from 'shared/models/user'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircleOutline, ModeEdit } from '@mui/icons-material'

import { userActions } from 'user/state/user.reducer'
import { selectUser } from 'user/state/user.selectors'
import './Profile.scss'

const componentId = 'Profile'
const bem = cn(componentId)

export const Profile: React.FC = () => {
  const user = useSelector(selectUser) as User
  const dispatch = useDispatch()
  const [name, setName] = useState(user.name)
  const [changName, setChangeName] = useState<Boolean>(false)

  const editUsername = (): void => {
    setChangeName((prev) => !prev)

    if (changName && name !== user.name) {
      dispatch(userActions.setUserName(name))
    }
  }

  const handleDelete = (): void => {
    dispatch(userActions.userDelete())
  }

  const handleChangePassword = (): void => {}

  const nameEditHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value)
  }

  return (
    <motion.div
      className="motion-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Grid container spacing={2} className={bem()}>
        <span className={bem('Title')}>User profile</span>

        <Grid xs={12} md={12} lg={3} display="flex">
          <Avatar className={bem('Avatar')}>
            {user.name.substring(0, 1).toUpperCase()}
          </Avatar>
          {/* <span
              className={bem('EditAvatar')}
              variant="caption"
              onClick={() => {
                console.log('avatar change')
              }}
            >
              Edit
            </span> */}
        </Grid>

        <Grid xs={12} md={12} lg={9}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <InputLabel htmlFor="username-input" classes={{ root: bem('InputLabel') }}>
                User name
              </InputLabel>

              <InputBase
                id="username-input"
                className={bem('Input', { disabled: !changName })}
                onChange={nameEditHandler}
                defaultValue={user.name}
                disabled={!changName}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title={changName ? 'save' : 'edit'}>
                      <IconButton
                        classes={{ root: bem('IconButton') }}
                        tabIndex={-1}
                        aria-label="toggle password visibility"
                        onClick={editUsername}
                      >
                        {!changName ? <ModeEdit /> : <CheckCircleOutline />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>

          <Grid xs={12}>
            <InputLabel htmlFor="email-input" classes={{ root: bem('InputLabel') }}>
              E-mail
            </InputLabel>

            <InputBase
              id="email-input"
              className={bem('Input', { disabled: true })}
              defaultValue={user.email}
              disabled
            />
          </Grid>
        </Grid>

        {/* <Grid xs={12} md={12} lg={6} display="flex" justifyContent="center">
          <Button
            className={bem('Button', { Password: true })}
            variant="contained"
            onClick={handleChangePassword}
          >
            change password
          </Button>
        </Grid> */}

        <Grid xs={12} md={12} lg={12} display="flex" justifyContent="center">
          <Button
            className={bem('Button', { Delete: true })}
            variant="contained"
            onClick={handleDelete}
          >
            delete account
          </Button>
        </Grid>
      </Grid>
    </motion.div>
  )
}
