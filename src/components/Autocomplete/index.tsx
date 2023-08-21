import React, { useState, useEffect, useCallback } from "react"
import { AutocompleteDefaultProps } from "utils/constants"

import Input from "../Input"
import Loader from "../Loader"
import useDebounce from "hooks/useDebounce"

import "./style.css"

interface AutocompleteProps<T> {
  placeholder?: string
  noSuggestionsMessage?: string
  debounceTime?: number
  onSelect: (item: T) => void
  getSuggestionValue: (item: T) => string
  renderSuggestion: (item: T, inputValue: string) => React.ReactNode
  fetchSuggestions: (value: string, signal: AbortSignal ) => Promise<T[]>
}

/**
 * An Autocomplete component that fetches suggestions based on user input and displays them in a dropdown list to select.
 * @param {AutocompleteProps} props - The props for the Autocomplete component.
 * @returns {JSX.Element} - The Autocomplete component.
 */
function Autocomplete<T>({
  placeholder = AutocompleteDefaultProps.PLACEHOLDER,
  debounceTime = AutocompleteDefaultProps.DEBOUNCE_TIME,
  noSuggestionsMessage = AutocompleteDefaultProps.NOT_SUGGESTIONS_MESSAGE,
  onSelect,
  renderSuggestion,
  fetchSuggestions,
  getSuggestionValue,
}: AutocompleteProps<T>): JSX.Element {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<T[]>([])
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Debounce the user input to avoid excessive API calls
  const debouncedInputValue = useDebounce(inputValue, debounceTime)

  useEffect(() => {
    setIsLoading(true)
    const controller = new AbortController()
    const signal = controller.signal

    if (debouncedInputValue) {
      fetchSuggestions(debouncedInputValue, signal).then((data) => {
        setSuggestions(data)
        setIsLoading(false)
      })
    }

    return () => {
      controller.abort()
    }
  }, [debouncedInputValue, fetchSuggestions])

  // Function to handle user selection from the suggestion list
  const handleOptionSelect = useCallback(
    (selectedValue: T) => {
      setInputValue(getSuggestionValue(selectedValue))
      setSelectedItem(selectedValue)
      setSuggestions([]) // Clear the suggestions after selection
      onSelect(selectedValue)
    },
    [getSuggestionValue, onSelect]
  )

  // Function to handle user input change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      setIsLoading(true)
      setInputValue(value)
      setSelectedItem(null)
    },
    []
  )

  return (
    <div className="autocomplete">
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search Input"
        role="search"
      />

      {!selectedItem && inputValue && (
        <div className="autocomplete-wrapper">
          <div className="autocomplete-content">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="autocomplete-suggestions">
                {suggestions && suggestions.length > 0 ? (
                  <ul
                    className="autocomplete-suggestions-list"
                    role="listbox"
                    aria-label="Suggestions"
                  >
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={`suggestion-${index}`}
                        role="option"
                        tabIndex={0}
                        aria-selected={suggestion === selectedItem}
                        onClick={() => handleOptionSelect(suggestion)}
                        onKeyUp={(e) => e.key === 'Enter' ? handleOptionSelect(suggestion) : "" }
                        className="autocomplete-suggestion"
                      >
                        {renderSuggestion(suggestion, inputValue)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="autocomplete-no-results">
                    <span>{noSuggestionsMessage}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Autocomplete
