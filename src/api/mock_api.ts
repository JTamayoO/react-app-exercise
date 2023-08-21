/**
 * Fetches fruit name suggestions based on the user input.
 * @param {string} value - The user input to search for fruit name suggestions.
 * @returns {Promise<string[]>} A promise that resolves to an array of strings representing the fruit name suggestions.
 */
export const fetchSuggestionsFruit = async (value: string, signal: AbortSignal): Promise<string[]> => {
  const fruits = ["Apple", "Banana", "Orange", "Mango", "Grapes"]

  return new Promise((resolve) => {
    // Simulate an asynchronous operation with setTimeout
    setTimeout(() => {
      // Filter the fruits based on the user input
      resolve(
        fruits.filter((item) => {
          return item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        })
      )
    }, 500)  // Simulate a delay of 500 milliseconds for a more realistic API call.
  })
}
