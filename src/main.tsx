import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/space-grotesk/300.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import './index.css'
import App from './App.tsx'
import { initVisitSource } from './lib/visitSource'

// źródło wizyty zapisujemy przy wejściu, zanim router zmieni adres (formularz /wspolpraca dołącza je do zgłoszenia w CRM)
initVisitSource()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
