import { AxiosInstance } from 'axios'

import { MOCK_API, PORT_FOR_CUSTOMERS } from 'app.constants'
import { Project, mockedProject } from 'shared/models/project'
import api from 'app.api'
import { projectAdaptorIn, projectAdaptorOut, ServerProject } from './project.adaptor'

let http: AxiosInstance
const buildApi = () => (http = api(PORT_FOR_CUSTOMERS))

export const create = async (project: Project): Promise<Project> => {
  if (!http) buildApi()
  if (MOCK_API) {
    return new Promise<Project>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          ...mockedProject,
          name: project.name,
          description: project.description,
          status: project.status,
          gitUrl: project.gitUrl,
          gitFolders: project.gitFolders,
        })
      }, 1000)
    })
  }

  try {
    const response = await http.post('/projects', projectAdaptorOut(project))

    return projectAdaptorIn(response.data)
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
}

export const get = async (projectId: string): Promise<Project | null> => {
  if (!http) buildApi()
  if (MOCK_API) {
    return new Promise<Project>((resolve, reject) => {
      setTimeout(() => {
        resolve(mockedProject)
      }, 1000)
    })
  }

  try {
    const response = await http.get(`/projects/project?projectId=${projectId}`)

    return projectAdaptorIn(response.data)
  } catch (e: any) {
    if (e.response.status === 404) {
      return null
    }

    throw new Error(e.response.data.message)
  }
}

export const getMy = async (customerId: string): Promise<Project[]> => {
  if (!http) buildApi()
  if (MOCK_API) {
    return new Promise<Project[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([mockedProject, mockedProject, mockedProject])
      }, 1000)
    })
  }

  try {
    const response = await http.get<ServerProject[]>(
      `/projects/customer?customerId=${customerId}`,
    )

    return response.data.map((p) => projectAdaptorIn(p))
  } catch (e: any) {
    if (e.response.status === 404) {
      return []
    }

    throw new Error(e.response.data.message)
  }
}

export const getAll = async (query: string): Promise<Project[]> => {
  const httpNoAuth = api(PORT_FOR_CUSTOMERS, false)

  if (MOCK_API) {
    return new Promise<Project[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([mockedProject, mockedProject, mockedProject])
      }, 1000)
    })
  }

  try {
    const response = await httpNoAuth.get<ServerProject[]>(`/projects/all`, {
      params: {
        tags: query,
      },
    })

    return response.data.map((p) => projectAdaptorIn(p))
  } catch (e: any) {
    if (e.response.status === 404) {
      return []
    }

    throw new Error(e.response.data.message)
  }
}

export const update = async (project: Project): Promise<Project> => {
  if (!http) buildApi()
  if (MOCK_API) {
    return new Promise<Project>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          ...mockedProject,
          name: project.name,
          description: project.description,
          status: project.status,
          gitUrl: project.gitUrl,
          gitFolders: project.gitFolders,
        })
      }, 1000)
    })
  }

  try {
    const response = await http.patch('/projects', projectAdaptorOut(project), {
      params: {
        projectId: project._id,
      },
    })

    return projectAdaptorIn(response.data)
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
}

export const inviteAuditor = async (
  auditorId: string,
  projectId: string,
): Promise<string> => {
  if (!http) buildApi()
  if (true) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve('Invitation sent')
      }, 1000)
    })
  }

  try {
    await http.post('/projects/invite', null, {
      params: {
        auditorId,
        projectId,
      },
    })

    return 'Invitation sent'
  } catch (e: any) {
    throw new Error(e.response.data.message)
  }
}
