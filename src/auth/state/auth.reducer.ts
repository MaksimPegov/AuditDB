import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RegistrationData } from 'auth/helpers/RegistrationDataCheck'
import { User } from 'shared/models/User'

export type AuthState = {
  user: User | null
  spiners: {
    login: boolean
    registration: boolean
  }
}

export const initialAuthState: AuthState = {
  user: null,
  spiners: {
    login: false,
    registration: false,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    resetAuth: (state, action: PayloadAction<string>) => initialAuthState,
    login: (state, action: PayloadAction<User>) => {
      state.spiners.login = true
    },

    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.spiners.login = false
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.spiners.login = false
    },

    registration: (state, action: PayloadAction<RegistrationData>) => {
      state.spiners.registration = true
    },
    registrationSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.spiners.registration = false
    },
    registrationError: (state, action: PayloadAction<string>) => {
      state.spiners.registration = false
    },
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
