import { AxiosInstance } from 'axios'

import api from 'app.api'
import { PORT_FOR_AUDITS } from 'app.constants'
import { Audit, mockAudit } from 'shared/models/audit'
import { AccountType } from 'shared/models/user'

let http: AxiosInstance
const MOCK_API = true
const buildApi = () => (http = api(PORT_FOR_AUDITS))

export const create = async (audit: Audit): Promise<Audit> => {
  if (!http) buildApi()
  if (MOCK_API) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          ...audit,
          _id: '1',
        })
      }, 1000)
    })
  }

  try {
    const response = await http.post('/audits', audit)

    return response.data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
}

export const get = async (auditId: string): Promise<Audit | null> => {
  if (!http) buildApi()
  if (MOCK_API) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve(mockAudit())
      }, 1000)
    })
  }

  try {
    const response = await http.get<Audit>(`/audits/${auditId}`)

    return response.data
  } catch (e: any) {
    if (e.response.status === 404) {
      return null
    }

    throw new Error(e.response.data.message)
  }
}

export const getMyAudits = async (
  accountType: AccountType,
  id: string,
): Promise<Audit[]> => {
  if (!http) buildApi()
  if (MOCK_API) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve([mockAudit(), mockAudit(), mockAudit(), mockAudit()])
      }, 1000)
    })
  }

  try {
    const response = await http.get<Audit[]>('/audits', {
      params: {
        accountType,
        id,
      },
    })

    return response.data
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
}
