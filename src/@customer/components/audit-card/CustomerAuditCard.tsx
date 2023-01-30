import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'
import { Button, Dialog, DialogContent } from '@mui/material'

import { StatusBar, StatusBarColor } from 'shared/components/status-bar/StatusBar'
import { Audit } from 'shared/models/audit'
import { AuditAccept } from '@customer/components/audit-accept/AuditAccept'
import { AppDateRange } from 'shared/components/date-range/AppDateRange'
import React, { useEffect, useState } from 'react'
import './CustomerAuditCard.scss'
import { AuditInfo } from '@auditor/components/audit-info/AuditInfo'

export type CustomerAuditCardProps = {
  audit: Audit
}

export const componentId = 'CustomerAuditCard'
const bem = cn(componentId)

export const CustomerAuditCard: React.FC<CustomerAuditCardProps> = ({
  audit,
}: {
  audit: Audit
}) => {
  const [infoDialog, setInfoDialog] = useState(false)
  const [acceptDialog, setAcceptDialog] = useState(false)

  const handleAuditAcceptDialog = () => {
    setAcceptDialog((state) => !state)
  }

  const handleAuditInfoDialog = () => {
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
          color: 'green',
          desc: 'In process',
        })
        break
      case 'finalized':
        setStatusProps({
          color: 'secondary',
          desc: 'Completed',
        })
        break
      case 'pending':
        setStatusProps({
          color: 'primary',
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
        <span className={bem('AuditorName')}>{audit.auditorName}</span>
      </Grid>

      <Grid xs={12} display="flex" alignItems="center">
        <span className={bem('Price')}>{audit.price} $ per line</span>
      </Grid>

      <Grid xs={12} className={bem('Date')}>
        <AppDateRange fixed={true} start={audit.dateStart} end={audit.dateEnd} />
      </Grid>

      <Grid xs={12} className={bem('StatusBar')}>
        <StatusBar
          color={statusBarProps.color as StatusBarColor}
          desc={statusBarProps.desc}
        />
      </Grid>
      {audit.status === 'finalized' || audit.status === 'in_progress' ? (
        <Grid xs={12} className={bem('SingleButtonGrid')}>
          <Button
            variant="contained"
            color="primary"
            className={bem('Button', { single: true })}
            data-testid={bem('SingleButton')}
            onClick={handleAuditInfoDialog}
          >
            View
          </Button>
        </Grid>
      ) : (
        <React.Fragment>
          <Grid xs={12} display="flex">
            <Button
              variant="contained"
              color="secondary"
              className={bem('Button', { accept: true })}
              data-testid={bem('AcceptButton')}
            >
              Accept
            </Button>
          </Grid>

          <Grid xs={12} display="flex">
            <Button
              variant="contained"
              color="primary"
              className={bem('Button', { view: true })}
              data-testid={bem('ViewButton')}
              onClick={handleAuditAcceptDialog}
            >
              View
            </Button>
          </Grid>
        </React.Fragment>
      )}

      <Dialog open={acceptDialog} onClose={handleAuditAcceptDialog}>
        <DialogContent>
          <AuditAccept audit={audit} closeDialog={handleAuditAcceptDialog} />
        </DialogContent>
      </Dialog>

      <Dialog open={infoDialog} onClose={handleAuditInfoDialog}>
        <DialogContent>
          <AuditInfo audit={audit} close={handleAuditInfoDialog} customerView={true} />
        </DialogContent>
      </Dialog>
    </Grid>
  )
}
