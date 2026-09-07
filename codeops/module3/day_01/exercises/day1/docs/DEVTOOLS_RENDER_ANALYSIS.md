# React DevTools Render Analysis: Adding a Dish to Cart

## Exercise 3: Profiling with "Highlight updates when components render"

### 1. Observations using React Context (`CartContext`)

When the user clicks the **"+ Add"** button on any dish item (e.g. *Pizza* with ID `1`):

#### Components that Re-render:
1. **`CartProvider`**:
   - Dispatches `ADD_ITEM` action to `cartReducer`.
   - Produces a new state object containing the updated `items` array.
   - Recalculates memoized `value` object (`state.items`, `orderTotal`, `totalItems`).

2. **`Header`**:
   - Calls `useCart()` to display `totalItems` and `orderTotal` in the navigation bar.
   - Re-renders to reflect the new item count and subtotal in the header cart badge.

3. **`Menu`**:
   - Calls `useCart()` to read `orderTotal` for the bottom order summary box.
   - Re-renders the entire menu container.

4. **All `Dish` Components on the Screen (Dishes #1, #2, #3, #4, #5)**:
   - **Critical Context Bottleneck**: Every `Dish` component calls `useCart()` internally to find its quantity (`cartItem.quantity`).
   - Because React Context triggers re-renders on all hook consumers whenever the context value changes, **all dish cards re-render on every add action**, even dishes whose count did not change!

5. **`DeliveryForm`**:
   - Re-renders due to parent `Menu` re-render and updated `orderTotal` prop.

---

### 2. The Problem with React Context for Frequent Atomic Updates
- **Context is coarse-grained**: Any change to any property in the Context value forces every consumer of that context to re-render.
- **Redundant reconciliation**: 50 dishes in a list would trigger 50 component renders every time a single item is added to cart.

---

### 3. Solution Introduced in Exercises 4 & 5 (Zustand with Narrow Selectors)
By migrating from Context to **Zustand with atomic selectors**:
- `Header` subscribes only to `state.totalItems` / `state.orderTotal`.
- `Dish (ID: 1)` subscribes only to `state.items.find(d => d.id === 1)?.quantity`.
- Dishes #2, #3, #4, #5 do not match the changed selector and **completely skip re-rendering**.
- Only the specific dish card clicked and the summary badges re-render, achieving optimal 60fps performance.
