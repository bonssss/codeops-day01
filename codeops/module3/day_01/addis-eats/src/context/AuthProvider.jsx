import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('addis_eats_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })
  const [loading] = useState(false)

  const login = (userData) => {
    setUser(userData)
    try {
      localStorage.setItem('addis_eats_user', JSON.stringify(userData))
    } catch {
      // Ignore storage errors
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('addis_eats_user')
    } catch {
      // Ignore storage errors
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider
