import { fireEvent, screen } from '@testing-library/react'
import type { VocabularyItem } from '../domain/language'
import { renderApp } from '../test/renderApp'

const brot: VocabularyItem = {
  id: 'a1-brot',
  level: 'A1',
  variant: 'de-DE',
  lemma: 'Brot',
  gender: 'n',
  plural: 'Brote',
  partOfSpeech: 'noun',
  translations: { es: 'pan' },
  tags: ['comida'],
}

test('lists words with article and translation, and reads them aloud', async () => {
  const { speech } = renderApp('/vocabulary', [brot])
  expect(await screen.findByText('Brot')).toBeInTheDocument()
  expect(screen.getByText('das')).toBeInTheDocument()
  expect(screen.getByText('pan')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: 'Escuchar: Brot' }))
  expect(speech.speak).toHaveBeenCalledWith('das Brot', 'de-DE')
})

test('unfinished sections show a coming soon page', () => {
  renderApp('/grammar')
  expect(screen.getByText(/próxima fase/)).toBeInTheDocument()
})
