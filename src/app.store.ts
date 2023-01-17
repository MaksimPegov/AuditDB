import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { configureStore, PayloadAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { Observable } from 'rxjs'

import { userEpics } from 'user/state/user.epic'
import { sharedEpics } from 'shared/state/shared.epics'
import { auditorEpics } from '@auditor/state/auditor.epics'
import { customerEpics } from '@customer/state/customer.epics'
import { userReducer, UserState } from 'user/state/user.reducer'
import { sharedReducer, SharedState } from 'shared/state/shared.reducer'
import { auditorReducer, AuditorState } from '@auditor/state/auditor.reducer'
import { customerReducer, CustomerState } from '@customer/state/customer.reducer'

export type AppState = {
  user: UserState
  shared: SharedState
  customer: CustomerState
  auditor: AuditorState
}

export type Action$ = Observable<PayloadAction>
export type State$ = Observable<AppState>

const epicMiddleware = createEpicMiddleware()
const epics = combineEpics(userEpics, sharedEpics, customerEpics, auditorEpics)

export const createRootReducer = () =>
  combineReducers({
    user: userReducer,
    shared: sharedReducer,
    customer: customerReducer,
    auditor: auditorReducer,
  })

export const store = configureStore({
  reducer: createRootReducer(),
  middleware: [epicMiddleware],
})

export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

epicMiddleware.run(epics)
