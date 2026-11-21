import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { AppProvider } from './app/AppContext.tsx'
import './index.css'
import { HttpContentRepository } from './services/contentRepository.ts'
import { BrowserSpeechService } from './services/speechService.ts'

const queryClient = new QueryClient()
const services = { content: new HttpContentRepository(), speech: new BrowserSpeechService() }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider services={services}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>,
)
