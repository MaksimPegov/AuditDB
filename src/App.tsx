import { BrowserRouter } from 'react-router-dom'
import { cn } from '@bem-react/classname'

import { AppHeader } from 'shared/components/containers/app-header/AppHeader'
import { MainRouter } from 'animations/main.router'
import 'App.css'

const componentId = 'App'
const bem = cn(componentId)

function App() {
  return (
    <div className={bem()}>
      <AppHeader />
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
