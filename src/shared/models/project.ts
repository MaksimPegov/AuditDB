export type ProjectStatus = 'shown' | 'hidden'

export type Project = {
  _id?: string
  name: string
  description: string
  status: ProjectStatus
  gitUrl: string
  gitFolders: Record<string, string>
  tags: string
  customerId: string
  priceRangeFrom: number
  priceRangeTo: number
  readyToWait: boolean

  createdAt?: string
  updatedAt?: string
}

export const mockedProject: Project = {
  _id: '1',
  name: 'Project 1',
  description: 'Project 1 description',
  status: 'shown',
  gitUrl: 'https://mygit.com/project1.git',
  gitFolders: {
    'src/crypto': 'crypto data for project 1',
    'src/public': 'public data for project 1',
  },
  tags: 'tag1,tag2',
  customerId: '1',
  priceRangeFrom: 25,
  priceRangeTo: 50,
  readyToWait: true,

  createdAt: '2021-01-01',
  updatedAt: '2021-01-01',
}
