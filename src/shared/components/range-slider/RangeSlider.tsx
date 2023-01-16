import { Grid, InputAdornment, InputBase, Slider } from '@mui/material'
import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'

import './RangeSlider.scss'

const bem = cn('RangeSlider')

export type SliderColor = 'primary' | 'secondary'

export const RangeSlider: React.FC<{
  output: (num: [number, number]) => void
  min: number
  max: number
  step: number
  color: SliderColor
}> = ({ output, min, max, step, color }) => {
  const [localValue, setComponentValue] = React.useState<Array<number | string>>([20, 80])

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setComponentValue(newValue as [number, number])
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'input-min':
        if (typeof Number(event.target.value) !== 'number') {
          return
        } else if (Number(event.target.value) < min) {
          setComponentValue((state) => [min, state[1]])
          return
        } else if (Number(event.target.value) > max) {
          setComponentValue((state) => [max, state[1]])
          return
        } else {
          setComponentValue((state) => [event.target.value, state[1]])
        }
        break
      case 'input-max':
        if (typeof Number(event.target.value) !== 'number') {
          return
        } else if (Number(event.target.value) < min) {
          setComponentValue((state) => [state[0], min])
        } else if (Number(event.target.value) > max) {
          setComponentValue((state) => [state[0], max])
        } else {
          setComponentValue((state) => [state[0], event.target.value])
        }
        break
    }
  }

  const inputValidation = (input: number | string): number => {
    if (input === '' || typeof Number(input) !== 'number' || input < min) {
      return min
    } else if (input > max) {
      return max
    }
    return min
  }

  useEffect(() => {
    output(localValue as [number, number])
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
          onChange={handleSliderChange}
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
