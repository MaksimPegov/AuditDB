import { cn } from '@bem-react/classname'
import { Avatar, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import { AppDateRange } from 'shared/components/date-range/AppDateRange'
import { Tags } from 'shared/components/tags/Tags'

import { Audit } from 'shared/models/audit'
import { JsxEmit } from 'typescript'
import './AuditAccept.scss'

const bem = cn('AuditAccept')

export const AuditAccept: React.FC<{ audit: Audit; closeDialog: () => void }> = ({
  audit,
  closeDialog,
}) => {
  return (
    <Grid container spacing={3} className={bem()}>
      <Grid xs={12} display="flex">
        <span className={bem('Message')}>
          You have audit request for{' '}
          <span className={bem('MessageProject')}>{audit.projectName}</span> !
        </span>
      </Grid>

      <Grid xs={12} display="flex" flexDirection="row" justifyContent="center">
        <Avatar className={bem('Avatar')}>
          {audit.auditorName.slice(0, 1).toUpperCase()}
        </Avatar>
        <div className={bem('AuditorInfo')}>
          <span className={bem('AuditorData', { name: true })}>{audit.auditorName}</span>
          <span className={bem('AuditorData', { company: true })}>
            {audit.auditorCompany}
          </span>
        </div>
      </Grid>

      <Grid xs={12} md={6} display="flex">
        <span className={bem('Lable')}>E-mail</span>
      </Grid>

      <Grid xs={12} md={6} display="flex">
        <span className={bem('Value')}>{audit.auditorEmail}</span>
      </Grid>

      {audit.auditorTelegram ? (
        <React.Fragment>
          <Grid xs={12} md={6} display="flex">
            <span className={bem('Lable')}>Telegram</span>
          </Grid>

          <Grid xs={12} md={6} display="flex">
            <span className={bem('Value')}>{audit.auditorTelegram}</span>
          </Grid>
        </React.Fragment>
      ) : null}

      <Grid xs={12} md={6} display="flex">
        <span className={bem('Lable')}>Price per line</span>
      </Grid>

      <Grid xs={12} md={6} display="flex">
        <span className={bem('Value')}>{audit.rate} $</span>
      </Grid>

      <Grid xs={12} md={6} display="flex">
        <span className={bem('Lable')}>Time for project</span>
      </Grid>

      <Grid xs={18} className={bem('Date')}>
        <AppDateRange fixed={true} start={audit.dateStart} end={audit.dateEnd} />
      </Grid>

      <Grid xs={12} className={bem('Tags')}>
        <Tags tags={audit.tags} />
      </Grid>

      <Grid xs={4} display="flex">
        <Button variant="contained" color="secondary" className={bem('Button')}>
          Accept
        </Button>
      </Grid>

      <Grid xs={4} display="flex">
        <Button variant="contained" color="primary" className={bem('Button')}>
          Decline
        </Button>
      </Grid>

      <Grid xs={4} display="flex">
        <Button
          variant="outlined"
          color="secondary"
          className={bem('Button')}
          onClick={closeDialog}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  )
}
