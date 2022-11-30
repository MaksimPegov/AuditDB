import { PayloadAction } from '@reduxjs/toolkit'
import { registration } from 'auth/api/auth.api'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, from, map, of, switchMap, Observable } from 'rxjs'
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

export const authEpics = combineEpics(registerUser)
