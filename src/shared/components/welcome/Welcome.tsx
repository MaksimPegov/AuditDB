import { motion } from 'framer-motion'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import { cn } from '@bem-react/classname'
import './Welcome.scss'
import { Button } from '@mui/material'
import { AccountType } from 'shared/models/user'

const componentId = 'Welcome'
const bem = cn(componentId)

type WelcomeProps = {
  onSelect: (type: AccountType) => void
}
export const Welcome: React.FC<WelcomeProps> = ({ onSelect }) => {
  return (
    <motion.div
      className={bem()}
      data-testid={bem()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Grid container spacing={3}>
        <Grid xs={12}>
          <h1 className={bem('Header')}>
            Start your project right now <br /> or audit like an expert
          </h1>
        </Grid>

        <Grid xs={12} sm={6} display="flex">
          <Button
            variant="contained"
            className={bem('Button', { auditor: true })}
            onClick={() => onSelect('auditor')}
          >
            Become auditor
          </Button>
        </Grid>

        <Grid xs={12} sm={6} display="flex">
          <Button
            variant="contained"
            className={bem('Button', { customer: true })}
            onClick={() => onSelect('customer')}
          >
            Show your project
          </Button>
        </Grid>
      </Grid>
    </motion.div>
  )
}
