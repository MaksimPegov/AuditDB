import { useState } from 'react'
import { cn } from '@bem-react/classname'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Avatar, Dialog, DialogContent } from '@mui/material'

import './AuditorCard.scss'
import { Auditor } from 'shared/models/auditor'
import { AuditorInfo } from '@auditor/components/auditor-info/AuditorInfo'

export type AuditorCardProps = {
  auditor: Auditor
  invite?: () => void
}

export const componentId = 'AuditorCard'
const bem = cn(componentId)

export const AuditorCard: React.FC<AuditorCardProps> = ({ auditor, invite }) => {
  const [infoDialog, setInfoDialog] = useState(false)
  const [state, setState] = useState({
    isHovered: false,
  })

  const [avatar, setAvatar] = useState(
    `/images/avatar/${Math.floor(Math.random() * 10)}.jpg`,
  )

  const closeInfoDialog = () => {
    setInfoDialog(false)
  }

  return (
    <Grid container className={bem()}>
      <Grid xs={12} display="flex">
        <Avatar className={bem('Avatar')} alt={auditor.fname} src={avatar} />
      </Grid>

      <Grid xs={12} display="flex">
        <span className={bem('Name')}>
          {auditor.fname} {auditor.lname}
        </span>
      </Grid>

      <Grid xs={12} display="flex">
        <span className={bem('Tags')}>{auditor.tags}</span>
      </Grid>

      <Grid xs={12} display="flex">
        <Button
          component="span"
          variant="contained"
          color="primary"
          className={bem('Button')}
          onClick={() => {
            setInfoDialog(true)
          }}
        >
          More Info
        </Button>
      </Grid>

      <Dialog open={infoDialog} onClose={closeInfoDialog}>
        <DialogContent>
          <AuditorInfo
            auditor={auditor}
            avatarUrl={avatar}
            submit={invite ? invite : closeInfoDialog}
            submitLable={invite ? 'Invite' : 'Close'}
            submitColor={'primary'}
            close={invite ? closeInfoDialog : undefined}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  )
}
