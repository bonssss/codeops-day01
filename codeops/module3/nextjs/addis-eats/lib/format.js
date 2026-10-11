/**
 * lib/format.js
 * Standard formatting utilities for Addis Eats:
 * - etb(amount): formats currency into Ethiopian Birr (ETB)
 * - when(date): formats absolute timestamp (e.g., "Oct 11, 2026, 10:15 AM")
 * - relative(date): formats relative elapsed time (e.g., "just now", "5 minutes ago")
 */

/**
 * Format a number or numeric string as ETB currency.
 * @param {number|string} amount
 * @returns {string} e.g. "1,350 ETB"
 */
export function etb(amount) {
  const num = Number(amount) || 0;
  return `${num.toLocaleString("en-US")} ETB`;
}

/**
 * Format a date as an absolute readable string.
 * @param {string|number|Date} date
 * @param {object} [options]
 * @returns {string} e.g. "Oct 11, 2026, 10:15 AM"
 */
export function when(date, options = {}) {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";

  const defaultOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return d.toLocaleDateString("en-US", { ...defaultOptions, ...options });
}

/**
 * Format a date into a human-friendly relative time string.
 * @param {string|number|Date} date
 * @returns {string} e.g. "just now", "12 minutes ago", "3 hours ago"
 */
export function relative(date) {
  if (!date) return "just now";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "unknown";

  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 15) return "just now";
  if (diffSec < 60) return `${diffSec} seconds ago`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return diffMin === 1 ? "1 minute ago" : `${diffMin} minutes ago`;
  }

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
  }

  return when(date, { month: "short", day: "numeric", year: "numeric" });
}

export default {
  etb,
  when,
  relative,
};
