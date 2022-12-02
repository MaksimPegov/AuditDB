import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppState } from 'app.store'

export const UnAuthGuard = ({ comp }: { comp: ReactNode }) => {
  const user = useSelector((state: AppState) => state.shared.user)
  const navigate = useNavigate()

  useEffect(() => {
    checkUser()
  }, [comp, user])

  const checkUser = () => {
    if (user) {
      navigate(`/cabinet`)
    }
  }

  return user ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  )
}
