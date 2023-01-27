import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Audit } from 'shared/models/audit'
import { Auditor } from 'shared/models/auditor'

export type AuditorState = {
  auditorPage: {
    audits: Audit[]
    auditor: Auditor | null
    processing: {
      auditor: boolean
      audits: boolean
      auditorError: string
      auditorSuccess: string
    }
  }
}

const initialAuditorState: AuditorState = {
  auditorPage: {
    audits: [],
    auditor: null,
    processing: {
      audits: false,
      auditor: false,
      auditorError: '',
      auditorSuccess: '',
    },
  },
}

export const auditorSlice = createSlice({
  name: 'auditor',
  initialState: initialAuditorState,
  reducers: {
    resetAuditorState: (state, action: Action) => {
      state = initialAuditorState
    },
    loadAuditorData(state, action: PayloadAction) {
      state.auditorPage.processing.auditor = true
      state.auditorPage.processing.auditorError = ''
      state.auditorPage.processing.auditorSuccess = ''
    },
    loadAuditorDataSuccess(state, action: PayloadAction<Auditor | null>) {
      state.auditorPage.auditor = action.payload
      state.auditorPage.processing.auditor = false
    },
    loadAuditorDataFail(state, action: PayloadAction<string>) {
      state.auditorPage.processing.auditor = false
      state.auditorPage.processing.auditorError = action.payload
    },

    loadAuditsForAuditor(state, action: PayloadAction) {
      state.auditorPage.processing.audits = true
    },
    loadAuditsForAuditorSuccess(state, action: PayloadAction<Audit[]>) {
      state.auditorPage.processing.audits = false
      state.auditorPage.audits = action.payload
    },
    loadAuditsForAuditorFail(state, action: PayloadAction<string>) {
      state.auditorPage.processing.audits = false
    },

    createAuditor(state, action: PayloadAction<Auditor>) {
      state.auditorPage.processing.auditor = true
      state.auditorPage.processing.auditorError = ''
      state.auditorPage.processing.auditorSuccess = ''
    },
    createAuditorSuccess(state, action: PayloadAction<Auditor>) {
      state.auditorPage.auditor = action.payload
      state.auditorPage.processing.auditor = false
      state.auditorPage.processing.auditorSuccess = 'Auditor created successfully'
    },
    createAuditorFail(state, action: PayloadAction<string>) {
      state.auditorPage.processing.auditor = false
      state.auditorPage.processing.auditorError = action.payload
    },

    updateAuditor(state, action: PayloadAction<Auditor>) {
      state.auditorPage.processing.auditor = true
      state.auditorPage.processing.auditorError = ''
      state.auditorPage.processing.auditorSuccess = ''
    },
    updateAuditorSuccess(state, action: PayloadAction<Auditor>) {
      state.auditorPage.auditor = action.payload
      state.auditorPage.processing.auditor = false
      state.auditorPage.processing.auditorSuccess = 'Auditor updated successfully'
    },
    updateAuditorFail(state, action: PayloadAction<string>) {
      state.auditorPage.processing.auditor = false
      state.auditorPage.processing.auditorError = action.payload
    },

    deleteAuditor(state, action: PayloadAction<string>) {
      state.auditorPage.processing.auditor = true
      state.auditorPage.processing.auditorError = ''
      state.auditorPage.processing.auditorSuccess = ''
    },
    deleteAuditorSuccess(state, action: Action) {
      state.auditorPage.processing.auditor = false
      state.auditorPage.auditor = null
      state.auditorPage.processing.auditorSuccess = 'Auditor deleted successfully'
    },
    cleanSuccessMessage(state, action: Action) {
      state.auditorPage.processing.auditorSuccess = ''
    },

    deleteAuditorFail(state, action: PayloadAction<string>) {
      state.auditorPage.processing.auditor = false
      state.auditorPage.processing.auditorError = action.payload
    },
  },
})

export const auditorReducer = auditorSlice.reducer
export const auditorActions = auditorSlice.actions
