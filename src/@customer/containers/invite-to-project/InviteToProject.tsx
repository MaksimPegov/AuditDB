import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { ProjectCard } from '@customer/components/project-card/ProjectCard'
import { useSelector } from 'react-redux'

import { selectCustomerProjects } from '@customer/state/customer.selectors'
import './InviteToProject.scss'

export const InviteToProject = () => {
  const projects = useSelector(selectCustomerProjects)

  return (
    <Grid container>
      {projects.map((project) => (
        <Grid xs={12} md={6} display="flex">
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  )
}
