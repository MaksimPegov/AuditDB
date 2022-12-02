import { PayloadAction } from '@reduxjs/toolkit'
import { authActions } from 'user/state/auth.reducer'
import { combineEpics, Epic } from 'redux-observable'
import { filter, map, Observable } from 'rxjs'
import { SharedState } from './shared.reducer'

type Actions = Observable<PayloadAction>
type States = Observable<SharedState>

export const saveUserAfterLogin: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(authActions.loginSuccess.match),
    map(({ payload }) => authActions.setUser(payload)),
  )

export const saveUserAfterRegistration: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(authActions.registrationSuccess.match),
    map(({ payload }) => authActions.setUser(payload)),
  )

export const sharedEpics = combineEpics(saveUserAfterLogin, saveUserAfterRegistration)
