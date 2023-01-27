import { Alert, Avatar, Button, Checkbox, InputBase, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@bem-react/classname'
import Grid from '@mui/material/Unstable_Grid2'

import './AuditorPanel.scss'
import { Edit, Padding } from '@mui/icons-material'
import { Auditor } from 'shared/models/auditor'
import { AppSlider } from 'shared/components/app-slider/AppSlider'
import { onlySpaces } from 'shared/helpers/dataValodation'
import { useSnackbar } from 'notistack'

const componentId = 'AuditorPanel'
const bem = cn(componentId)
const initialAuditorData: Auditor = {
  _id: undefined,
  about: '',
  available: true,
  company: '',
  fname: '',
  lname: '',
  tags: '',
  price: 0,
  contacts: {
    email: '',
    telegram: '',
  },
}

type AuditorPanelProps = {
  auditor: Auditor | null
  remove: (id: string) => void
  errorMessage: string
  loading: boolean
  processing: boolean
  submit: (a: Auditor) => void
  successMessage: string
  cancel: () => void
  cleanSuccessMessage: () => void
}

export const AuditorPanel: React.FC<AuditorPanelProps> = ({
  auditor,
  remove,
  errorMessage,
  loading,
  processing,
  successMessage,
  submit,
  cancel,
  cleanSuccessMessage,
}) => {
  const [auditorData, setAuditorData] = useState<Auditor>(initialAuditorData)
  const showSnack = useSnackbar()

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    about: false,
    tags: false,
    contacts: {
      email: false,
      telegram: false,
    },
    noErrors: true,
    errorMessage: '',
  })

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    trim = true,
  ): void => {
    setAuditorData((prevState) => ({
      ...prevState,
      [field]: trim ? event.target.value.trim() : event.target.value,
    }))

    setErrors((prevState) => ({
      ...prevState,
      [field]: false,
    }))
  }

  const handleContactsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    contact: string,
  ): void => {
    setAuditorData((prevState) => ({
      ...prevState,
      contacts: {
        ...prevState.contacts,
        [contact]: event.target.value.trim().toLowerCase(),
      },
    }))

    setErrors((prevState) => ({
      ...prevState,
      contacts: {
        ...prevState.contacts,
        [contact]: false,
      },
    }))
  }

  const handleSliderChange = (value: number): void => {
    setAuditorData((prevState) => ({
      ...prevState,
      price: value,
    }))
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAuditorData((prevState) => ({
      ...prevState,
      available: event.target.checked,
    }))
  }

  // Check for errors in form
  useEffect(() => {
    if (
      !onlySpaces(auditorData.fname) &&
      auditorData.fname.length > 0 &&
      !onlySpaces(auditorData.fname) &&
      auditorData.lname.length > 0 &&
      !onlySpaces(auditorData.about) &&
      auditorData.about.length > 0 &&
      !onlySpaces(auditorData.contacts.email) &&
      auditorData.contacts.email.length > 0
    ) {
      setErrors((state) => ({ ...state, noErrors: true }))
    } else {
      setErrors((state) => ({ ...state, noErrors: false }))
    }

    setErrors((state) => ({ ...state, errorMessage: '' }))
  }, [
    auditorData.fname,
    auditorData.lname,
    auditorData.about,
    auditorData.contacts.email,
  ])

  // Handle auditor loaded from server
  useEffect(() => {
    if (auditor) {
      setAuditorData(auditor)
    } else {
      setAuditorData(initialAuditorData)
    }
  }, [auditor])

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

  // Close panel on success
  useEffect(() => {
    if (successMessage) {
      showSnack.enqueueSnackbar(successMessage, { variant: 'success' })
      cancel()
    }
    return cleanSuccessMessage()
  }, [successMessage])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form autoComplete="off">
          <Grid container spacing={2} className={bem()}>
            <Grid xs={12} sm={4} display="block">
              <Grid container justifyContent="center" alignItems="center">
                <Grid xs={12} className={bem('AvatarBox')}>
                  <Avatar className={bem('Avatar')}>
                    {auditor!.fname ? auditor!.fname.substring(0, 1).toUpperCase() : null}
                  </Avatar>
                </Grid>

                <Grid xs={12} display="flex">
                  <div className={bem('EditAvatar')} data-testid={bem('EditAvatar')}>
                    <Edit className={bem('Pencil')} />
                    <span
                      className={bem('EditAvatarText')}
                      onClick={() => {
                        console.log('avatar change')
                      }}
                    >
                      Edit photo
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} sm={8} sx={{ padding: 0 }}>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <InputLabel htmlFor="fname-input" className={bem('InputLabel')}>
                    First Name
                  </InputLabel>

                  <InputBase
                    id="fname-input"
                    data-testid={bem('FnameInput')}
                    className={bem('Input', { error: errors.fname })}
                    type="text"
                    value={auditorData.fname}
                    error={errors.fname}
                    onChange={(e) =>
                      handleFieldChange(e as React.ChangeEvent<HTMLInputElement>, 'fname')
                    }
                  />
                </Grid>

                <Grid xs={12}>
                  <InputLabel htmlFor="lname-input" className={bem('InputLabel')}>
                    Last Name
                  </InputLabel>

                  <InputBase
                    id="lname-input"
                    data-testid={bem('LnameInput')}
                    className={bem('Input', { error: errors.lname })}
                    type="text"
                    value={auditorData.lname}
                    error={errors.fname}
                    onChange={(e) =>
                      handleFieldChange(e as React.ChangeEvent<HTMLInputElement>, 'lname')
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12}>
              <InputLabel htmlFor="about-input" className={bem('InputLabel')}>
                About
              </InputLabel>

              <InputBase
                multiline
                rows={5}
                id="about-input"
                data-testid={bem('AboutInput')}
                className={bem('Input', { error: errors.about })}
                type="text"
                value={auditorData.about}
                error={errors.fname}
                onChange={(e) =>
                  handleFieldChange(
                    e as React.ChangeEvent<HTMLInputElement>,
                    'about',
                    false,
                  )
                }
              />
            </Grid>

            <Grid xs={12}>
              <InputLabel htmlFor="company-input" className={bem('InputLabel')}>
                Company
              </InputLabel>

              <InputBase
                id="company-input"
                data-testid={bem('CompanyInput')}
                className={bem('Input')}
                type="text"
                value={auditorData.company}
                onChange={(e) =>
                  handleFieldChange(e as React.ChangeEvent<HTMLInputElement>, 'company')
                }
              />
            </Grid>

            <Grid xs={12}>
              <InputLabel htmlFor="email-input" className={bem('InputLabel')}>
                Email
              </InputLabel>

              <InputBase
                id="email-input"
                data-testid={bem('EmailInput')}
                className={bem('Input', { error: errors.contacts.email })}
                type="text"
                value={auditorData.contacts.email}
                error={errors.contacts.email}
                onChange={(e) =>
                  handleContactsChange(e as React.ChangeEvent<HTMLInputElement>, 'email')
                }
              />
            </Grid>

            <Grid xs={12}>
              <InputLabel htmlFor="telegram-input" className={bem('InputLabel')}>
                Telegram
              </InputLabel>

              <InputBase
                id="telegram-input"
                data-testid={bem('telegram-input')}
                className={bem('Input', { error: errors.contacts.telegram })}
                type="text"
                value={auditorData.contacts.telegram}
                error={errors.fname}
                onChange={(e) =>
                  handleContactsChange(
                    e as React.ChangeEvent<HTMLInputElement>,
                    'telegram',
                  )
                }
              />
            </Grid>

            <Grid xs={12}>
              <InputLabel htmlFor="price-input" className={bem('InputLabel')}>
                Price per line
              </InputLabel>

              <AppSlider
                value={auditor ? auditor.price : 0}
                setValue={handleSliderChange}
                min={0}
                max={100}
                step={1}
                color={'secondary'}
              />
            </Grid>

            <Grid xs={12}>
              <InputLabel
                htmlFor="available"
                className={bem('InputLabel', { Inline: true })}
              >
                <Checkbox
                  className={bem('Checkbox')}
                  checked={auditorData.available}
                  onChange={handleCheckboxChange}
                  name="available"
                  color="secondary"
                />
                Available
              </InputLabel>
            </Grid>

            <Grid xs={12}>
              <InputLabel htmlFor="tags-input" className={bem('InputLabel')}>
                Tags
              </InputLabel>

              <InputBase
                id="tags-input"
                data-testid={bem('tags-input')}
                className={bem('Input', { error: errors.tags })}
                type="text"
                value={auditorData.tags}
                error={errors.fname}
                onChange={(e) =>
                  handleFieldChange(e as React.ChangeEvent<HTMLInputElement>, 'tags')
                }
              />
            </Grid>

            <Grid xs={12} sm={6} display="flex">
              <Button
                className={bem('Button', {
                  disabled: !errors.noErrors || processing,
                  secondary: !auditorData._id,
                })}
                data-testid={bem('Button')}
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!errors.noErrors || processing}
                sx={{ mt: 4 }}
                onClick={() => submit(auditorData)}
              >
                {auditorData._id ? 'Save changes' : 'Create'}
              </Button>
            </Grid>

            <Grid xs={12} sm={6} display="flex">
              <Button
                variant="outlined"
                color="secondary"
                className={bem('Button', { second: true })}
                data-testid={bem('Cancel')}
                onClick={cancel}
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
        </form>
      )}
    </motion.div>
  )
}
