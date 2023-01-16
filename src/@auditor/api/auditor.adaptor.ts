import { Auditor, AuditorContacts } from 'shared/models/auditor'

export type ServerAuditor = {
  about: string
  tags: string[]
  contacts: AuditorContacts
  fname: string
  lname: string
  price: number
}

export const auditorAdaptorIn = (auditor: ServerAuditor): Auditor => ({
  ...auditor,
  tags: auditor.tags.toString(),
})

export const auditorAdaptorOut = (auditor: Auditor): ServerAuditor => ({
  ...auditor,
  tags: auditor.tags.split(','),
})
