import { screen } from '@testing-library/react'
import { renderApp } from '../test/renderApp'

test('shows the six learning sections', () => {
  renderApp('/')
  for (const title of ['Vocabulario', 'Gramática', 'Conversación', 'Escucha', 'Pronunciación', 'Mis recursos']) {
    expect(screen.getByText(title)).toBeInTheDocument()
  }
})
