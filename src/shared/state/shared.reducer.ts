import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../models/User'

export type SharedState = {
  user: User | null
}

export const initialSharedState: SharedState = {
  user: null,
}

export const sharedSlice = createSlice({
  name: 'shared',
  initialState: initialSharedState,
  reducers: {
    resetState: (state, action: PayloadAction<string>) => initialSharedState,
  },
})

export const sharedReducer = sharedSlice.reducer
export const sharedActions = sharedSlice.actions
