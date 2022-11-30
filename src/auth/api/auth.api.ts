import { RegistrationData } from 'auth/helpers/RegistrationDataCheck'
import { User } from 'shared/models/User'

export const registration = (user: RegistrationData): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        _id: 1,
        name: 'maksim',
        email: 'maksim.peg@gmail.com',
        created: '2021-01-01',
        updated: '2021-01-01',
      })
    }, 5000)
  })
}
