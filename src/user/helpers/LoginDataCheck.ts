import { inputValidator, validateEmail } from 'shared/helpers/dataValodation'

export type LoginData = {
  email: string
  password: string
}

export type LoginDataStatus = {
  status: boolean
  emailError: boolean
  passwordError: boolean
  message: string
}

export const loginDataValidation = (user: LoginData): LoginDataStatus => {
  const response = {
    status: false,
    emailError: false,
    passwordError: false,
    message: 'User data is not valid',
  }
  const emailCheck = inputValidator(user.email)
  const passwordCheck = inputValidator(user.password)

  if (!emailCheck.status) {
    response.message = emailCheck.message
    response.emailError = true
  } else if (!passwordCheck.status) {
    response.message = passwordCheck.message
    response.passwordError = true
  } else if (!validateEmail(user.email)) {
    response.message = 'Email is invalid'
    response.emailError = true
  } else if (user.password.length < 6) {
    response.message = 'Password must be at least 6 characters'
    response.passwordError = true
  } else if (user.password.length > 30) {
    response.message = 'Password cant be longer 30 characters'
    response.passwordError = true
  } else {
    response.status = true
    response.message = 'User data is valid'
  }
  return response
}
