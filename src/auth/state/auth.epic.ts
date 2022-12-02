import { PayloadAction } from '@reduxjs/toolkit'
import { login, registration } from 'auth/api/auth.api'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, from, map, of, switchMap, Observable, tap } from 'rxjs'
import { authActions, authReducer, AuthState } from './auth.reducer'

type Actions = Observable<PayloadAction>
type States = Observable<AuthState>

const registerUser: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(authActions.registration.match),
    switchMap(({ payload }) =>
      from(registration(payload)).pipe(
        map((user) => authActions.registrationSuccess(user)),
        catchError((error) => of(authActions.registrationError(error))),
      ),
    ),
  )

const loginUser: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(authActions.login.match),
    switchMap(({ payload }) =>
      from(login(payload)).pipe(
        map((user) => authActions.loginSuccess(user)),
        catchError((error) => of(authActions.loginError(error))),
      ),
    ),
  )

export const authEpics = combineEpics(registerUser, loginUser)
