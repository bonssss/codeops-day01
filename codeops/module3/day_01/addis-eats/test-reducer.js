import { cartReducer } from './src/context/cartReducer.js'
import assert from 'node:assert'

console.log('--- Testing cartReducer directly outside React ---')

// 1. Initial State
const initialState = { items: [] }

// 2. Add dish
const doroWat = { id: 1, name: 'Doro Wat', price: 240 }
const tibs = { id: 2, name: 'Tibs', price: 280 }

const stateAfterAdd1 = cartReducer(initialState, { type: 'add', dish: doroWat })
assert.strictEqual(stateAfterAdd1.items.length, 1)
assert.strictEqual(stateAfterAdd1.items[0].name, 'Doro Wat')
console.log('✓ Action "add" (1 item) passed')

const stateAfterAdd2 = cartReducer(stateAfterAdd1, { type: 'add', dish: tibs })
assert.strictEqual(stateAfterAdd2.items.length, 2)
assert.strictEqual(stateAfterAdd2.items[1].name, 'Tibs')
console.log('✓ Action "add" (2 items) passed')

// 3. Remove dish by id
const stateAfterRemove = cartReducer(stateAfterAdd2, { type: 'remove', id: 1 })
assert.strictEqual(stateAfterRemove.items.length, 1)
assert.strictEqual(stateAfterRemove.items[0].id, 2)
console.log('✓ Action "remove" passed')

// 4. Clear cart
const stateAfterClear = cartReducer(stateAfterRemove, { type: 'clear' })
assert.strictEqual(stateAfterClear.items.length, 0)
console.log('✓ Action "clear" passed')

// 5. Unknown action throws Error
assert.throws(
  () => cartReducer(initialState, { type: 'invalid_action' }),
  /Unknown action: invalid_action/
)
console.log('✓ Unknown action error throwing passed')

console.log('--- All cartReducer tests passed successfully! ---')
