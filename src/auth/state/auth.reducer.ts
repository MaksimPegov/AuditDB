import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginData } from 'auth/helpers/LoginDataCheck'
import { RegistrationData } from 'auth/helpers/RegistrationDataCheck'
import { User } from 'shared/models/User'

export type AuthState = {
  user: User | null
  spinners: {
    login: boolean
    registration: boolean
  }
}

export const initialAuthState: AuthState = {
  user: null,
  spinners: {
    login: false,
    registration: false,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    resetAuth: (state, action: PayloadAction<string>) => initialAuthState,

    login: (state, action: PayloadAction<LoginData>) => {
      state.spinners.login = true
    },

    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.spinners.login = false
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.spinners.login = false
    },

    registration: (state, action: PayloadAction<RegistrationData>) => {
      state.spinners.registration = true
    },
    registrationSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.spinners.registration = false
    },
    registrationError: (state, action: PayloadAction<string>) => {
      state.spinners.registration = false
    },
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
