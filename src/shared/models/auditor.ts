import { isNumberLiteral } from '@babel/types'
import { faker } from '@faker-js/faker'

export type AuditorContacts = {
  email: string
  telegram?: string
}

export type Auditor = {
  _id?: string
  about: string
  available: boolean
  company?: string
  contacts: AuditorContacts
  fname: string
  lname: string
  price: number
  tags: string

  createdAt?: string
  updatedAt?: string
}

export const mockedAuditor: Auditor = {
  about:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nunc nisl aliquam nisl, quis aliquam nunc nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nunc nisl aliquam nisl, quis aliquam nunc nisl sit amet nisl.',
  available: true,
  fname: 'Jon',
  lname: 'Doe',
  price: 70,
  contacts: {
    email: 'auditor@dot.com',
    telegram: '@jon_doe_auditor',
  },
  tags: 'bitcoin,crypto,audit',
  createdAt: '2020-01-01',
  updatedAt: '2020-01-01',
}

export const mockAuditor = (): Auditor => {
  return {
    _id: faker.random.alphaNumeric(10),
    about: faker.lorem.paragraph(),
    available: +faker.random.numeric(1) % 2 === 0,
    fname: faker.name.firstName(),
    lname: faker.name.lastName(),
    price: +faker.random.numeric(2),
    contacts: {
      email: faker.internet.email(),
      telegram: faker.internet.userName(),
    },
    tags: faker.random.words(3),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
}
