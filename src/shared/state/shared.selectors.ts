import { createSelector } from '@reduxjs/toolkit'
import { AppState } from 'app.store'

export const selectSharedSlice = (state: AppState) => state.shared
