import axios from 'axios'

import { SERVER, PORT_USERS, MOCK_API } from 'app.constants'
import { RegistrationData } from 'auth/helpers/RegistrationDataCheck'
import { LoginData } from 'auth/helpers/LoginDataCheck'
import { User } from 'shared/models/User'

export const axiosNoAuth = axios.create({
  baseURL: SERVER + ':' + PORT_USERS + '/api',
})

export const axiosForUsers = axios.create({
  baseURL: SERVER + ':' + PORT_USERS + '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

axiosForUsers.interceptors.request.use(
  (config: any) => {
    if (!config.headers['Authorization']) {
      const token = localStorage.getItem('token')
      config.headers['Authorization'] = `Bearer ${token}`
      console.log('Token added to request')
    }
    return config
  },
  (error: any) => Promise.reject(error),
)

export const registration = async (user: RegistrationData): Promise<User> => {
  if (MOCK_API) {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          _id: 1,
          name: user.userName,
          role: user.role,
          email: user.email,
          created: '2021-01-01',
          updated: '2021-01-01',
        })
      }, 1000)
    })
  }

  const response = await axios.post('/users', user)
  debugger
  localStorage.setItem('token', response.data.token)

  return response.data.user
}

export const login = (data: LoginData): Promise<User> =>
  MOCK_API
    ? new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          resolve({
            _id: 1,
            name: data.email,
            email: 'maksim.peg@gmail.com',
            created: '2021-01-01',
            updated: '2021-01-01',
          })
        }, 1000)
      })
    : axiosNoAuth.post('/auth/login', data).then((response) => response.data)
