import { Box, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { cn } from '@bem-react/classname'

import './MainPage.scss'
import {
  selectAuditors,
  selectAuditorsError,
  selectAuditorsLoading,
  selectProjects,
  selectProjectsError,
  selectProjectsLoading,
  selectUserType,
} from 'shared/state/shared.selectors'
import { Welcome } from 'shared/components/welcome/Welcome'
import { selectUser } from 'user/state/user.selectors'
import { AccountType } from 'shared/models/user'
import { ProjectCard } from '@customer/components/project-card/ProjectCard'
import { AuditorCard } from '@auditor/components/auditor-card/AuditorCard'
import { doAfterDelay } from 'shared/helpers/do-after-delay'
import { sharedActions } from 'shared/state/shared.reducer'
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from 'shared/components/search/search'

const componentId = 'MainPage'
const bem = cn(componentId)

export const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const auditors = useSelector(selectAuditors)
  const loadingAuditors = useSelector(selectAuditorsLoading)
  const loadingAuditorsError = useSelector(selectAuditorsError)
  const projects = useSelector(selectProjects)
  const loadingProjects = useSelector(selectProjectsLoading)
  const loadingProjectsError = useSelector(selectProjectsError)
  const activeUserType = useSelector(selectUserType)

  const selectAccountTypeHandler = (type: AccountType) => {
    dispatch(sharedActions.setUserPreferences(type))
    navigate('/sign-up')
  }

  const handleInviteAuditor = () => {
    console.log('invite auditor')
  }

  const onAuditorsSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    doAfterDelay(() => {
      dispatch(sharedActions.loadAuditors(event.target.value))
    }, 100)

  const onProjectsSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    doAfterDelay(() => {
      dispatch(sharedActions.loadProjects(event.target.value))
    }, 100)

  useEffect(() => {
    dispatch(sharedActions.loadAuditors(''))
    dispatch(sharedActions.loadProjects(''))
  }, [dispatch])

  return (
    <div className={bem()}>
      {user ? null : <Welcome onSelect={selectAccountTypeHandler} />}

      <div className={bem('Content')}>
        <div className="wrapper">
          <Grid container spacing={6}>
            <Grid
              item
              xs={12}
              sm={6}
              className={bem('Cards')}
              data-testid={bem('Auditors')}
            >
              <Box className={bem('CardsHeader')}>
                <span className={bem('Title')}>Auditors</span>

                <Search className={bem('Search')}>
                  <SearchIconWrapper>
                    <SearchIcon className={bem('SearchIcon')} fontSize="large" />
                  </SearchIconWrapper>

                  <StyledInputBase
                    className={bem('SearchInput')}
                    onChange={onAuditorsSearchChange}
                    placeholder="Search by tag…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Box>

              <Grid container spacing={2}>
                {/* {loadingAuditors ? 'Loading...' : null} */}
                {loadingAuditorsError ? loadingAuditorsError : null}
                {auditors.map((auditor) => (
                  <Grid item xs={12} sm={6} key={auditor._id}>
                    <AuditorCard
                      auditor={auditor}
                      invite={
                        activeUserType === 'customer' ? handleInviteAuditor : undefined
                      }
                    ></AuditorCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              className={bem('Cards')}
              data-testid={bem('Projects')}
            >
              <Box className={bem('CardsHeader')}>
                <span className={bem('Title')}>Projects</span>

                <Search className={bem('Search')}>
                  <SearchIconWrapper>
                    <SearchIcon className={bem('SearchIcon')} fontSize="large" />
                  </SearchIconWrapper>

                  <StyledInputBase
                    className={bem('SearchInput')}
                    onChange={onProjectsSearchChange}
                    placeholder="Search by tag…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Box>

              <Grid container spacing={2}>
                {loadingProjectsError ? loadingProjectsError : null}
                {projects.map((project) => (
                  <Grid item xs={12} sm={6} key={project._id}>
                    <ProjectCard project={project}></ProjectCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className={bem('WhoIsUsing')}>
        <span className={bem('WhoIsUsingTitle')}>Who is using our service</span>
      </div>
    </div>
  )
}
