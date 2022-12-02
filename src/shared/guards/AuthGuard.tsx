import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppState } from 'app.store'

export const AuthGuard = ({ comp }: { comp: ReactNode }) => {
  const user = useSelector((state: AppState) => state.shared.user)
  const navigate = useNavigate()

  useEffect(() => {
    checkToken()
  }, [comp])

  const checkToken = () => {
    if (!user) {
      navigate(`/sign-in`)
    }
  }

  return !user ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  )
}
