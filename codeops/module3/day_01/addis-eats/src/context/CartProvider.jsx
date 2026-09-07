import React, { useReducer, useMemo } from 'react'
import PropTypes from 'prop-types'
import { cartReducer } from './cartReducer'
import { CartContext } from './CartContext'

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const total = state.items.reduce((sum, dish) => sum + (dish.price || 0), 0)

  // Memoized provider value: prevents consumers from re-rendering unless items or total changes
  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
    }),
    [state.items, total]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CartProvider
