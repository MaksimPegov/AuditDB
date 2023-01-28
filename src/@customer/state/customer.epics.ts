import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, from, map, of, switchMap, withLatestFrom } from 'rxjs'

import * as auditApi from 'shared/api/audit.api'
import * as auditorApi from '@auditor/api/auditor.api'
import * as projectApi from '@customer/api/project.api'
import { userActions } from 'user/state/user.reducer'
import * as customerApi from '@customer/api/customer.api'
import { selectCustomer, selectProject } from '@customer/state/customer.selectors'
import { Action$, State$ } from 'app.store'
import { customerActions } from '@customer/state/customer.reducer'

const loadCustomer: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.loadCustomerData.match),
    switchMap(() =>
      from(customerApi.get()).pipe(
        map((customer) => customerActions.loadCustomerDataSuccess(customer)),
        catchError((error) => of(customerActions.loadCustomerDataFail(error.message))),
      ),
    ),
  )

const createCustomer: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.createCustomer.match),
    switchMap(({ payload }) =>
      from(customerApi.create(payload)).pipe(
        map((customer) => customerActions.createCustomerSuccess(customer)),
        catchError((error) => of(customerActions.createCustomerFail(error.message))),
      ),
    ),
  )

const updateCustomer: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.updateCustomer.match),
    switchMap(({ payload }) =>
      from(customerApi.update(payload)).pipe(
        map((customer) => customerActions.updateCustomerSuccess(customer)),
        catchError((error) => of(customerActions.updateCustomerFail(error.message))),
      ),
    ),
  )

const loadProject: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.loadProject.match),
    switchMap(({ payload }) =>
      from(projectApi.get(payload)).pipe(
        map((project) => customerActions.loadProjectSuccess(project)),
        catchError((error) => of(customerActions.loadProjectFail(error.message))),
      ),
    ),
  )

const loadCustomerProjects: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.loadCustomerProjects.match),
    withLatestFrom(
      state$.pipe(map((state) => state.customer?.customerPage?.customer?._id)),
    ),
    switchMap(([, customerId]) =>
      from(projectApi.getMy(customerId!)).pipe(
        map((projects) => customerActions.loadCustomerProjectsSuccess(projects)),
        catchError((error) =>
          of(customerActions.loadCustomerProjectsFail(error.message)),
        ),
      ),
    ),
  )

const createProject: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.createProject.match),
    switchMap(({ payload }) =>
      from(projectApi.create(payload)).pipe(
        map((project) => customerActions.createProjectSuccess(project)),
        catchError((error) => of(customerActions.createProjectFail(error.message))),
      ),
    ),
  )

const updateProject: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.updateProject.match),
    switchMap(({ payload }) =>
      from(projectApi.update(payload)).pipe(
        map((project) => customerActions.updateProjectSuccess(project)),
        catchError((error) => of(customerActions.updateProjectFail(error.message))),
      ),
    ),
  )

const loadAuditsForCustomer: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.loadAuditsForCustomer.match),
    withLatestFrom(state$.pipe(map(selectCustomer))),
    switchMap(([, customer]) =>
      from(auditApi.getMyAudits('customer', customer!._id!)).pipe(
        map((audits) => customerActions.loadAuditsForCustomerSuccess(audits)),
        catchError((error) =>
          of(customerActions.loadAuditsForCustomerFail(error.message)),
        ),
      ),
    ),
  )

const findAuditorsByName: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.searchForAuditors.match),
    switchMap(({ payload }) =>
      from(auditorApi.findAuditorsByName(payload)).pipe(
        map((auditors) => customerActions.searchForAuditorsSuccess(auditors)),
        catchError((error) => of(customerActions.searchForAuditorsFail(error.message))),
      ),
    ),
  )

const inviteAuditorForProject: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(customerActions.inviteAuditor.match),
    withLatestFrom(state$.pipe(map(selectProject))),
    switchMap(([{ payload }, project]) =>
      from(projectApi.inviteAuditor(payload, project!._id!)).pipe(
        map((message) => customerActions.inviteAuditorSuccess(message)),
        catchError((error) => of(customerActions.inviteAuditorFail(error.message))),
      ),
    ),
  )

const resetCustomerState: Epic = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(userActions.logout.match),
    map(() => customerActions.resetCustomerState()),
  )

export const customerEpics = combineEpics(
  loadCustomer,
  updateCustomer,
  createCustomer,
  loadProject,
  createProject,
  updateProject,
  loadCustomerProjects,
  resetCustomerState,
  loadAuditsForCustomer,
  findAuditorsByName,
  inviteAuditorForProject,
)
