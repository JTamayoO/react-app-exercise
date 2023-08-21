/**
 * Fetches JSON data from the specified URL.
 * @param {string} url - The URL from which to fetch the JSON data.
 * @param {AbortSignal} signal - The AbortSignal to handle aborting ongoing fetch requests.
 * @returns {Promise<any>} A promise that resolves to the parsed JSON data from the response.
 * @throws Will throw an error if the URL is empty or if there's an error while fetching or parsing the JSON data.
 */
export const getJSON = async (url: string, signal: AbortSignal): Promise<any> => {
  if (!url) {
    throw new Error("Invalid URL")
  }

  try {
    const response = await fetch(url, { signal })

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json()

      return data
    } else {
      throw new Error("Error getting data")
    }
  } catch (error) {
    throw new Error("Error getting data")
  }
}
