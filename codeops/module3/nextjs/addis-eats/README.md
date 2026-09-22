# 🍲 Addis Eats — Authentic Ethiopian Food Delivery

A modern, full-featured web application built with **Next.js (App Router)** showcasing authentic Ethiopian cuisine, interactive menu browsing, cart management, and checkout flows.

---

## 🚀 Key Features

- **Root Layout & Branding**: Global navigation, Cart badge with real-time updates, sticky header, and footer shell.
- **Nested Menu Layout**: Persistent category sidebar filter and state-preserving client counters across sub-route navigations.
- **Category Filtering**: Filter dishes by category (`Traditional Stews`, `Vegetarian Delights`, `Sautéed Specialties`, etc.) using synchronized URL search parameters (`/menu?category=...`).
- **Dynamic Dish Detail Pages**: Dynamic routes (`/menu/[id]`) with detailed dish metadata, ingredient lists, prep times, and spice levels.
- **Static Site Generation (SSG)**: Pre-rendered static pages generated at build time using `generateStaticParams`.
- **Incremental Static Regeneration (ISR)**: Cached menu route with `export const revalidate = 60`.
- **Dynamic Request Rendering**: Server-side cookie evaluation (`cookies()` from `next/headers`) on the checkout route (`/checkout`).
- **Instant Streaming UI**: Loading state fallback using React `Suspense` and skeleton loaders.
- **Shopping Cart & Checkout**: Context-based global cart state with Telebirr, CBE Birr, and Cash on Delivery payment methods.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Components**: React 19, Tailwind CSS
- **State Management**: React Context API (`CartContext`)
- **Navigation & Data Fetching**: Next.js Server & Client Components, `next/navigation`, `next/headers`

---

## 📁 Project Structure

```text
app/
├── globals.css                # Global styles and Tailwind directives
├── layout.js                  # Root layout (header, footer, CartProvider)
├── page.js                    # Landing / Home page
├── not-found.js               # Custom 404 page
├── context/
│   └── CartContext.jsx        # Global shopping cart context provider
├── components/
│   └── NavbarCartBadge.jsx    # Real-time cart items badge
├── menu/
│   ├── layout.js              # Nested layout with Category Sidebar & Counter
│   ├── page.js                # Menu list page with ISR (revalidate) & Suspense
│   ├── DishList.jsx           # Filterable dish cards with quick-add
│   ├── CategoryBar.jsx        # Top horizontal category pills
│   ├── CategorySidebar.jsx    # Sidebar navigation with active state
│   ├── MenuCounter.jsx        # Layout state persistence counter
│   ├── error.js               # Menu segment error boundary
│   ├── loading.js             # Menu segment loading skeleton
│   └── [id]/
│       ├── page.js            # Dish detail page (SSG via generateStaticParams)
│       └── AddToCartButton.jsx# Interactive add-to-cart action button
├── cart/
│   └── page.js                # Cart review page with item quantity management
└── checkout/
    ├── page.js                # Server Component reading cookies()
    └── CheckoutForm.jsx       # Client Component order placement form
```

---

## 🧪 Next.js App Router Concepts Applied

### 1. Root Layout Ownership
[app/layout.js](file:///app/layout.js) owns the `<html>` and `<body>` tags and wraps the entire application in the global `<CartProvider>`, sharing consistent styling through `globals.css`.

### 2. Nested Layouts & State Survival
[app/menu/layout.js](file:///app/menu/layout.js) defines a shared sidebar shell for all menu routes. Client component state (such as [MenuCounter.jsx](file:///app/menu/MenuCounter.jsx)) survives page transitions between `/menu` and `/menu/[id]`.

### 3. Incremental Static Regeneration (ISR)
Setting `export const revalidate = 60` in [app/menu/page.js](file:///app/menu/page.js) ensures Next.js pre-renders the page at build time and revalidates it periodically in the background.

### 4. Static Page Generation (`generateStaticParams`)
[app/menu/[id]/page.js](file:///app/menu/%5Bid%5D/page.js) exports `generateStaticParams()` to pre-render individual dish pages at build time (`● SSG`).

### 5. Dynamic Server Rendering (`cookies()`)
Calling `await cookies()` inside [app/checkout/page.js](file:///app/checkout/page.js) opts the checkout route into dynamic server-side rendering (`ƒ Dynamic`) upon each incoming request.

### 6. Streaming with Suspense
Wrapping `<DishList />` inside `<Suspense fallback={<DishListSkeleton />}>` in [app/menu/page.js](file:///app/menu/page.js) enables streaming UI where the category navigation renders immediately while dishes load.

---

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Production Build & Inspection
```bash
npm run build
npm run start
```

Build output route matrix:
```text
Route (app)            Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ƒ /checkout
├ ○ /menu                      1m      1y
└   /menu/[id]
  ├ ● /menu/1
  ├ ● /menu/2
  ├ ● /menu/3
  ├ ● /menu/4
  └ ● /menu/5

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

---

## 📄 License
MIT © Addis Eats
