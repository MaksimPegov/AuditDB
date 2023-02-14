import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'
import { useState } from 'react'
import { Button, Avatar, Dialog, DialogContent } from '@mui/material'

import './ProjectCard.scss'
import { Project } from 'shared/models/project'
import { StatusBar } from 'shared/components/status-bar/StatusBar'
import { useLocation } from 'react-router-dom'
import { ProjectInfo } from '@customer/components/project-info/ProjectInfo'

export type ProjectCardProps = {
  project: Project
  onDelete?: (id: string) => void
  onEdit?: (project: Project) => void
}

export const componentId = 'ProjectCard'
const bem = cn(componentId)

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const [infoDialog, setInfoDialog] = useState(false)
  const location = useLocation()
  const showStatus = location.pathname !== '/main'

  const [avatar, setAvatar] = useState(
    `/images/avatar/${Math.floor(Math.random() * 10)}.jpg`,
  )

  const closeInfoDialog = () => {
    setInfoDialog(false)
  }

  return (
    <Grid container className={bem()}>
      <Grid xs={12} display="flex">
        <Avatar className={bem('Avatar')} alt={project.name} src={avatar} />
      </Grid>

      <Grid xs={12} display="flex">
        <span className={bem('Name')} title={project.name}>
          {project.name}
        </span>
      </Grid>

      <Grid xs={12} display="flex">
        <span className={bem('Tags')} title={project.tags} color="text.secondary">
          {project.tags.replaceAll(',', ', ')}
        </span>
      </Grid>

      {showStatus ? (
        <Grid xs={12} className={bem('Status')}>
          <StatusBar
            color={project.status === 'shown' ? 'green' : 'secondary'}
            desc={project.status === 'shown' ? 'Published' : 'Unpublished'}
          />
        </Grid>
      ) : null}

      <Grid xs={12} display="flex">
        {onEdit ? (
          <Button
            component="span"
            variant="contained"
            color="primary"
            className={bem('Button')}
            onClick={() => onEdit(project)}
          >
            Edit
          </Button>
        ) : (
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
        )}
      </Grid>

      <Dialog open={infoDialog} onClose={closeInfoDialog}>
        <DialogContent>
          <ProjectInfo project={project} avatarUrl={avatar} close={closeInfoDialog} />
        </DialogContent>
      </Dialog>
    </Grid>
  )
}
