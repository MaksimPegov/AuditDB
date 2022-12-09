import { motion } from 'framer-motion'
import React from 'react'

import { cn } from '@bem-react/classname'
import './MainTitle.scss'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const componentId = 'MainTitle'
const bem = cn(componentId)

export const MainTitle: React.FC = () => {
  const navigate = useNavigate()

  const auditorHandleClick = () => {
    navigate('/sign-up')
  }
  return (
    <motion.div
      className={bem()}
      data-testid={bem()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className={bem('Header')}>
        Start your project right now <br /> or audit like expert
      </h1>
      <div className={bem('Buttons')}>
        <Button
          variant="contained"
          className={bem('Button', { auditor: true })}
          onClick={() => navigate('/sign-up')}
        >
          Become auditor
        </Button>
        <Button
          variant="contained"
          className={bem('Button', { client: true })}
          onClick={() => navigate('/sign-up')}
        >
          Show your project
        </Button>
      </div>
    </motion.div>
  )
}
