import { render, screen } from '@testing-library/react'

import { componentId } from 'animations/main.router'
import App from 'App'

it(`renders Main Router`, () => {
  render(<App />)
  const linkElement = screen.getByTestId(componentId)
  expect(linkElement).toBeInTheDocument()
})
