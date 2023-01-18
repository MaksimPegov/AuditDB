import { cn } from '@bem-react/classname'
import { Button, Dialog, DialogContent, Grid } from '@mui/material'

import { StatusBar, StatusBarColor } from '../status-bar/StatusBar'
import { Audit } from 'shared/models/audit'
import './AuditCard.scss'
import { useEffect, useState } from 'react'
import { AppDateRange } from '../date-range/AppDateRange'
import { AuditAccept } from '@customer/components/audit-accept/AuditAccept'

export type AuditCardProps = {
  audit: Audit
}

export const componentId = 'AuditCard'
const bem = cn(componentId)

export const AuditCard: React.FC<AuditCardProps> = ({ audit }: { audit: Audit }) => {
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
    console.log(audit.status)
  }, [audit])

  return (
    <Grid container className={bem()}>
      <Grid item xs={12} display="flex">
        <span className={bem('ProjectName')}>{audit.projectName}</span>
      </Grid>

      <Grid item xs={12} display="flex">
        <span className={bem('AuditorName')}>{audit.auditorName}</span>
      </Grid>

      <Grid item xs={12} display="flex">
        <AppDateRange fixed={true} start={audit.dateStart} end={audit.dateEnd} />
      </Grid>

      <Grid item xs={12}>
        <StatusBar
          color={statusBarProps.color as StatusBarColor}
          desc={statusBarProps.desc}
        />
      </Grid>

      <Grid item xs={12} display="flex">
        <Button
          variant="contained"
          color="secondary"
          className={bem('Button', { accept: true })}
        >
          Accept
        </Button>
      </Grid>

      <Grid item xs={12} display="flex">
        <Button
          variant="contained"
          color="primary"
          className={bem('Button', { view: true })}
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
