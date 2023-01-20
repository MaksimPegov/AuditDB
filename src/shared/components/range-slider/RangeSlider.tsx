import { InputAdornment, InputBase, Slider } from '@mui/material'
import React, { useDeferredValue, useEffect } from 'react'
import { cn } from '@bem-react/classname'
import Grid from '@mui/material/Unstable_Grid2'

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
  fractial?: boolean
}> = ({
  onChange,
  value = [],
  color = 'primary',
  min = 20,
  max = 80,
  step = 1,
  fractial = true,
}) => {
  const [localValue, setLocalValue] = React.useState<RangeValue>([
    value[0] || min,
    value[1] || max,
  ])
  const [inputValue, setInputValue] = React.useState<Array<number | string>>([min, max])

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

  const handleSliderChange = (rangeValue: RangeValue) => {
    setLocalValue(rangeValue)
    setInputValue(rangeValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'input-min':
        setInputValue([event.target.value, inputValue[1]])
        setLocalValue([valueCheck(+event.target.value), inputValue[1] as number])
        break
      case 'input-max':
        setInputValue([inputValue[0], event.target.value])
        setLocalValue([inputValue[0] as number, valueCheck(+event.target.value)])
        break
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInputValue(localValue)
  }

  const valueCheck = (value: number) => {
    if (value < min) {
      return min
    } else if (value > max) {
      return max
    } else if (!fractial) {
      return Math.trunc(value)
    } else {
      return value
    }
  }

  useEffect(() => {
    onChange(localValue)
  }, [localValue])

  return (
    <Grid container spacing={2} className={bem()}>
      <Grid xs={8} display="flex">
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          className={bem('Slider')}
          color={color}
          size="small"
          data-testid={bem('Slider')}
          value={localValue as number[]}
          onChange={(e, v) => handleSliderChange(v as RangeValue)}
          aria-labelledby="input-slider"
          disableSwap
          step={step}
          min={min}
          max={max}
          marks={marks}
        />
      </Grid>

      <Grid xs={4} className={bem('InputGrid')}>
        <div className={bem('InputBox')}>
          <InputBase
            id="input-min"
            className={bem('InputBase', { first: true })}
            data-testid={bem('InputBaseFrom')}
            value={inputValue[0]}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: step,
              min: min,
              max: max - step,
              type: 'number',
              className: bem('Input'),
            }}
            onBlur={handleBlur}
          />

          <div className={bem('Spacing')}>-</div>

          <InputBase
            id="input-max"
            className={bem('InputBase', { second: true })}
            data-testid={bem('InputBaseTo')}
            value={inputValue[1]}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: step,
              min: min + step,
              max: max,
              type: 'number',
              className: bem('Input'),
            }}
            onBlur={handleBlur}
          />
          <div className={bem('Currency')}>$</div>
        </div>
      </Grid>
    </Grid>
  )
}
