# Addis Eats, Assembled · Week 1 Project

A modular, robust React application bringing together full-stack client development concepts: components & props, state & events, an API-driven menu with loading and error states, category filtering, a global cart managed via React Context, a pure reducer managing cart state transitions, and a custom `useFetch` hook with `AbortController` cancellation.

---

## 📁 Project Architecture & Clean Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.jsx         # Card wrapper component
│   ├── CartBadge.jsx    # Header cart badge consuming useCart()
│   ├── Category.jsx     # Dropdown category selector
│   ├── CategoryBar.jsx  # Category filter chips
│   ├── Dish.jsx         # Individual dish card with counter & action
│   ├── DishList.jsx     # Dish list rendering loading/error/empty/dishes
│   ├── Header.jsx       # Header integrating CartBadge
│   ├── Menu.jsx         # Main menu orchestrator
│   └── OrderForm.jsx    # Checkout panel & TeleBirr payment form
├── context/             # Global Cart state management
│   ├── CartContext.js   # CartContext & useCart() custom hook
│   ├── CartProvider.jsx # Context provider with useReducer & useMemo
│   └── cartReducer.js   # Pure reducer function (add, remove, clear)
├── hooks/               # Custom reusable React hooks
│   └── useFetch.js      # Fetch hook with AbortController cancellation
├── App.jsx              # Root app component wrapped with CartProvider
├── api.js               # API client
├── data.js              # Mock data
├── index.css            # Complete styling & responsive layout
└── main.jsx             # React DOM entry point
```

---

## 🧠 Hook Contributions Breakdown

| Hook | Where Used | Contribution & Purpose |
| :--- | :--- | :--- |
| **`useState`** | `useFetch`, `Menu`, `OrderForm` | Manages local component states (data/loading/error, active category filter, search query, controlled form inputs). |
| **`useEffect`** | `useFetch`, `Menu` | Synchronizes network requests with the active URL/filter, sets up `AbortController` cleanup, and focuses the search input on mount. |
| **`useReducer`** | `CartProvider` (`cartReducer`) | Owns all cart state transitions (`add`, `remove`, `clear`) via a predictable, pure reducer function. |
| **`useContext`** | `CartBadge`, `Dish`, `OrderForm`, `Menu` (via `useCart`) | Grants components direct access to global cart `items`, `dispatch`, and derived `total` without prop drilling. |
| **`useMemo`** | `CartProvider`, `Menu` | 1. **Context value memoization**: Prevents all cart consumer components from re-rendering unless `items` or `total` change.<br>2. **Search filtering**: Avoids recalculating filtered dish lists on unrelated re-renders. |
| **`useCallback`** | `Dish` | Memoizes the dish addition handler to guarantee stable function references across re-renders. |
| **`useRef`** | `Menu` | Directly references the search `<input>` DOM node to automatically focus it when the application mounts. |
| **`useFetch` (Custom)** | `Menu` | Encapsulates async lifecycle management, error handling, and request cancellation into a reusable hook. |

---

## 📋 Self-Check & Verification

### 1. Can the header badge read the cart without a single cart prop being passed to it?
**Yes.** `<CartBadge />` consumes `useCart()` (which accesses `CartContext`), reading `items.length` directly without any props passed from `<Header />` or `<App />`.

### 2. Does the reducer work correctly when called directly, outside React?
**Yes.** `cartReducer` is a 100% pure function with no React dependencies or side effects. It is validated with a standalone Node.js test suite (`node test-reducer.js`).

### 3. Is the total derived on every render rather than stored in the reducer?
**Yes.** In `CartProvider.jsx`:
```javascript
const total = state.items.reduce((sum, dish) => sum + (dish.price || 0), 0);
```
`total` is derived dynamically from `state.items` on every render, avoiding state duplication and synchronization bugs.

### 4. Does adding a dish update the badge, the checkout panel, and the total together?
**Yes.** Adding a dish dispatches `{ type: 'add', dish }` to the single source of truth in `CartProvider`, which immediately re-renders all context consumers (`CartBadge`, `OrderForm` cart item list, and total display) in sync.

### 5. Is the provider value memoised — and can you explain what that prevents?
**Yes.** `value` is memoized via `useMemo(() => ({ items: state.items, dispatch, total }), [state.items, total])`. This prevents React from creating a new object reference on every parent re-render, avoiding unnecessary re-renders of all context consumers across the tree.

### 6. Does `useFetch` cancel its previous request when the category changes?
**Yes.** `useFetch` instantiates an `AbortController` and passes `controller.signal` to `fetch()`. When the category changes or the component unmounts, the `useEffect` cleanup function triggers `controller.abort()`, safely ignoring `AbortError`s and preventing race conditions.

### 7. Can you justify every `useMemo` and `useCallback` added?
- **`useMemo` in `CartProvider`**: Prevents recreating the context object on every render, which would force all context consumers to re-render.
- **`useMemo` in `Menu`**: Memoizes the filtered dish list by search query so filtering isn't recomputed when unrelated state changes.
- **`useCallback` in `Dish`**: Stabilizes the `handleAdd` callback identity to avoid creating new function references on each render.

---

## 🛠️ Running Locally

### Development Server
```bash
npm run dev
```

### Run Reducer Test Suite
```bash
node test-reducer.js
```

### Build & Lint
```bash
npm run lint
npm run build
```
