import { Grid, InputAdornment, InputBase, Slider } from '@mui/material'
import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'

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
}> = ({ value, setValue, min, max, step, color }) => {
  const [localValue, setComponentValue] = React.useState<
    number | string | Array<number | string>
  >(value)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setComponentValue(newValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComponentValue(event.target.value === '' ? '' : Number(event.target.value))
  }

  const handleBlur = () => {
    if (localValue < 0) {
      setComponentValue(0)
    } else if (localValue > 100) {
      setComponentValue(100)
    }
  }

  useEffect(() => {
    setValue(typeof localValue === 'number' ? localValue : 0)
  }, [localValue])

  return (
    <Grid container spacing={2} className={bem()}>
      <Grid item xs={9} display="flex">
        <Slider
          className={bem('Slider')}
          color={color}
          data-testid={bem('Slider')}
          value={typeof localValue === 'number' ? localValue : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
      </Grid>

      <Grid item xs={3}>
        <InputBase
          className={bem('Input')}
          data-testid={bem('Input')}
          value={localValue}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          startAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            step: step,
            min: min,
            max: max,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid>
    </Grid>
  )
}
