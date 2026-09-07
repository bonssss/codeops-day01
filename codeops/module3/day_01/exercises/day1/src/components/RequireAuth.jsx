import { useLocation, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext'

/**
 * ============================================================================
 * Exercise 7: RequireAuth Route Guard
 * ============================================================================
 * Protects routes from unauthenticated access. If the user is not authenticated,
 * it redirects them to /login while preserving the intended destination in
 * `location.state.from` so they can be routed back upon signing in.
 * ============================================================================
 */
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RequireAuth
