import { createContext, useContext } from 'react'

export const ThemeContext = createContext(null)

/**
 * Guarded hook to consume ThemeContext.
 * Throws an explicit error if called outside ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
