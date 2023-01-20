import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'
import { cn } from '@bem-react/classname'
import Grid from '@mui/material/Unstable_Grid2'
import {
  InputLabel,
  InputBase,
  Box,
  Alert,
  Button,
  TextField,
  useMediaQuery,
  Checkbox,
} from '@mui/material'

import './ProjectPage.scss'
import {
  selectCustomerIdForProject,
  selectIsNewProject,
  selectLoadingProject,
  selectProcessingProject,
  selectProject,
  selectProjectErrorMessage,
  selectProjectIdForProject,
  selectProjectSuccessMessage,
} from '@customer/state/customer.selectors'
import { Project } from 'shared/models/project'
import { onlySpaces } from 'shared/helpers/dataValodation'
import { customerActions } from '@customer/state/customer.reducer'
import { RangeSlider } from 'shared/components/range-slider/RangeSlider'

const componentId = 'ProjectPage'
const bem = cn(componentId)
const initialProjectData: Project = {
  _id: undefined,
  name: '',
  description: '',
  tags: '',
  status: 'hidden',
  gitUrl: '',
  gitFolders: {},
  customerId: '',
  priceRangeFrom: 20,
  priceRangeTo: 80,
  readyToWait: false,
}

export const ProjectPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const customerIdForProject = useSelector(selectCustomerIdForProject)
  const projectIdForProject = useSelector(selectProjectIdForProject)
  const successMessage = useSelector(selectProjectSuccessMessage)
  const isNewProject = useSelector(selectIsNewProject)
  const errorMessage = useSelector(selectProjectErrorMessage)
  const processing = useSelector(selectProcessingProject)
  const project = useSelector(selectProject)
  const loading = useSelector(selectLoadingProject)
  const isXs = useMediaQuery('(max-width:600px)')

  const [projectData, setProjectData] = useState<Project>(initialProjectData)

  const [errors, setErrors] = useState({
    _id: undefined,
    name: false,
    description: false,
    tags: false,
    gitUrl: false,
    gitFolders: false,
    noErrors: true,
    errorMessage: '',
  })

  const submit = (projectData: any) =>
    projectData._id
      ? dispatch(customerActions.updateProject(projectData))
      : dispatch(customerActions.createProject(projectData))

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    trim = true,
  ): void => {
    setProjectData((state) => ({
      ...state,
      [field]: trim ? event.target.value.trim() : event.target.value,
    }))

    setErrors((prevState) => ({
      ...prevState,
      [field]: false,
    }))
  }

  const handlePriveRangeChange = (value: number[]): void => {
    setProjectData((state) => ({
      ...state,
      priceRangeFrom: value[0],
      priceRangeTo: value[1],
    }))
  }

  const handlePublishClick = () => {
    const status = projectData.status === 'hidden' ? 'shown' : 'hidden'

    if (projectData._id) {
      dispatch(customerActions.updateProject({ ...projectData, status }))
    } else {
      setProjectData((state) => ({ ...state, status }))
    }
  }

  // Choose create or update project
  useEffect(() => {
    if (isNewProject) {
      initialProjectData.customerId = customerIdForProject
    } else {
      dispatch(customerActions.loadProject(projectIdForProject))
    }
  }, [isNewProject, customerIdForProject])

  // Check for errors in form
  useEffect(() => {
    if (
      !onlySpaces(projectData.name) &&
      projectData.name.length > 0 &&
      !onlySpaces(projectData.description) &&
      projectData.description.length > 0 &&
      !onlySpaces(projectData.gitUrl) &&
      projectData.gitUrl.length > 0 &&
      !onlySpaces(projectData.tags) &&
      projectData.tags.length > 0
    ) {
      setErrors((state) => ({ ...state, noErrors: true }))
    } else {
      setErrors((state) => ({ ...state, noErrors: false }))
    }

    setErrors((state) => ({ ...state, errorMessage: '' }))
  }, [projectData.name, projectData.description, projectData.gitUrl, projectData.tags])

  // Handle project loaded from server
  useEffect(() => {
    if (project) {
      setProjectData(project)
    } else {
      setProjectData(initialProjectData)
    }
  }, [project])

  // Handle server error
  useEffect(() => {
    if (errorMessage) {
      setErrors((state) => ({
        ...state,
        noErrors: false,
        errorMessage,
      }))
    }
  }, [errorMessage])

  return (
    <motion.div
      className="motion-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box className={bem()}>
        <span className={bem('Title')}>Project</span>

        {loading ? (
          'Loading...'
        ) : (
          <form className={bem('Form')} autoComplete="off">
            <Grid container spacing={2.5}>
              <Grid xs={12} className={bem('Header')}>
                <Button
                  disabled={
                    !projectData || !errors.noErrors || processing || !projectData._id
                  }
                  size="small"
                  variant="contained"
                  title="Will be implemented in the phase 2"
                  className={bem('HeaderButton', {
                    disabled: !errors.noErrors || processing || !projectData._id,
                  })}
                  data-testid={bem('Button')}
                >
                  {'Invite auditor'}
                </Button>

                <Button
                  color="secondary"
                  disabled={
                    !projectData || !errors.noErrors || processing || !projectData._id
                  }
                  variant={projectData?.status === 'hidden' ? 'contained' : 'outlined'}
                  size="small"
                  className={bem('HeaderButton', {
                    disabled: !errors.noErrors || processing,
                  })}
                  data-testid={bem('Button')}
                  onClick={handlePublishClick}
                >
                  {projectData?.status === 'hidden'
                    ? 'Publish project'
                    : 'Unpublish project'}
                </Button>

                <MenuIcon className={bem('HeaderMenuIcon')} />
              </Grid>

              <Grid xs={12}>
                <InputLabel htmlFor="name-input" className={bem('InputLabel')}>
                  Name
                </InputLabel>

                <InputBase
                  id="name-input"
                  value={projectData.name}
                  data-testid={bem('ProjectName')}
                  className={bem('Input', { error: errors.name })}
                  error={errors.name}
                  onChange={(e) =>
                    handleFieldChange(
                      e as React.ChangeEvent<HTMLInputElement>,
                      'name',
                      false,
                    )
                  }
                />
              </Grid>

              <Grid xs={12}>
                <InputLabel htmlFor="git-url-input" className={bem('InputLabel')}>
                  Project link
                </InputLabel>

                <InputBase
                  id="git-url-input"
                  value={projectData.gitUrl}
                  data-testid={bem('ProjectGitUrl')}
                  className={bem('Input', { error: errors.gitUrl })}
                  error={errors.gitUrl}
                  onChange={(e) =>
                    handleFieldChange(e as React.ChangeEvent<HTMLInputElement>, 'gitUrl')
                  }
                />
              </Grid>

              <Grid xs={12}>
                <InputLabel htmlFor="description-input" className={bem('InputLabel')}>
                  Description
                </InputLabel>

                <TextField
                  multiline
                  rows={10}
                  id="description-input"
                  variant="outlined"
                  value={projectData.description}
                  data-testid={bem('ProjectDescription')}
                  className={bem('Input', { error: errors.description })}
                  error={errors.description}
                  onChange={(e) =>
                    handleFieldChange(
                      e as React.ChangeEvent<HTMLInputElement>,
                      'description',
                      false,
                    )
                  }
                />
              </Grid>

              <Grid xs={12}>
                <InputLabel htmlFor="tags-input" className={bem('InputLabel')}>
                  Tags
                </InputLabel>

                <InputBase
                  id="tags-input"
                  value={projectData.tags}
                  data-testid={bem('ProjectTags')}
                  className={bem('Input', { error: errors.tags })}
                  error={errors.tags}
                  onChange={(e) =>
                    handleFieldChange(e as React.ChangeEvent<HTMLInputElement>, 'tags')
                  }
                />
              </Grid>

              <Grid xs={12} className={bem('Price')}>
                <InputLabel className={bem('InputLabel')}>
                  Expected audit price range (per line)
                </InputLabel>

                <RangeSlider
                  value={[projectData.priceRangeFrom, projectData.priceRangeTo]}
                  data-testid={bem('ProjectPriceRangeFrom')}
                  onChange={handlePriveRangeChange}
                ></RangeSlider>
              </Grid>

              <Grid xs={12}>
                <InputLabel className={bem('InputLabel')}>
                  <Checkbox
                    className={bem('Checkbox')}
                    data-testid={bem('ProjectReadyToWait')}
                    checked={projectData.readyToWait}
                    onChange={(e) =>
                      handleFieldChange(
                        e as React.ChangeEvent<HTMLInputElement>,
                        'readyToWait',
                        false,
                      )
                    }
                  />
                  Ready to wait for auditor availability
                </InputLabel>
              </Grid>

              <Grid xs={12} sm={12} md={6} display="flex">
                <Button
                  className={bem('Button', {
                    disabled: !errors.noErrors || processing,
                  })}
                  data-testid={bem('SubmitButton')}
                  type="submit"
                  variant="contained"
                  disabled={!errors.noErrors || processing}
                  onClick={() => submit(projectData)}
                >
                  {projectData._id ? 'Save changes' : 'Create'}
                </Button>
              </Grid>

              <Grid xs={12} sm={12} md={6} display="flex">
                <Button
                  className={bem('Button', { second: true })}
                  data-testid={bem('CancelButton')}
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/customer-page', { state: { tab: '2' } })}
                >
                  Back
                </Button>
              </Grid>
            </Grid>

            {errors.errorMessage ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert className={bem('Alert', { error: true })} severity="error">
                  {errors.errorMessage}
                </Alert>
              </motion.div>
            ) : null}

            {successMessage ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert className={bem('Alert', { success: true })} severity="success">
                  {successMessage + ', '}
                  <Link
                    className={bem('AlertLink')}
                    to={`/customer-page`}
                    state={{ tab: '2' }}
                  >
                    see my projects
                  </Link>
                </Alert>
              </motion.div>
            ) : null}
          </form>
        )}
      </Box>
    </motion.div>
  )
}
