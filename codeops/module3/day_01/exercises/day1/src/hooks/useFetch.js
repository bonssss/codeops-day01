import { useState, useEffect } from 'react'

/**
 * Custom hook to encapsulate asynchronous data fetching with AbortController cleanup,
 * loading state, error handling, and res.ok verification.
 * 
 * @param {string} url - The URL endpoint to fetch.
 * @returns {{ data: any, loading: boolean, error: string | null }}
 */
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    const { signal } = controller

    setLoading(true)
    setError(null)

    fetch(url, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data (Status ${res.status}: ${res.statusText || 'Not Found'})`)
        }
        return res.json()
      })
      .then((responseData) => {
        setData(responseData)
        setLoading(false)
      })
      .catch((err) => {
        // Ignore errors caused by aborted requests on unmount/dependency change
        if (err.name === 'AbortError') {
          return
        }
        setError(err.message)
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
