import { MonetizationOn } from '@mui/icons-material'
import { cn } from '@bem-react/classname'
import React from 'react'

import './Bages.scss'

const bem = cn('Bages')

export type BagesProps = {
  price: string
  raiting?: string
}

export const Bages: React.FC<BagesProps> = ({ price }) => {
  return (
    <div className={bem()}>
      <div className={bem('Price')}>
        <MonetizationOn className={bem('Icon', { price: true })} />
        <span className={bem('Text', { price: true })}>{price} </span>
        <span className={bem('Lable')}>price per line</span>
      </div>
    </div>
  )
}
