import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('addis_eats_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (userData, callback) => {
    setUser(userData)
    localStorage.setItem('addis_eats_user', JSON.stringify(userData))
    if (callback) callback()
  }

  const logout = (callback) => {
    setUser(null)
    localStorage.removeItem('addis_eats_user')
    if (callback) callback()
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
