import { cn } from '@bem-react/classname'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

export const componentId = 'MainRouter'

const bem = cn(componentId)

export const MainRouter = () => {
  const location = useLocation()
  return (
    <AnimatePresence>
      <div className={bem()} data-testid={bem()}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<div>hello</div>} />
        </Routes>
      </div>
    </AnimatePresence>
  )
}
