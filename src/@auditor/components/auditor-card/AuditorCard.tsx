import {
  Card,
  Button,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Avatar,
  Dialog,
  DialogContent,
} from '@mui/material'
import { useState } from 'react'
import { cn } from '@bem-react/classname'

import './AuditorCard.scss'
import { Auditor } from 'shared/models/auditor'
import { AuditorInfo } from '@auditor/components/auditor-info/AuditorInfo'

export type AuditorCardProps = {
  auditor: Auditor
}

export const componentId = 'AuditorCard'
const bem = cn(componentId)

export const AuditorCard: React.FC<AuditorCardProps> = ({ auditor }) => {
  const [infoDialog, setInfoDialog] = useState(false)
  const [state, setState] = useState({
    isHovered: false,
  })

  const [avatar, setAvatar] = useState(
    `/images/avatar/${Math.floor(Math.random() * 10)}.jpg`,
  )

  const handleMouseEnter = () => {
    setState((old) => ({ ...old, isHovered: true }))
  }

  const handleMouseLeave = () => {
    setState((old) => ({ ...old, isHovered: false }))
  }

  const closeInfoDialog = () => {
    setInfoDialog(false)
  }

  return (
    <Card
      className={bem()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent>
        <Avatar className={bem('Avatar')} alt={auditor.fname} src={avatar} />

        <Typography className={bem('Name')} gutterBottom variant="h6" component="div">
          {auditor.fname} {auditor.lname}
        </Typography>

        <Typography className={bem('Tags')} variant="body2" color="text.secondary">
          {auditor.tags}
        </Typography>
      </CardContent>

      <CardActions>
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
      </CardActions>

      <Dialog open={infoDialog} onClose={closeInfoDialog}>
        <DialogContent>
          <AuditorInfo auditor={auditor} avatarUrl={avatar} close={closeInfoDialog} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}
