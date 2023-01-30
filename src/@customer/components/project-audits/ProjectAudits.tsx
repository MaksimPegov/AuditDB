import React from 'react'
import { cn } from '@bem-react/classname'
import { Link } from '@mui/icons-material'

import { StatusBar, StatusBarColor } from 'shared/components/status-bar/StatusBar'
import { AuditInfo } from '@auditor/components/audit-info/AuditInfo'
import { Dialog } from '@mui/material'
import { Audit } from 'shared/models/audit'
import './ProjectAudits.scss'

const bem = cn('ProjectAudits')

export const ProjectAudits: React.FC<{ audits: Audit[] }> = ({ audits }) => {
  const [dialog, setDialog] = React.useState(false)
  const [selectedAudit, setSelectedAudit] = React.useState<Audit | null>(null)

  const handleDialog = () => {
    setDialog((oldState) => !oldState)
  }

  const setStatus = (audit: Audit): { color: StatusBarColor; desc: string } => {
    switch (audit.status) {
      case 'in_progress':
        return {
          color: 'green',
          desc: 'In process',
        }
      case 'finalized':
        return {
          color: 'secondary',
          desc: 'Completed',
        }
      case 'pending':
        return {
          color: 'green',
          desc: 'Waiting for response',
        }
      default:
        return {
          color: 'red',
          desc: 'error',
        }
    }
  }

  const handleLink = (audit: Audit) => {
    setSelectedAudit(audit)
    handleDialog()
  }

  return (
    <div className={bem()}>
      {audits.map((audit) => (
        <div className={bem('Audit')}>
          <span className={bem('Name')}>{audit.auditorName}</span>
          <span className={bem('Postfix')}>audit</span>
          <StatusBar color={setStatus(audit).color} desc={setStatus(audit).desc} />
          {audit.status === 'finalized' ? (
            <Link className={bem('Link')} onClick={() => handleLink(audit)} />
          ) : null}
        </div>
      ))}

      <Dialog open={dialog} onClose={handleDialog}>
        <AuditInfo audit={selectedAudit as Audit} close={handleDialog} isPreview={true} />
      </Dialog>
    </div>
  )
}
