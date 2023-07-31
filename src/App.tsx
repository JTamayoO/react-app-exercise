import Autocomplete from "components/Autocomplete"
import Highlighter from "components/Highlighter"

import { useState } from "react"
import { CountryEntry, fetchCountriesSuggestions } from "api/countries_api"
import { fetchSuggestionsFruit } from "api/mock_api"

import "./App.css"

function App() {
  const [selectedValue, setSelectedValue] = useState<CountryEntry | null>(null)
  const [selectedFruit, setSelectedFruit] = useState("")

  return (
    <div className="container-app">
      {/* Autocomplete using Countries API, search with a real Api Search. */}
      <section aria-label="Autocomplete - Countries" className="autocomplete-container">
        <h2 className="autocomplete-title">Search for a country</h2>
        <Autocomplete
          placeholder="Enter country name"
          onSelect={setSelectedValue}
          fetchSuggestions={fetchCountriesSuggestions}
          getSuggestionValue={(item) => item.name.common}
          renderSuggestion={(item: CountryEntry, inputValue: string) => {
            return <Highlighter text={item.name.common} textToHighlight={inputValue} />
          }}
          />
        {!!selectedValue?.name.common && <p className="results">Selected country: {selectedValue?.name.common}</p>}

      </section>

      {/* Autocomplete using fruit mock_api */}
      <section aria-label="Autocomplete - Fruits" className="autocomplete-container">
        <h2 className="autocomplete-title">Search for a fruit</h2>
        <Autocomplete
          placeholder="Enter a fruit"
          fetchSuggestions={fetchSuggestionsFruit}
          onSelect={setSelectedFruit}
          getSuggestionValue={(item) => item}
          renderSuggestion={(item: string, inputValue: string) => {
            return <Highlighter text={item} textToHighlight={inputValue} />
          }}
        />

        {!!selectedFruit && <p className="results">Selected fruit: {selectedFruit}</p>}
      </section>
    </div>
  )
}

export default App
