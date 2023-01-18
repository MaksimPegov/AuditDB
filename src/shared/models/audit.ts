import { faker } from '@faker-js/faker'

export type AuditStatus = 'pending' | 'in_progress' | 'finalized' | 'archived' | 'error'

export type Audit = {
  _id: string

  auditorId: string
  auditorName: string
  customerId: string
  customerName: string
  projectId: string
  projectName: string

  dateEnd: string
  dateStart: string

  auditorCompany: string
  auditorEmail: string
  auditorTelegram: string
  rate: string
  status: AuditStatus
  tags: string
}

export const mockAudit = (): Audit => ({
  _id: faker.random.alphaNumeric(10),
  auditorId: faker.random.alphaNumeric(10),
  auditorName: faker.random.words(2),
  customerId: faker.random.alphaNumeric(10),
  customerName: faker.random.words(2),
  projectId: faker.random.alphaNumeric(10),
  projectName: faker.random.words(1),
  dateEnd: faker.date.future().toDateString(),
  dateStart: faker.date.past().toISOString(),
  auditorCompany: faker.company.name(),
  auditorEmail: faker.internet.email(),
  auditorTelegram: faker.internet.email(),
  rate: faker.random.numeric(2),
  status: 'pending',
  tags: faker.random.words(1) + ',' + faker.random.words(1),
})
