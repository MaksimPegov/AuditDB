import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'
import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'

import { Customer } from 'shared/models/customer'
import './CustomerInfo.scss'

const componentId = 'CustomerInfo'
const bem = cn(componentId)

export const CustomerInfo: React.FC<{
  customer: Customer
  avatarUrl: string
  submit: () => void
  submitLable: string
}> = ({ customer, avatarUrl, submit, submitLable }) => {
  return (
    <Grid container spacing={3} className={bem()}>
      <Grid xs={12}>
        <Avatar className={bem('Avatar')} alt={customer.fname} src={avatarUrl} />
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { name: true })}>First name</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { fname: true })}>{customer.fname}</span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { lname: true })}>Last name</span>
      </Grid>
      <Grid md={8} xs={23} display="flex">
        <span className={bem('Data', { lname: true })}>{customer.lname}</span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { company: true })}>Company</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { company: true })}>
          {customer.company ? customer.company : '-'}
        </span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { about: true })}>About</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { about: true })}>{customer.about}</span>
      </Grid>

      <Grid xs={12} md={4} sm={12} display="flex">
        <span className={bem('Lable', { email: true })}>E-mail</span>
      </Grid>
      <Grid md={8} xs={12} display="flex">
        <span className={bem('Data', { email: true })}>{customer.contacts.email}</span>
      </Grid>

      {customer.contacts.telegram ? (
        <React.Fragment>
          <Grid xs={12} md={4} sm={12} display="flex">
            <span className={bem('Lable', { phone: true })}>Telegram</span>
          </Grid>
          <Grid md={8} xs={12} display="flex">
            <span className={bem('Data', { phone: true })}>
              {customer.contacts.telegram}
            </span>
          </Grid>
        </React.Fragment>
      ) : null}

      <Grid xs={12} display="flex">
        <Button
          className={bem('Button')}
          onClick={() => {
            submit()
          }}
          variant="contained"
        >
          {submitLable}
        </Button>
      </Grid>
    </Grid>
  )
}
