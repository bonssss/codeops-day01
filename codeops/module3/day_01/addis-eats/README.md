# Addis Eats · Day 32: The Cart, Moved to a Store

A full-stack React application migrating global state to a persistent Zustand store, using guarded context hooks for Auth and Theme, and strict narrow selectors across all consumers.

---

## 🏗️ Architecture & State Management

### 1. Zustand Cart Store (`src/store/useCartStore.js`)
* **State & Actions:** Holds `items: []` with `addItem(dish)`, `remove(id)`, and `clear()` actions.
* **Persistence:** Uses Zustand's `persist` middleware (`name: 'addis_eats_cart_store'`) so cart state persists across page refreshes.
* **Narrow Selectors in Consumers:**
  * **`CartBadge`**: `useCartStore((s) => s.items.length)`
  * **`Dish` & `DishDetail`**: `useCartStore((s) => s.items.filter(...).length)` & `useCartStore((s) => s.addItem)`
  * **`Cart` & `Checkout`**: `useCartStore((s) => s.items)`, `useCartStore((s) => s.remove)`, `useCartStore((s) => s.clear)`, `useCartStore((s) => s.items.reduce(...))`
  * **`Menu`**: `useCartStore((s) => s.items.length)` & `useCartStore((s) => s.items.reduce(...))`

### 2. Context with Guarded Hooks
* **`AuthProvider` & `useAuth()` (`src/context/AuthProvider.jsx`)**: Manages session state and authentication guards. Throws an explicit error if called outside `AuthProvider`.
* **`ThemeProvider` & `useTheme()` (`src/context/ThemeProvider.jsx`)**: Manages light/dark themes, updates `data-theme` on `<html>`, and persists preference. Throws an explicit error if called outside `ThemeProvider`.

---

## 🗺️ Route Table

| Path | Element / Guard | Description |
| :--- | :--- | :--- |
| **`/`** | `<Layout>` > `<Home />` | Landing page with Ethiopian specialties and quick category links. |
| **`/menu`** | `<Layout>` > `<Menu />` | Full menu with search and shareable query-string category filter (`/menu?category=Traditional`). |
| **`/menu/:id`** | `<Layout>` > `<DishDetail />` | Dynamic dish view with `useParams`. Renders "Dish Not Found" gracefully for invalid IDs. |
| **`/cart`** | `<Layout>` > `<Cart />` | Cart page with item removal, clearing, and total in ETB. |
| **`/checkout`** | `<Layout>` > `<RequireAuth><Checkout /></RequireAuth>` | Protected route guarded by `RequireAuth`. |
| **`/login`** | `<Layout>` > `<Login />` | Authentication screen. |
| **`*`** | `<Layout>` > `<NotFound />` | Catch-all 404 page. |

---

## 🛠️ Running Locally

```bash
# Run Development Server
npm run dev

# Run Linter
npm run lint

# Production Build
npm run build
```
