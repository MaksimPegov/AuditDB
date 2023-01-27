import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'
import { Button, Dialog, DialogContent } from '@mui/material'

import { StatusBar, StatusBarColor } from 'shared/components/status-bar/StatusBar'
import './AuditorAuditCard.scss'
import { Audit } from 'shared/models/audit'
import { AuditInfo } from '../audit-info/AuditInfo'
import React, { useEffect, useState } from 'react'
import { Bages } from 'shared/components/bages/Bages'

export const componentId = 'AuditorAuditCard'
const bem = cn(componentId)

export type AuditorAuditCardProps = {
  audit: Audit
}

export const AuditorAuditCard: React.FC<AuditorAuditCardProps> = ({ audit }) => {
  const [infoDialog, setInfoDialog] = useState(false)

  const isPending = (audit: Audit) => audit.status === 'pending'

  const handleInfoDialog = () => {
    setInfoDialog((state) => !state)
  }
  const [statusBarProps, setStatusProps] = useState({
    color: 'red',
    desc: 'Error',
  })

  useEffect(() => {
    switch (audit.status) {
      case 'in_progress':
        setStatusProps({
          color: 'secondary',
          desc: 'In process',
        })
        break
      case 'finalized':
        setStatusProps({
          color: 'secondary',
          desc: 'Finalized',
        })
        break
      case 'pending':
        setStatusProps({
          color: 'green',
          desc: 'Waiting for response',
        })
        break
    }
  }, [audit])

  return (
    <Grid container className={bem()}>
      <Grid xs={12} display="flex">
        <span className={bem('ProjectName')}>{audit.projectName}</span>
      </Grid>
      <Grid xs={12} display="flex">
        <span className={bem('Tags')}>{audit.tags}</span>
      </Grid>

      <Grid xs={12} className={bem('Price')}>
        <Bages price={audit.price} />
      </Grid>

      {!isPending(audit) ? (
        <Grid xs={12} className={bem('StatusBar')}>
          <StatusBar
            color={statusBarProps.color as StatusBarColor}
            desc={statusBarProps.desc}
          />
        </Grid>
      ) : null}

      {isPending(audit) ? (
        <React.Fragment>
          <Grid xs={6} display="flex">
            <Button
              variant="contained"
              data-testid={bem('Button', { view: true })}
              className={bem('Button', { view: true })}
              onClick={handleInfoDialog}
            >
              View
            </Button>
          </Grid>

          <Grid xs={6} display="flex">
            <Button
              variant="contained"
              color="secondary"
              className={bem('Button', { decline: true })}
            >
              Decline
            </Button>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid xs={12} display="flex">
            <Button
              variant="contained"
              color="secondary"
              data-testid={bem('Button', { edit: true })}
              className={bem('Button', { edit: true })}
              onClick={handleInfoDialog}
            >
              Edit
            </Button>
          </Grid>

          <Grid xs={12} display="flex">
            <div className={bem('Copy')}>Make a copy</div>
          </Grid>
        </React.Fragment>
      )}

      <Dialog open={infoDialog} onClose={handleInfoDialog}>
        <DialogContent>
          <AuditInfo audit={audit} close={handleInfoDialog} />
        </DialogContent>
      </Dialog>
    </Grid>
  )
}
