import { Box, Button, InputBase, Menu, MenuItem, Popper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { cn } from '@bem-react/classname'

import './QuickSearch.scss'
import { Auditor } from 'shared/models/auditor'

export type QuickSearchProps<T> = {
  className?: string
  inputName?: string
  submitName?: string

  searchResults: any[]
  component: React.FC<T>
  processing: boolean
  onChange: (value: string) => void
  onSubmit: (value: string) => void
}

export const componentId = 'QuickSearch'
const bem = cn(componentId)

// TODO: make it generic (Auditor -> T)
export const QuickSearch: React.FC<QuickSearchProps<Auditor>> = ({
  className,
  searchResults,
  component,
  inputName = 'Quick search...',
  submitName = 'Find',
  processing = false,
  onChange,
  onSubmit,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const input = useRef<HTMLInputElement>()
  const [text, setText] = useState('')

  const handleInputChange = (e: any) => {
    const value = e.target.value || ''

    value ? openDropdown(e) : closeDropdown()
    setText(value)
    onChange(value)
  }

  const openDropdown = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const closeDropdown = (): void => {
    setAnchorEl(null)
  }

  return (
    <div className={bem()}>
      <div className={bem('Search')}>
        <div className={bem('SearchIcon')}>
          <SearchIcon fontSize="small" />
        </div>

        <InputBase
          ref={input}
          autoFocus
          value={text}
          className={bem('InputBase')}
          placeholder={inputName}
          onChange={handleInputChange}
          inputProps={{
            'aria-describedby': 'account-menu',
            'aria-label': 'search',
            className: bem('Input'),
          }}
        />
      </div>

      <Button
        className={bem('Button')}
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => onSubmit(text)}
      >
        {submitName}
      </Button>

      <Popper
        placement="bottom-start"
        className={bem('Menu')}
        data-testid={bem('Menu')}
        id="account-menu"
        open={!!anchorEl}
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'center',
        // }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'center',
        // }}
      >
        {/* {text.length > 0 ? (
          searchResults.map((item, index) => (
            <div>
              <div
                className={bem('Auditor')}
                data-testid={bem('Auditor')}
                onClick={() => onSelect(item)}
              >
                {component(item)}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )} */}

        <Box sx={{ p: 1 }} className={bem('TEST')}>
          {processing
            ? 'Loading...'
            : searchResults.map((item, index) => (
                <div className={bem('Auditor')}>{component(item)}</div>
              ))}
        </Box>
      </Popper>
    </div>
  )
}
