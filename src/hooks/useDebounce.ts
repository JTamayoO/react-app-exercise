import { useState, useEffect } from 'react';

/**
 * Creates a debounced value based on the provided input value and delay.
 * The debounced value will be updated after the input value remains unchanged for the specified delay.
 * @param {string} value - The input value that needs to be debounced.
 * @param {number} delay - The delay in milliseconds before updating the debounced value.
 * @returns {string} The debounced value that gets updated after the specified delay.
 */
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    };
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
