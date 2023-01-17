import { catchError, filter, from, map, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { combineEpics, Epic } from 'redux-observable'

import * as auditApi from 'shared/api/audit.api'
import * as auditorApi from '@auditor/api/auditor.api'
import { userActions } from 'user/state/user.reducer'
import { selectAuditor } from './auditor.selectors'
import { auditorActions } from '@auditor/state/auditor.reducer'
import { Action$, State$ } from 'app.store'

const loadAuditor: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(auditorActions.loadAuditorData.match),
    switchMap(() =>
      from(auditorApi.get()).pipe(
        map((auditor) => auditorActions.loadAuditorDataSuccess(auditor)),
        catchError((error) => of(auditorActions.loadAuditorDataFail(error.message))),
      ),
    ),
  )

const createAuditor: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(auditorActions.createAuditor.match),
    switchMap(({ payload }) =>
      from(auditorApi.create(payload)).pipe(
        map((auditor) => auditorActions.createAuditorSuccess(auditor)),
        catchError((error) => of(auditorActions.createAuditorFail(error.message))),
      ),
    ),
  )

const updateAuditor: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(auditorActions.updateAuditor.match),
    switchMap(({ payload }) =>
      from(auditorApi.update(payload)).pipe(
        map((auditor) => auditorActions.updateAuditorSuccess(auditor)),
        catchError((error) => of(auditorActions.updateAuditorFail(error.message))),
      ),
    ),
  )

const loadAuditsForAuditor: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(auditorActions.loadAuditsForAuditor.match),
    withLatestFrom(state$.pipe(map(selectAuditor))),
    switchMap(([, auditor]) =>
      from(auditApi.getMyAudits('auditor', auditor!._id!)).pipe(
        map((audits) => auditorActions.loadAuditsForAuditorSuccess(audits)),
        catchError((error) => of(auditorActions.loadAuditsForAuditorFail(error.message))),
      ),
    ),
  )

const resetAuditorState: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(userActions.logout.match),
    tap(() => console.log('resetAuditorState')),
    map(() => auditorActions.resetAuditorState()),
  )

export const auditorEpics = combineEpics(
  loadAuditor,
  updateAuditor,
  createAuditor,
  resetAuditorState,
  loadAuditsForAuditor,
)
