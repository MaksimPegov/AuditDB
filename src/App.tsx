import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { Login } from 'auth/login/Login'
import { Cabinet } from 'auth/cabinet/Cabinet'
import { Registation } from 'auth/registration/Registation'
import { AuthGuard, UnAuthGuard } from 'shared/guards'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { authActions } from 'auth/state/auth.reducer'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authActions.fetchUserInfo())
    }
  }, [])

  return (
    <main className="App" style={{ width: '100vh' }}>
      <Routes location={location} key={location.pathname}>
        <Route path="/main" element={<div>hello</div>} />
        <Route path="/sign-in" element={<UnAuthGuard comp={<Login />} />} />
        <Route path="/sign-up" element={<UnAuthGuard comp={<Registation />} />} />
        <Route path="/cabinet" element={<AuthGuard comp={<Cabinet />} />} />
        {/* <Route path="/cabinet" element={<Cabinet />} /> */}
        <Route path="/*" element={<Navigate to="/main" />} />
      </Routes>
    </main>
  )
}

export default App
