# Addis Eats, Routed · Day 31 Mini-Project

A multi-page React application built with React Router v7, featuring global context state persistence, dynamic route parameters, query-string driven category filters, protected checkout routes, and responsive UI.

---

## 🗺️ Route Table & Documentation

| Path | Element / Guard | Description |
| :--- | :--- | :--- |
| **`/`** | `<Layout>` > `<Home />` | Landing page with hero banner, Ethiopian culinary specialties, and quick category links. |
| **`/menu`** | `<Layout>` > `<Menu />` | Full menu with search bar and shareable query-string category filter (e.g. `/menu?category=Traditional` or `/menu?category=Vegan`). |
| **`/menu/:id`** | `<Layout>` > `<DishDetail />` | Dynamic route reading the dish ID with `useParams`. Gracefully handles non-existent IDs like `/menu/not-a-dish`. |
| **`/cart`** | `<Layout>` > `<Cart />` | Cart page displaying selected dishes, item removal, cart clearing, and total in ETB. |
| **`/checkout`** | `<Layout>` > `<RequireAuth><Checkout /></RequireAuth>` | Protected checkout route guarded by `RequireAuth`. Redirects unauthenticated users to `/login` and restores location after sign-in. |
| **`/login`** | `<Layout>` > `<Login />` | Authentication screen. On submission, logs in and redirects back to the original destination. |
| **`*`** | `<Layout>` > `<NotFound />` | Catch-all 404 page for unmatched routes. |

---

## 📁 Key Files Submitted

- **[`src/App.jsx`](file:///c:/Users/bons/Documents/IBT/IBT_SW_Course/codeops/module3/day_01/addis-eats/src/App.jsx)**: Top-level route tree nesting all routes within `CartProvider`, `AuthProvider`, `BrowserRouter`, and `<Layout>`.
- **[`src/components/Layout.jsx`](file:///c:/Users/bons/Documents/IBT/IBT_SW_Course/codeops/module3/day_01/addis-eats/src/components/Layout.jsx)** (and [`src/Layout.jsx`](file:///c:/Users/bons/Documents/IBT/IBT_SW_Course/codeops/module3/day_01/addis-eats/src/Layout.jsx)): Persistent navigation bar with `NavLink` active highlighting, `CartBadge`, user auth status, and `<Outlet />`.
- **[`src/components/DishDetail.jsx`](file:///c:/Users/bons/Documents/IBT/IBT_SW_Course/codeops/module3/day_01/addis-eats/src/components/DishDetail.jsx)** (and [`src/DishDetail.jsx`](file:///c:/Users/bons/Documents/IBT/IBT_SW_Course/codeops/module3/day_01/addis-eats/src/DishDetail.jsx)): Dynamic dish profile page reading `:id` parameter via `useParams`.
- **[`src/components/RequireAuth.jsx`](file:///c:/Users/bons/Documents/IBT/IBT_SW_Course/codeops/module3/day_01/addis-eats/src/components/RequireAuth.jsx)** (and [`src/RequireAuth.jsx`](file:///c:/Users/bons/Documents/IBT/IBT_SW_Course/codeops/module3/day_01/addis-eats/src/RequireAuth.jsx)): Route guard that waits for auth hydration and remembers previous destination with `location.state.from`.

---

## 📋 Self-Check & Verification

### 1. Does adding a dish to the cart, then visiting `/cart`, still show the order?
**Yes.** `<CartProvider>` is mounted above `<BrowserRouter>`, meaning cart state lives above the router and survives all route navigations.

### 2. Does the header keep its state when you navigate between screens?
**Yes.** `<Layout>` acts as the parent route frame. The header and `<CartBadge />` stay mounted across navigations without re-initializing or losing count.

### 3. Does `/menu?category=Vegan` show the filtered menu when opened in a new tab?
**Yes.** `Menu.jsx` uses `useSearchParams` to read `searchParams.get('category')`, dynamically driving `useFetch('/dishes.json?category=...')`. If no dishes match (such as Vegan), it displays the empty state gracefully.

### 4. Does `/menu/not-a-dish` say the dish was not found rather than crashing?
**Yes.** `DishDetail.jsx` looks up the ID in fetched dishes; if no match is found, it renders a friendly "Dish Not Found" card with a link back to `/menu`.

### 5. Does opening `/checkout` while signed out send you to login, then back afterwards?
**Yes.** `RequireAuth.jsx` stores `location` in `<Navigate to="/login" state={{ from: location }} replace />`. Upon login, `Login.jsx` retrieves `location.state?.from?.pathname` and navigates back to `/checkout`.

### 6. Does refreshing while signed in leave you on the page rather than at the login screen?
**Yes.** `AuthProvider` persists the signed-in user in `localStorage` and restores it on mount, while keeping `loading: true` until verification completes.

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
