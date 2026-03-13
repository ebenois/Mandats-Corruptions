import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PoliticiansPage from './pages/PoliticiansPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PoliticiansPage />
  </StrictMode>,
)