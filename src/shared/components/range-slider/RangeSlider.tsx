import { Grid, InputAdornment, InputBase, Slider } from '@mui/material'
import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'

import './RangeSlider.scss'

const bem = cn('RangeSlider')

export type SliderColor = 'primary' | 'secondary'
type RangeValue = [number, number]

export const RangeSlider: React.FC<{
  onChange: (value: RangeValue) => void
  value: RangeValue
  min?: number
  max?: number
  step?: number
  color?: SliderColor
}> = ({ onChange, value = [], color = 'primary', min = 20, max = 80, step = 1 }) => {
  const [localValue, setLocalValue] = React.useState<RangeValue>([
    value[0] || min,
    value[1] || max,
  ])

  const handleSliderChange = (rangeValue: RangeValue) => {
    setLocalValue(rangeValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'input-min':
        if (+event.target.value < min) {
          setLocalValue((state) => [min, state[1]])
        } else if (+event.target.value > max) {
          setLocalValue((state) => [max, state[1]])
        } else {
          setLocalValue((state) => [+event.target.value, state[1]])
        }
        break

      case 'input-max':
        if (+event.target.value < min) {
          setLocalValue((state) => [state[0], min])
        } else if (+event.target.value > max) {
          setLocalValue((state) => [state[0], max])
        } else {
          setLocalValue((state) => [state[0], +event.target.value])
        }
        break
    }
  }

  useEffect(() => {
    onChange(localValue)
  }, [localValue])

  return (
    <Grid container spacing={2} className={bem()}>
      <Grid item xs={6} display="flex">
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          className={bem('Slider')}
          color={color}
          data-testid={bem('Slider')}
          value={localValue as number[]}
          onChange={(e, v) => handleSliderChange(v as RangeValue)}
          aria-labelledby="input-slider"
          disableSwap
        />
      </Grid>

      <Grid item xs={6} className={bem('InputBox')}>
        <InputBase
          id="input-min"
          className={bem('Input', { first: true })}
          data-testid={bem('Input')}
          value={localValue[0]}
          size="small"
          onChange={handleInputChange}
          startAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            step: step,
            min: min,
            max: max,
            type: 'number',
          }}
        />

        <div className={bem('Spacing')}>-</div>

        <InputBase
          id="input-max"
          className={bem('Input', { second: true })}
          data-testid={bem('Input')}
          value={localValue[1]}
          size="small"
          onChange={handleInputChange}
          inputProps={{
            step: step,
            min: min,
            max: max,
            type: 'number',
          }}
          startAdornment={<InputAdornment position="end">$</InputAdornment>}
        />
      </Grid>
    </Grid>
  )
}
