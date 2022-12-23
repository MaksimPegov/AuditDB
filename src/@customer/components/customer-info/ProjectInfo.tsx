import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Avatar, Button } from '@mui/material'
import { cn } from '@bem-react/classname'

import { Project } from 'shared/models/project'
import './ProjectInfo.scss'
import { Tags } from 'shared/components/tags/Tags'

const componentId = 'ProjectInfo'
const bem = cn(componentId)

export const ProjectInfo: React.FC<{
  project: Project
  avatarUrl: string
  close: () => void
}> = ({ project, avatarUrl, close }) => {
  return (
    <Grid container spacing={3} className={bem()}>
      <Grid xs={12}>
        <Avatar className={bem('Avatar')} alt={project.name} src={avatarUrl} />
      </Grid>

      <Grid xs={12} display="flex">
        <span className={bem('Name', { name: true })}>{project.name}</span>
      </Grid>

      <Grid xs={4} display="flex">
        <span className={bem('Lable', { gitUrl: true })}>Git profile</span>
      </Grid>
      <Grid xs={8}>
        <span className={bem('Data', { gitUrl: true })}>{project.gitUrl}</span>
      </Grid>

      <Grid xs={4} display="flex">
        <span className={bem('Lable', { desc: true })}>Desctiption</span>
      </Grid>
      <Grid xs={8}>
        <span className={bem('Data', { desc: true })}>{project.description}</span>
      </Grid>

      {(project as any).contacts.telegram ? (
        <React.Fragment>
          <Grid xs={4} display="flex">
            <span className={bem('Lable', { email: true })}>E-mail</span>
          </Grid>
          <Grid xs={8}>
            <span className={bem('Data', { email: true })}>
              {(project as any).contacts.email}
            </span>
          </Grid>
        </React.Fragment>
      ) : null}

      {(project as any).contacts.telegram ? (
        <React.Fragment>
          <Grid xs={4} display="flex">
            <span className={bem('Lable', { phone: true })}>Telegram</span>
          </Grid>
          <Grid xs={8}>
            <span className={bem('Data', { phone: true })}>
              {(project as any).contacts.telegram}
            </span>
          </Grid>
        </React.Fragment>
      ) : null}

      <Grid xs={12} className={bem('Tags')}>
        <Tags tags={project.tags} />
      </Grid>

      <Grid xs={12} display="flex">
        <Button className={bem('Close')} onClick={close}>
          Close
        </Button>
      </Grid>
    </Grid>
  )
}
