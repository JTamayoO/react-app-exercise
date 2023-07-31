import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Autocomplete from './index'

const fetchCountriesSuggestions = () => Promise.resolve([
  { name: { common: 'Country 1' } },
  { name: { common: 'Country 2' } },
])

const fetchSuggestionsFruit = ()=> Promise.resolve(['Apple', 'Banana', 'Orange'])

describe('Autocomplete', () => {
  it('should render with default props', () => {
    render(<Autocomplete onSelect={() => {}} getSuggestionValue={(item) => item}  renderSuggestion={() => <div />} fetchSuggestions={fetchSuggestionsFruit} />)
    const inputElement = screen.getByRole('search')
    expect(inputElement).toBeInTheDocument()
  })

  it('should render suggestions based on user input', async () => {
    render(
      <Autocomplete
        onSelect={() => {}}
        getSuggestionValue={(item) => item.name.common}
        renderSuggestion={(item) => <div>{item.name.common}</div>}
        fetchSuggestions={fetchCountriesSuggestions}
      />
    )

    const inputElement = screen.getByRole('search')

    // Type 'Country' into the input
    fireEvent.change(inputElement, { target: { value: 'Country' } })

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('Country 1')).toBeInTheDocument()
    })
  })

  it('should call onSelect when a suggestion is selected', async () => {
    const mockOnSelect = jest.fn()
    render(
      <Autocomplete
        onSelect={mockOnSelect}
        getSuggestionValue={(item) => item}
        renderSuggestion={(item) => <div>{item}</div>}
        fetchSuggestions={fetchSuggestionsFruit}
      />
    )

    const inputElement = screen.getByRole('search')

    // Type 'Apple' into the input
    fireEvent.change(inputElement, { target: { value: 'Apple' } })

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })

    // Select the 'Apple' suggestion
    fireEvent.click(screen.getByText('Apple'))

    // Check if onSelect is called with the correct value
    expect(mockOnSelect).toHaveBeenCalledWith('Apple')
  })
})
