import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'
import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'

import { Auditor } from 'shared/models/auditor'
import { Tags } from 'shared/components/tags/Tags'
import './AuditorInfo.scss'

const componentId = 'AuditorInfo'
const bem = cn(componentId)

export const AuditorInfo: React.FC<{
  auditor: Auditor
  avatarUrl: string
  submit: () => void
  submitLable: string
}> = ({ auditor, avatarUrl, submit, submitLable }) => {
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
        <span className={bem('Lable', { texrate: true })}>Price per line</span>
      </Grid>

      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { texrate: true })}>
          {auditor.price ? auditor.price + ' $' : '-'}
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
          color="secondary"
        >
          {submitLable}
        </Button>
      </Grid>
    </Grid>
  )
}
