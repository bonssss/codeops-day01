/**
 * Pure cart reducer function.
 * Manages cart state transitions for 'add', 'remove', and 'clear'.
 * Operates purely without any side-effects, making it directly testable outside React.
 *
 * @param {{ items: Array<{ id: number|string, name: string, price: number, [key: string]: any }> }} state
 * @param {{ type: 'add'|'remove'|'clear', dish?: object, id?: number|string }} action
 * @returns {{ items: Array }}
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { items: [...state.items, action.dish] }
    case 'remove':
      return { items: state.items.filter((d) => d.id !== action.id) }
    case 'clear':
      return { items: [] }
    default:
      throw new Error('Unknown action: ' + action.type)
  }
}

export default cartReducer
