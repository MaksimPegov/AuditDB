// unit test for AppHeader component
import { render } from '@testing-library/react'

import { AppHeader } from './AppHeader'
import { componentId } from './AppHeader'

//#region Mocks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

jest.mock('shared/components/header-links/HeaderLinks')
jest.mock('shared/components/user-contol/UserControl')
jest.mock('shared/components/user-type-switch/UserTypeSwitch')
//#endregion
describe('AppHeader', () => {
  const renderComponent = () => render(<AppHeader />)

  it('should render successfully', () => {
    const { baseElement } = renderComponent()
    expect(baseElement).toBeTruthy()
  })

  it('should have proper data-testid attribute', () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId(componentId)).toBeTruthy()
  })
})
