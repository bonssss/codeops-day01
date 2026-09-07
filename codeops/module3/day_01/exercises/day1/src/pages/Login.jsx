import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Exercise 7: Determine where to return the user after signing in
  const from = location.state?.from?.pathname || '/checkout'
  const isRedirected = Boolean(location.state?.from)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }

    login(
      {
        name: name.trim(),
        email: email.trim() || `${name.trim().toLowerCase()}@example.com`,
      },
      () => {
        navigate(from, { replace: true })
      }
    )
  }

  const handleQuickLogin = () => {
    login(
      {
        name: 'Abebe Kebede',
        email: 'abebe@addiseats.com',
      },
      () => {
        navigate(from, { replace: true })
      }
    )
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sign In to Addis Eats</h1>
        <p className="subtitle">
          {isRedirected
            ? '🔐 Please sign in to access your checkout and complete your order.'
            : 'Access your account, order history, and exclusive dining discounts.'}
        </p>

        {error && <div className="status-message error-state" style={{ marginBottom: '1rem', padding: '0.75rem' }}><p>{error}</p></div>}

        <form onSubmit={handleSubmit} className="delivery-form">
          <div className="form-group">
            <label htmlFor="login-name">Full Name *</label>
            <input
              id="login-name"
              type="text"
              placeholder="e.g. Abebe Kebede"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-email">Email Address (Optional)</label>
            <input
              id="login-email"
              type="email"
              placeholder="e.g. abebe@addiseats.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Sign In & Continue
          </button>
        </form>

        <div className="login-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="btn-secondary"
          style={{ width: '100%', textAlign: 'center' }}
          onClick={handleQuickLogin}
        >
          ⚡ Quick Demo Sign In (Abebe Kebede)
        </button>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/menu" className="back-link">
            ← Continue browsing menu as guest
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
