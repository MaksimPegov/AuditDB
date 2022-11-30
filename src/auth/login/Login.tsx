import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import {
  TextField,
  Box,
  Link,
  Button,
  InputAdornment,
  IconButton,
  Input,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material'
import {
  MailOutline,
  VpnKey,
  VisibilityOff,
  Visibility,
  Login as LoginIcon,
} from '@mui/icons-material'
import './Login.scss'

import { useNavigate } from 'react-router-dom'
import { onlySpaces } from 'shared/helpers/dataValodation'
import { RegistrationData, userDataValidation } from 'auth/helpers/RegistrationDataCheck'
import { cn } from '@bem-react/classname'
import { loginDataValidation } from 'auth/helpers/LoginDataCheck'

const componentId = 'Login'
const bem = cn(componentId)

export const Login: React.FC = () => {
  const [state, setState] = React.useState({
    emailError: false,
    passwordError: false,
    showPassword: false,
    canLog: false,
    errorMessage: '',
  })
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (
      userData.email.length > 0 &&
      userData.password.length > 0 &&
      !onlySpaces(userData.email) &&
      !onlySpaces(userData.password)
    ) {
      setState((old) => ({ ...old, canLog: true }))
    } else {
      setState((old) => ({ ...old, canLog: false }))
    }
  }, [userData])

  const hidePassword = (): void => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }))
  }
  const hadnleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData((prevState) => ({
      ...prevState,
      email: event.target.value.trim(),
    }))
    setState((prevState) => ({
      ...prevState,
      emailError: false,
    }))
  }
  const hadnlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData((prevState) => ({
      ...prevState,
      password: event.target.value.trim(),
    }))
    setState((prevState) => ({
      ...prevState,
      passwordError: false,
    }))
  }

  const handleLogin = (): void => {
    let resp = loginDataValidation(userData)

    if (resp.status) {
      console.log('login')
    } else if (!resp.status && resp.emailError) {
      console.log(resp.message)
      setState((old) => ({
        ...old,
        emailError: resp.emailError,
        errorMessage: resp.message,
      }))
    } else if (!resp.status && resp.passwordError) {
      console.log(resp.message)
      setState((old) => ({
        ...old,
        passwordError: resp.passwordError,
        errorMessage: resp.message,
      }))
    } else {
      console.log('Something went wrong')
    }
  }

  return (
    <motion.div
      className={bem()}
      data-testid={bem()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={bem('Container')} data-testid={bem('Container')}>
        <div className={bem('Container-Header')}>
          <LoginIcon sx={{ m: 'auto', pr: 1, fontSize: 30 }} />{' '}
          <div className={bem('Container-Header-text')}>Autorization</div>
        </div>

        <form autoComplete="off">
          <Box
            className={bem('Container-email')}
            data-testid={bem('Container-email')}
            sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}
          >
            <MailOutline sx={{ color: 'action.active', mr: 1.5, my: 0.5 }} />
            <TextField
              id="standard-basic"
              label="E-mail"
              error={state.emailError}
              variant="standard"
              sx={{ width: '100%' }}
              onChange={hadnleEmailChange}
            />
          </Box>

          <Box
            className={bem('Container-password')}
            sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}
          >
            <VpnKey sx={{ color: 'action.active', mr: 1.5, my: 0.5 }} />

            <FormControl sx={{ width: '100%' }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                error={state.passwordError}
              >
                Password
              </InputLabel>

              <Input
                id="standard-adornment-password"
                type={state.showPassword ? 'text' : 'password'}
                error={state.passwordError}
                onChange={hadnlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex={-1}
                      aria-label="toggle password visibility"
                      onClick={hidePassword}
                    >
                      {state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </form>

        <Button
          className={bem('Container-button')}
          variant="contained"
          color={'info'}
          disabled={!state.canLog}
          sx={{ mt: 4 }}
          onClick={handleLogin}
        >
          Sign in
        </Button>

        {state.emailError || state.passwordError ? (
          <Alert className={bem('Container-Error')} severity="error">
            {state.errorMessage}
          </Alert>
        ) : null}
      </div>
    </motion.div>
  )
}
