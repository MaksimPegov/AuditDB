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
