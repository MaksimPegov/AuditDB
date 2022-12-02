import { PayloadAction } from '@reduxjs/toolkit'
import {
  emailChange,
  login,
  nameChange,
  passwordChange,
  registration,
  userDelit,
} from 'user/api/auth.api'
import { combineEpics, Epic } from 'redux-observable'
import {
  catchError,
  filter,
  from,
  map,
  of,
  switchMap,
  Observable,
  withLatestFrom,
} from 'rxjs'
import { authActions, AuthState } from './auth.reducer'
import { User } from 'shared/models/User'

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

export const changeUserEmail: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(authActions.setUserEmail.match),
    withLatestFrom(state$.pipe(map((state) => state.user as User))),
    switchMap(([{ payload }, user]) =>
      from(emailChange(payload, user?._id)).pipe(
        map((user) => authActions.setUserEmailSuccess(user)),
        catchError((error) => of(authActions.setUserEmailError(error))),
      ),
    ),
  )

export const changeUserName: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(authActions.setUserName.match),
    withLatestFrom(state$.pipe(map((state) => state.user as User))),
    switchMap(([{ payload }, user]) =>
      from(nameChange(payload, user?._id)).pipe(
        map((user) => authActions.setUserNameSuccess(user)),
        catchError((error) => of(authActions.setUserNameError(error))),
      ),
    ),
  )

export const changeUserPassword: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(authActions.setUserPassword.match),
    withLatestFrom(state$.pipe(map((state) => state.user as User))),
    switchMap(([{ payload }, user]) =>
      from(passwordChange(payload, user?._id)).pipe(
        map((user) => authActions.setUserPasswordSuccess(user)),
        catchError((error) => of(authActions.setUserPasswordError(error))),
      ),
    ),
  )

export const deleteUser: Epic = (action$: Actions, state$: States) =>
  action$.pipe(
    filter(authActions.deleteUser.match),
    withLatestFrom(state$.pipe(map((state) => state.user as User))),
    switchMap(([, user]) =>
      from(userDelit(user?._id)).pipe(
        map(() => authActions.deleteUserSuccess()),
        catchError((error) => of(authActions.deleteUserError(error))),
      ),
    ),
  )

export const authEpics = combineEpics(
  registerUser,
  loginUser,
  changeUserEmail,
  changeUserName,
  changeUserPassword,
  deleteUser,
)
