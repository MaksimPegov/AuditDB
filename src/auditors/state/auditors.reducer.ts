import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuditorsState = {
  auditors: []
}

const initialAuditorsState: AuditorsState = {
  auditors: [],
}

export const auditorsSlice = createSlice({
  name: 'auditors',
  initialState: initialAuditorsState,
  reducers: {
    resetAuditors: (state, action: PayloadAction<string>) => initialAuditorsState,
  },
})

export const auditorsReducer = auditorsSlice.reducer
export const auditorsActions = auditorsSlice.actions
