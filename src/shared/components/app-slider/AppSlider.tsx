import { InputAdornment, InputBase, Slider } from '@mui/material'
import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'
import Grid from '@mui/material/Unstable_Grid2'

import './AppSlider.scss'

const bem = cn('AppSlider')

export type SliderColor = 'primary' | 'secondary'

export const AppSlider: React.FC<{
  value: number
  setValue: (newValue: number) => void
  min: number
  max: number
  step: number
  color: SliderColor
  fractial?: boolean
}> = ({ value, setValue, color, min = 1, max = 100, step = 1, fractial = true }) => {
  const [localValue, setLocalValue] = React.useState<
    number | string | Array<number | string>
  >(value)

  const marks = [
    {
      value: min,
      label: `${min}$`,
    },
    {
      value: max,
      label: `${max}$`,
    },
  ]

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setLocalValue(newValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value === '' ? '' : +event.target.value)
  }

  const handleBlur = () => {
    if (localValue < 0) {
      setLocalValue(0)
    } else if (localValue > 100) {
      setLocalValue(100)
    } else if (!fractial) {
      setLocalValue(Math.trunc(+localValue))
    }
  }

  useEffect(() => {
    setValue(typeof localValue === 'number' ? localValue : 0)
  }, [localValue])

  return (
    <Grid container spacing={2} className={bem()}>
      <Grid xs={9} display="flex">
        <Slider
          className={bem('Slider')}
          color={color}
          size="small"
          data-testid={bem('Slider')}
          value={typeof localValue === 'number' ? localValue : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={min}
          max={max}
          step={step}
          marks={marks}
        />
      </Grid>

      <Grid xs={3} display="flex">
        <div className={bem('InputBox')}>
          <InputBase
            className={bem('InputBase')}
            data-testid={bem('InputBase')}
            value={localValue}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: step,
              min: min,
              max: max,
              type: 'number',
              className: bem('Input', { type: 'number' }),
            }}
          />

          <div className={bem('Currency')}>$</div>
        </div>
      </Grid>
    </Grid>
  )
}
