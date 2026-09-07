import { useState, useEffect } from 'react'

/**
 * Custom hook to fetch data with loading, error states, and AbortController cleanup.
 * Aborts pending in-flight requests when the URL changes or the component unmounts.
 *
 * @param {string} url - The URL or endpoint to fetch from.
 * @returns {{ data: any, loading: boolean, error: string | null }}
 */
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(url))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to fetch menu: Server responded with status ${response.status}`)
        }

        let json = await response.json()

        // Handle category query parameter client-side for static JSON endpoints
        try {
          const urlObj = new URL(url, window.location.origin)
          const categoryParam = urlObj.searchParams.get('category')
          if (categoryParam && categoryParam !== 'All' && Array.isArray(json)) {
            json = json.filter(
              (dish) =>
                dish.category &&
                dish.category.toLowerCase() === categoryParam.toLowerCase()
            )
          }
        } catch {
          // Retain raw json if URL parsing fails
        }

        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load dishes.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup: abort in-flight fetch when url changes or component unmounts
    return () => {
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
