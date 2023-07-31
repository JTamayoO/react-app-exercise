import { render, screen } from '@testing-library/react'
import App from './App'

test('renders countries-autocomplete', () => {
  render(<App />)
  const headerElement = screen.getByText(/Search for a country/i)
  expect(headerElement).toBeInTheDocument()
})

test('renders fruits-autocomplete', () => {
  render(<App />)
  const headerElement = screen.getByText(/Search for a fruit/i)
  expect(headerElement).toBeInTheDocument()
})
