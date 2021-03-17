import { useState } from "react"

export default function useURLState<T>(
  initialValue: T,
  key: string
): [T, (newValue: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const queryString = window.location.search
      const params = new URLSearchParams(queryString)
      const item = params.get(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to URL query string
      const params = new URLSearchParams()
      params.set(key, JSON.stringify(valueToStore))
      window.history.replaceState(
        "",
        "",
        `${window.location.href.split("?")[0]}?${params.toString()}`
      )
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
