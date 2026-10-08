// lib/fetcher.js

/**
 * Shared SWR fetcher function.
 * Accepts a URL and fetch options, handles HTTP errors, and returns parsed JSON.
 *
 * @param  {...any} args - Arguments passed to fetch (URL, options)
 * @returns {Promise<any>}
 */
export async function fetcher(...args) {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    try {
      error.info = await res.json();
    } catch {
      error.info = { statusText: res.statusText };
    }
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export default fetcher;
