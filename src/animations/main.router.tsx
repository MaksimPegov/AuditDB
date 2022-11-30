import { cn } from '@bem-react/classname'
import { Login } from 'auth/login/Login'
import { Registation } from 'auth/registration/Registation'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

export const componentId = 'MainRouter'

const bem = cn(componentId)

export const MainRouter = () => {
  const location = useLocation()
  return (
    <AnimatePresence>
      <div className={bem()} data-testid={bem()}>
        <Routes location={location} key={location.pathname}>
          <Route path="/wellcome-page" element={<div>hello</div>} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/registration" element={<Registation />} />
          <Route path="/*" element={<Navigate to="/wellcome-page" />} />
        </Routes>
      </div>
    </AnimatePresence>
  )
}
