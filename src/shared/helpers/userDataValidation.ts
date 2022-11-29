import { inputValidator, onlySpaces, validateEmail } from './dataValodation'

export type UserData = {
  email: string
  password: string
}
export type UserDataStatus = {
  status: boolean
  emailError: boolean
  passwordError: boolean
  message: string
}

export const userDataValidation = (user: UserData): UserDataStatus => {
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
  } else if (user.email.includes(' ')) {
    response.message = 'You cant use spaces in e-mail'
    response.emailError = true
  } else if (user.password.includes(' ')) {
    response.message = 'You cant use spaces in password'
    response.passwordError = true
  } else if (!user.email || onlySpaces(user.email)) {
    response.message = 'Email is required'
    response.emailError = true
  } else if (!user.password || onlySpaces(user.password)) {
    response.message = 'Password is required'
    response.passwordError = true
  } else if (user.password.length < 6) {
    response.message = 'Password must be at least 6 characters'
    response.passwordError = true
  } else if (user.password.length > 30) {
    response.message = 'Password cant be longer 30 characters'
    response.passwordError = true
  } else if (!validateEmail(user.email)) {
    response.message = 'Email is not valid'
    response.emailError = true
  } else {
    response.status = true
    response.message = 'User data is valid'
  }
  return response
}

