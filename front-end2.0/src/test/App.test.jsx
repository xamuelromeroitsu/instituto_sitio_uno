import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import { App } from '../App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renderiza el layout base sin errores', () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AuthProvider>,
    )

    expect(container.querySelector('.app-shell')).toBeInTheDocument()
  })
})
