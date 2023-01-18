import { Avatar, Button } from '@mui/material'
import { cn } from '@bem-react/classname'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import './AuditorInfo.scss'
import { Tags } from 'shared/components/tags/Tags'
import { Auditor } from 'shared/models/auditor'

const componentId = 'AuditorInfo'
const bem = cn(componentId)

export const AuditorInfo: React.FC<{
  auditor: Auditor
  avatarUrl: string
  submit: () => void
  submitLable: string
  submitColor?: 'primary' | 'secondary'
}> = ({ auditor, avatarUrl, submit, submitLable, submitColor = 'secondary' }) => {
  return (
    <Grid container spacing={3} className={bem()}>
      <Grid xs={12}>
        <Avatar className={bem('Avatar')} alt={auditor.fname} src={avatarUrl} />
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { name: true })}>First name</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { fname: true })}>{auditor.fname}</span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { lname: true })}>Last name</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { lname: true })}>{auditor.lname}</span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { company: true })}>Company</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { company: true })}> - </span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { about: true })}>About</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { about: true })}>{auditor.about}</span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { email: true })}>E-mail</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { email: true })}>{auditor.contacts.email}</span>
      </Grid>

      {auditor.contacts.telegram ? (
        <React.Fragment>
          <Grid xs={12} md={4} sm={12} display="flex">
            <span className={bem('Lable', { phone: true })}>Telegram</span>
          </Grid>
          <Grid md={8} xs={12} display="flex">
            <span className={bem('Data', { phone: true })}>
              {auditor.contacts.telegram}
            </span>
          </Grid>
        </React.Fragment>
      ) : null}

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { price: true })}>Price per line</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { price: true })}>
          {auditor.price ? auditor.price + ' $' : '-'}
        </span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { available: true })}>Available</span>
      </Grid>
      <Grid md={4} xs={12} display="flex">
        <span className={bem('Data', { available: true })}>
          {auditor.available ? 'yes' : 'no'}
        </span>
      </Grid>

      <Grid xs={12} className={bem('Tags')}>
        <Tags tags={auditor.tags} />
      </Grid>

      <Grid xs={12} display="flex">
        <Button
          className={bem('Button')}
          onClick={() => {
            submit()
          }}
          variant="contained"
          color={submitColor}
        >
          {submitLable}
        </Button>
      </Grid>
    </Grid>
  )
}
