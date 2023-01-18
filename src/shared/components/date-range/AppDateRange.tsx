import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'

import './AppDateRange.scss'
import { TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

const componentId = 'DateRange'
const bem = cn(componentId)

export type AppDateRangeProps = {
  fixed?: boolean
  start?: string | null
  end?: string | null
  setStart?: (value: Dayjs) => void
  setEnd?: (value: Dayjs) => void
}
export const AppDateRange = ({
  fixed = false,
  start = null,
  end = null,
  setStart,
  setEnd,
}: AppDateRangeProps) => {
  const [lockalStartValue, setLockalStartValue] = React.useState<Dayjs | null>(
    dayjs(start),
  )
  const [lockalEndValue, setLockalEndValue] = React.useState<Dayjs | null>(dayjs(end))

  const handleChangeStart = (newValue: Dayjs | null) => {
    setLockalStartValue(newValue)
  }
  const handleChangeEnd = (newValue: Dayjs | null) => {
    setLockalEndValue(newValue)
  }

  useEffect(() => {
    if (setStart && setEnd && lockalStartValue && lockalEndValue) {
      setStart(dayjs(start))
      setEnd(dayjs(end))
    }
  }, [start, end])

  return (
    <div className={bem()}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className={bem('Picker', { start: true })}
          inputFormat="MM.DD.YYYY"
          disabled={fixed}
          value={lockalStartValue}
          onChange={handleChangeStart}
          InputAdornmentProps={
            fixed ? { sx: { display: 'none' } } : { sx: { marginLeft: '-5px' } }
          }
          InputProps={{
            className: bem('Input', { start: true }),
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        <span className={bem('Separator')}>-</span>

        <DesktopDatePicker
          className={bem('Picker', { start: true })}
          inputFormat="MM.DD.YYYY"
          disabled={fixed}
          value={lockalEndValue}
          onChange={handleChangeEnd}
          InputAdornmentProps={
            fixed ? { sx: { display: 'none' } } : { sx: { marginLeft: '-5px' } }
          }
          InputProps={{
            className: bem('Input', { start: true }),
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}
