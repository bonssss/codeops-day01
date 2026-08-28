# Addis Eats - Typed & Filtered React Menu

A modular, typed React menu application built with Vite demonstrating professional React patterns:
- **`Dish` Component**: Typed with PropTypes (`name` & `price` required, `spicy` optional), currency default of `"ETB"`, and a guarded boolean spicy badge.
- **`Card` Component**: Reusable wrapper component leveraging the `children` prop.
- **`Menu` Component**: Filters dishes by category, renders an empty state when no matches exist, and maps items using stable `id` keys.
- **`Category` Component**: Category selector supporting category switching and "All" dishes.
- **`src/data.js`**: Centralized data module containing the menu items (`id`, `name`, `price`, `category`, `spicy`).

## Getting Started

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
