import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'
import { Button, Dialog, DialogContent } from '@mui/material'

import { StatusBar, StatusBarColor } from 'shared/components/status-bar/StatusBar'
import { Audit } from 'shared/models/audit'
import { AuditAccept } from '@customer/components/audit-accept/AuditAccept'
import { AppDateRange } from 'shared/components/date-range/AppDateRange'
import { useEffect, useState } from 'react'
import './CustomerAuditCard.scss'

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
        <span className={bem('AuditorName')}>{audit.auditorName}</span>
      </Grid>

      <Grid xs={12} display="flex">
        <span className={bem('Price')}>{audit.price} $ per line</span>
      </Grid>

      <Grid xs={12} display="flex">
        <AppDateRange fixed={true} start={audit.dateStart} end={audit.dateEnd} />
      </Grid>

      <Grid xs={12}>
        <StatusBar
          color={statusBarProps.color as StatusBarColor}
          desc={statusBarProps.desc}
        />
      </Grid>

      <Grid xs={12} display="flex">
        <Button
          variant="contained"
          color="secondary"
          data-testid={bem('Button', { accept: true })}
          className={bem('Button', { accept: true })}
        >
          Accept
        </Button>
      </Grid>

      <Grid xs={12} display="flex">
        <Button
          variant="contained"
          color="primary"
          className={bem('Button', { view: true })}
          data-testid={bem('Button', { view: true })}
          onClick={handleInfoDialog}
        >
          View
        </Button>
      </Grid>

      <Dialog open={infoDialog} onClose={handleInfoDialog}>
        <DialogContent>
          <AuditAccept audit={audit} closeDialog={handleInfoDialog} />
        </DialogContent>
      </Dialog>
    </Grid>
  )
}
