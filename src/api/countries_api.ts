import { getJSON } from "utils/request"

// Documentation: https://restcountries.com/

export type CountryEntry = {
  name: {
    common: string
  }
}

/**
 * Fetches country name suggestions based on the user input from an external API.
 * @param {string} value - The user input to search for country name suggestions.
 * @param {AbortSignal} signal - The AbortSignal to handle aborting ongoing fetch requests.
 * @returns {Promise<CountryEntry[]>} A promise that resolves to an array of CountryEntry objects representing the suggestions.
 * @throws Will throw an error if there is an issue fetching the data from the API.
 */
export const fetchCountriesSuggestions = async (value: string, signal: AbortSignal): Promise<CountryEntry[]> => {
  try {
    const countries: CountryEntry[] = await getJSON(
      `https://restcountries.com/v3.1/name/${value}?fields=name`, signal
    )

    // Filter the countries based on the user input, since the API doesn't filter them accurately
    return countries.filter((item) => {
      return item?.name?.common
        .toLocaleLowerCase()
        ?.includes(value?.toLocaleLowerCase())
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
