import { cn } from '@bem-react/classname'
import { Login } from 'user/login/Login'
import { Registation } from 'user/registration/Registation'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

export const componentId = 'MainRouter'

const bem = cn(componentId)

export const MainRouter = () => {
  const location = useLocation()
  return (
    <AnimatePresence>
      <div className={bem()} data-testid={bem()}>
        <Routes location={location} key={location.pathname}>
          <Route path="/main" element={<div>hello</div>} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Registation />} />
          <Route path="/*" element={<Navigate to="/main" />} />
        </Routes>
      </div>
    </AnimatePresence>
  )
}
