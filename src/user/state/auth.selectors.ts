import { createSelector } from '@reduxjs/toolkit'
import { AppState } from 'app.store'

export const selectAuthSlice = (state: AppState) => state.auth

export const selectLogin = createSelector(
  selectAuthSlice,
  (state) => state.spinners.login,
)

export const selectRegistration = createSelector(
  selectAuthSlice,
  (state) => state.spinners.registration,
)

export const selectUser = createSelector(selectAuthSlice, (state) => state.user)
