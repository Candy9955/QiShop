import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStateProvider } from './store'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
