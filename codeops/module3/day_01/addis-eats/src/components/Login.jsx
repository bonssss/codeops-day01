import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    login({ name: name.trim(), phone: phone.trim() })
    navigate(from, { replace: true })
  }

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2>Sign In to Addis Eats</h2>
        <p className="form-subtitle">
          {location.state?.from
            ? 'Please sign in to proceed with checkout.'
            : 'Sign in to access your saved orders & checkout.'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-name">Your Name</label>
            <input
              id="login-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Abebech Gobena"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-phone">Phone Number (Optional)</label>
            <input
              id="login-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0911223344"
            />
          </div>

          <button type="submit" className="primary-btn submit-login-btn">
            Sign In & Continue
          </button>
        </form>

        <p className="login-footer-hint">
          New here? Just enter your name to sign in instantly!
        </p>
      </div>
    </div>
  )
}

export default Login
