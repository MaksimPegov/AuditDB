import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Customer } from 'shared/models/customer'
import { Project } from 'shared/models/project'
import { Audit } from 'shared/models/audit'
import { Auditor } from 'shared/models/auditor'

export type CustomerState = {
  customerPage: {
    audits: Audit[]
    projects: Project[]
    customer: Customer | null
    loaders: {
      audits: boolean
      projects: boolean
      customer: boolean
    }
    processing: {
      customer: boolean
      customerError: string
      customerSuccess: string
    }
  }

  projectPage: {
    audits: Audit[]
    auditors: Auditor[]
    isNewProject: boolean
    customerIdForProject: string
    projectIdForProject: string
    project: Project | null
    loader: boolean
    processing: {
      project: boolean
      projectError: string
      projectSuccess: string
      projectAudits: boolean
      projectAuditsSuccess: string
      projectAuditsError: string

      auditorSearch: boolean
      auditorSearchError: string
      auditorSearchSuccess: string

      inviteAuditor: boolean
      inviteAuditorError: string
      inviteAuditorSuccess: string
    }
  }
}

const initialCustomerState: CustomerState = {
  customerPage: {
    audits: [],
    customer: null,
    projects: [],
    loaders: {
      audits: false,
      customer: false,
      projects: false,
    },
    processing: {
      customer: false,
      customerError: '',
      customerSuccess: '',
    },
  },
  projectPage: {
    audits: [],
    auditors: [],
    isNewProject: false,
    customerIdForProject: '',
    projectIdForProject: '',
    project: null,
    loader: false,
    processing: {
      project: false,
      projectError: '',
      projectSuccess: '',

      projectAudits: false,
      projectAuditsSuccess: '',
      projectAuditsError: '',

      auditorSearch: false,
      auditorSearchError: '',
      auditorSearchSuccess: '',

      inviteAuditor: false,
      inviteAuditorError: '',
      inviteAuditorSuccess: '',
    },
  },
}

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialCustomerState,
  reducers: {
    resetCustomerState: (state, action: Action) => {
      state = initialCustomerState
    },
    // #region Customer Page
    loadCustomerData(state, action: Action) {
      state.customerPage.loaders.customer = true
      state.customerPage.processing.customerError = ''
      state.customerPage.processing.customerSuccess = ''
    },
    loadCustomerDataSuccess(state, action: PayloadAction<Customer | null>) {
      state.customerPage.customer = action.payload
      state.customerPage.loaders.customer = false
    },
    loadCustomerDataFail(state, action: PayloadAction<string>) {
      state.customerPage.loaders.customer = false
      state.customerPage.processing.customerError = action.payload
    },

    createCustomer(state, action: PayloadAction<Customer>) {
      state.customerPage.processing.customer = true
      state.customerPage.processing.customerError = ''
      state.customerPage.processing.customerSuccess = ''
    },
    createCustomerSuccess(state, action: PayloadAction<Customer>) {
      state.customerPage.customer = action.payload
      state.customerPage.processing.customer = false
      state.customerPage.processing.customerSuccess = 'Customer created successfully'
    },
    createCustomerFail(state, action: PayloadAction<string>) {
      state.customerPage.processing.customer = false
      state.customerPage.processing.customerError = action.payload
    },

    updateCustomer(state, action: PayloadAction<Customer>) {
      state.customerPage.processing.customer = true
      state.customerPage.processing.customerError = ''
      state.customerPage.processing.customerSuccess = ''
    },
    updateCustomerSuccess(state, action: PayloadAction<Customer>) {
      state.customerPage.customer = action.payload
      state.customerPage.processing.customer = false
      state.customerPage.processing.customerSuccess = 'Customer updated successfully'
    },
    updateCustomerFail(state, action: PayloadAction<string>) {
      state.customerPage.processing.customer = false
      state.customerPage.processing.customerError = action.payload
    },

    deleteCustomer(state, action: PayloadAction<string>) {
      state.customerPage.processing.customer = true
      state.customerPage.processing.customerError = ''
      state.customerPage.processing.customerSuccess = ''
    },
    deleteCustomerSuccess(state, action: Action) {
      state.customerPage.processing.customer = false
      state.customerPage.processing.customerSuccess = 'Customer deleted successfully'
    },
    cleanSuccessMessage(state, action: Action) {
      state.customerPage.processing.customerSuccess = ''
    },
    deleteCustomerFail(state, action: PayloadAction<string>) {
      state.customerPage.processing.customer = false
      state.customerPage.processing.customerError = action.payload
    },

    loadCustomerProjects(state, action: PayloadAction) {
      state.customerPage.loaders.projects = true
      state.projectPage = initialCustomerState.projectPage
    },
    loadCustomerProjectsSuccess(state, action: PayloadAction<Project[]>) {
      state.customerPage.projects = action.payload
      state.customerPage.loaders.projects = false
    },
    loadCustomerProjectsFail(state, action: PayloadAction<string>) {
      state.customerPage.loaders.projects = false
    },

    loadAuditsForCustomer(state, action: Action) {
      state.customerPage.loaders.audits = true
    },
    loadAuditsForCustomerSuccess(state, action: PayloadAction<Audit[]>) {
      state.customerPage.audits = action.payload
      state.customerPage.loaders.audits = false
    },
    loadAuditsForCustomerFail(state, action: PayloadAction<string>) {
      state.customerPage.loaders.audits = false
    },

    addProject(state, action: Action) {},
    editProject(state, action: PayloadAction<Project>) {},
    removeProject(state, action: PayloadAction<string>) {},

    // #endregion

    // #region Project Page
    loadProject(state, action: PayloadAction<string>) {
      state.projectPage.loader = true
      state.projectPage.processing.projectError = ''
      state.projectPage.processing.projectSuccess = ''
    },
    loadProjectSuccess(state, action: PayloadAction<Project | null>) {
      state.projectPage.project = action.payload
      state.projectPage.loader = false
    },
    loadProjectFail(state, action: PayloadAction<string>) {
      state.projectPage.loader = false
      state.projectPage.processing.projectError = action.payload
    },

    createProject(state, action: PayloadAction<Project>) {
      state.projectPage.processing.project = true
      state.projectPage.processing.projectError = ''
      state.projectPage.processing.projectSuccess = ''
    },
    createProjectSuccess(state, action: PayloadAction<Project>) {
      state.projectPage.project = action.payload
      state.projectPage.processing.project = false
      state.projectPage.processing.projectSuccess = 'Project created successfully'
    },
    createProjectFail(state, action: PayloadAction<string>) {
      state.projectPage.processing.project = false
      state.projectPage.processing.projectError = action.payload
    },

    updateProject(state, action: PayloadAction<Project>) {
      state.projectPage.processing.project = true
      state.projectPage.processing.projectError = ''
      state.projectPage.processing.projectSuccess = ''
    },
    updateProjectSuccess(state, action: PayloadAction<Project>) {
      state.projectPage.project = action.payload
      state.projectPage.processing.project = false
      state.projectPage.processing.projectSuccess = 'Project updated successfully'
    },
    updateProjectFail(state, action: PayloadAction<string>) {
      state.projectPage.processing.project = false
      state.projectPage.processing.projectError = action.payload
    },

    deleteProject(state, action: PayloadAction<string>) {
      state.projectPage.processing.project = true
      state.projectPage.processing.projectError = ''
      state.projectPage.processing.projectSuccess = ''
    },

    setCustomerDataForProject(state, action: PayloadAction<[string, string]>) {
      state.projectPage.customerIdForProject = action.payload[0]
      state.projectPage.projectIdForProject = action.payload[1]
      state.projectPage.isNewProject = !action.payload[1]
    },

    loadAuditsForProject(state, action: Action) {
      state.projectPage.processing.projectAudits = true
      state.projectPage.processing.projectAuditsError = ''
      state.projectPage.processing.projectAuditsSuccess = ''
    },
    loadAuditsForProjectSuccess(state, action: PayloadAction<Audit[]>) {
      state.projectPage.audits = action.payload
      state.projectPage.processing.projectAudits = false
    },
    loadAuditsForProjectFail(state, action: PayloadAction<string>) {
      state.projectPage.processing.projectAudits = false
      state.projectPage.processing.projectAuditsError = action.payload
    },

    searchForAuditors(state, action: PayloadAction<string>) {
      state.projectPage.auditors = []
      state.projectPage.processing.auditorSearch = true
      state.projectPage.processing.auditorSearchError = ''
      state.projectPage.processing.auditorSearchSuccess = ''
    },
    searchForAuditorsSuccess(state, action: PayloadAction<Auditor[]>) {
      state.projectPage.auditors = action.payload
      state.projectPage.processing.auditorSearch = false
      state.projectPage.processing.auditorSearchSuccess = 'Auditors loaded successfully'
    },
    searchForAuditorsFail(state, action: PayloadAction<string>) {
      state.projectPage.processing.auditorSearch = false
      state.projectPage.processing.auditorSearchError = action.payload
    },

    inviteAuditor(state, action: PayloadAction<string>) {
      state.projectPage.processing.inviteAuditor = true
      state.projectPage.processing.inviteAuditorError = ''
      state.projectPage.processing.inviteAuditorSuccess = ''
    },
    inviteAuditorSuccess(state, action: PayloadAction<string>) {
      state.projectPage.processing.inviteAuditor = false
      state.projectPage.processing.inviteAuditorSuccess = 'Auditor invited successfully'
    },
    inviteAuditorFail(state, action: PayloadAction<string>) {
      state.projectPage.processing.inviteAuditor = false
      state.projectPage.processing.inviteAuditorError = action.payload
    },
    // #endregion
  },
})

export const customerReducer = customerSlice.reducer
export const customerActions = customerSlice.actions
