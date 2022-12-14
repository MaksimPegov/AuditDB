import { combineEpics, Epic } from 'redux-observable'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  withLatestFrom,
  Observable,
  catchError,
  switchMap,
  filter,
  from,
  map,
  of,
} from 'rxjs'

import * as api from 'user/api/user.api'
import { User } from 'shared/models/User'
import { userActions, UserState } from 'user/state/user.reducer'
import { sharedActions } from 'shared/state/shared.reducer'

type Actions = Observable<PayloadAction>
type States = Observable<UserState>

const registerUser: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(userActions.registration.match),
    switchMap(({ payload }) =>
      from(api.create(payload)).pipe(
        map(() => userActions.registrationSuccess()),
        catchError((error) => of(userActions.registrationError(error.message))),
      ),
    ),
  )

const loginUser: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(userActions.login.match),
    switchMap(({ payload }) =>
      from(api.login(payload)).pipe(
        map((user) => userActions.loginSuccess(user)),
        catchError((error) => of(userActions.loginError(error.message))),
      ),
    ),
  )

export const changeUserName: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(userActions.setUserName.match),
    withLatestFrom(state$.pipe(map((state) => state.user as User))),
    switchMap(([{ payload }, user]) =>
      from(api.changeName(payload)).pipe(
        map((user) => userActions.setUserNameSuccess(user)),
        catchError((error) => of(userActions.setUserNameError(error))),
      ),
    ),
  )

export const changeUserPassword: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(userActions.setUserPassword.match),
    withLatestFrom(state$.pipe(map((state) => state.user as User))),
    switchMap(([{ payload }, user]) =>
      from(api.changePassword(payload, user?.email)).pipe(
        map((user) => userActions.setUserPasswordSuccess(user)),
        catchError((error) => of(userActions.setUserPasswordError(error))),
      ),
    ),
  )

export const deleteCurrentUser: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(userActions.userDelete.match),
    withLatestFrom(state$.pipe(map((state) => state.user as User))),
    switchMap(([, user]) =>
      from(api.remove()).pipe(
        map(() => userActions.userDeleteSuccess()),
        catchError((error) => of(userActions.userDeleteError(error))),
      ),
    ),
  )

export const setAccountTypePreferences: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(sharedActions.setUserPreferences.match),
    map(({ payload }) => userActions.setAccountTypePreferences(payload)),
  )

export const restoreUserInfo: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(userActions.restoreUserInfo.match),
    switchMap(() =>
      from(api.restore()).pipe(
        map((user) => userActions.restoreUserInfoSuccess(user)),
        catchError((error) => of(userActions.restoreUserInfoError(error))),
      ),
    ),
  )

export const userEpics = combineEpics(
  loginUser,
  registerUser,
  changeUserName,
  restoreUserInfo,
  deleteCurrentUser,
  changeUserPassword,
  setAccountTypePreferences,
)
