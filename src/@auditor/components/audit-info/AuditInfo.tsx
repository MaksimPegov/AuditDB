import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import { cn } from '@bem-react/classname'
import { Button, Link } from '@mui/material'
import { CreateNewFolder } from '@mui/icons-material'

import { Audit } from 'shared/models/audit'
import { Bages } from 'shared/components/bages/Bages'
import './AuditInfo.scss'

const bem = cn('AuditInfo')

export type AuditInfoProps = {
  audit: Audit
  close?: () => void
}

export const AuditInfo: React.FC<AuditInfoProps> = ({ audit, close }) => {
  const isPending = (audit: Audit) => audit.status === 'pending'

  return (
    <Grid container spacing={1} className={bem()}>
      <Grid xs={12} className={bem('Title')}>
        {audit.projectName}
      </Grid>

      <Grid xs={12} className={bem('Subtitle')}>
        {audit.tags}
      </Grid>

      <Grid xs={12} className={bem('Price')}>
        <Bages price={audit.price} />
      </Grid>

      <Grid xs={12} className={bem('Text')}>
        {audit.discription}
      </Grid>

      {!isPending(audit) ? (
        <React.Fragment>
          <Grid xs={12} className={bem('UploadTitle')}>
            UploadAudit
          </Grid>

          <Grid xs={12} display="flex">
            <div className={bem('Upload')}>here will be name of uploading file</div>
            <CreateNewFolder className={bem('Icon')} />
          </Grid>

          <Grid xs={12} className={bem('FileTitle')}>
            <CreateNewFolder className={bem('Icon')} />
            <span className={bem('FileTitleText')}>File link</span>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid xs={12} className={bem('Mail')}>
            {audit.auditorEmail}
          </Grid>

          {audit.auditorTelegram ? (
            <Grid xs={12} className={bem('Telegram')}>
              {audit.auditorTelegram}
            </Grid>
          ) : null}
        </React.Fragment>
      )}

      {audit.githubLinks.map((link) => (
        <Grid xs={12} display="flex">
          <Link
            href={link}
            className={bem('Link')}
            color="secondary"
            key={audit.githubLinks.indexOf(link)}
          >
            {link}
          </Link>
        </Grid>
      ))}

      {!isPending(audit) ? (
        <React.Fragment>
          <Grid xs={12} sm={6} display="flex">
            <Button
              variant="contained"
              color="secondary"
              className={bem('Button', { send: true })}
              data-testid={bem('Button', { send: true })}
            >
              Send to customer
            </Button>
          </Grid>

          <Grid xs={12} sm={6} display="flex">
            <Button
              variant="outlined"
              color="secondary"
              className={bem('Button', { close: true, second: true })}
              data-testid={bem('Button', { close: true })}
              onClick={close}
            >
              Close
            </Button>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid xs={12} sm={4} display="flex">
            <Button
              variant="contained"
              color="secondary"
              className={bem('Button', { decline: true })}
              data-testid={bem('Button', { decline: true })}
            >
              Decline
            </Button>
          </Grid>

          <Grid xs={12} sm={4} display="flex">
            <Button
              variant="contained"
              className={bem('Button', { offer: true, second: true })}
              data-testid={bem('Button', { offer: true, second: true })}
            >
              Make offer
            </Button>
          </Grid>

          <Grid xs={12} sm={4} display="flex">
            <Button
              variant="outlined"
              color="secondary"
              className={bem('Button', { close: true, second: true })}
              data-testid={bem('Button', { close: true, second: true })}
              onClick={close}
            >
              Close
            </Button>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  )
}
