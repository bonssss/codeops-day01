/**
 * API client for fetching menu dishes.
 * Fetches menu data from /dishes.json with support for category filtering and AbortSignal cancellation.
 *
 * @param {string} category - Category name to filter by ("All" or specific category name)
 * @param {AbortSignal} [signal] - Optional AbortSignal for request cancellation
 * @returns {Promise<Array>} Promise resolving to an array of dishes
 */
export async function fetchDishes(category = 'All', signal) {
  // Query parameter drives a distinct request in Network tab for category filter verification
  const url = category && category !== 'All'
    ? `/dishes.json?category=${encodeURIComponent(category)}`
    : '/dishes.json'

  const res = await fetch(url, { signal })

  // Validate response status and provide human-friendly error message
  if (!res.ok) {
    throw new Error(
      `Could not load the menu: Server returned ${res.status} (${res.statusText || 'File Not Found'})`
    )
  }

  const data = await res.json()

  // Apply category filtering if a specific category is requested
  if (category && category !== 'All') {
    return data.filter(
      (dish) => dish.category.toLowerCase() === category.toLowerCase()
    )
  }

  return data
}
