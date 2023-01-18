import { Auditor, AuditorContacts } from 'shared/models/auditor'

export type ServerAuditor = {
  about: string
  available: boolean
  tags: string[]
  contacts: AuditorContacts
  fname: string
  lname: string
  price: number
}

export const auditorAdaptorIn = (auditor: ServerAuditor): Auditor => ({
  ...auditor,
  available: true, // TODO: remove this line after server will be ready
  tags: auditor.tags.toString(),
})

export const auditorAdaptorOut = (auditor: Auditor): ServerAuditor => ({
  ...auditor,
  tags: auditor.tags.split(','),
})
