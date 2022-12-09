import React from 'react'
import { cn } from '@bem-react/classname'
import { useNavigate } from 'react-router-dom'

import { Welcome } from 'shared/components/welcome/Welcome'
import './MainPage.scss'
import { useDispatch } from 'react-redux'
import { sharedActions } from 'shared/state/shared.reducer'
import { AccountType } from 'shared/models/User'

const componentId = 'MainPage'
const bem = cn(componentId)

export const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectAccountTypeHandler = (type: AccountType) => {
    dispatch(sharedActions.setUserPreferences(type))
    navigate('/sign-up')
  }

  return (
    <div className={bem()}>
      <Welcome onSelect={selectAccountTypeHandler} />
    </div>
  )
}
