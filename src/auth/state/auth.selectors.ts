import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

export const selectAuthSlice = (state: AppState) => state.auth

export const selectLogin = createSelector(
  selectAuthSlice,
  (state) => state.spinners.login,
)

export const selectRegistration = createSelector(
  selectAuthSlice,
  (state) => state.spinners.registration,
)
