import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'
import { AppProvider } from '../app/AppContext'
import type { VocabularyItem } from '../domain/language'
import type { ContentRepository } from '../services/contentRepository'
import type { SpeechService } from '../services/speechService'

export function renderApp(path: string, vocabulary: VocabularyItem[] = []) {
  const content: ContentRepository = { getVocabulary: async () => vocabulary }
  const speech: SpeechService = { isAvailable: true, speak: vi.fn() }
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={queryClient}>
      <AppProvider services={{ content, speech }}>
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      </AppProvider>
    </QueryClientProvider>,
  )
  return { speech }
}
