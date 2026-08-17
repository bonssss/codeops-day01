# Day 12 Exercises: Birr Watch

This folder contains the completed implementation for the Module 2, Day 12 Exercises. 

The application was built incrementally by following and completing all 6 assigned exercise milestones:

1. **Scaffold**: Created `index.html` with empty containers for the status, conversion form, result, currency select dropdown, and watchlist `<ul>`. The state object was declared in `app.js`.
2. **Mocking State**: Implemented the core `render()` function against fake, hard-coded rates (e.g., `{ USD: 0.0177, KES: 2.29 }`) to confirm the dropdown fills correctly before touching the network.
3. **Live API Integration**: Replaced the fake data by implementing `loadRates()`. Fetched the live endpoint (`https://open.er-api.com/v6/latest/ETB`), verified `res.ok`, stored `data.rates` into state, and added proper loading/error UI messages.
4. **Wiring the Form**: Added `preventDefault`, read and validated the amount input using `Number()`, looked up the current rate from the state, and rendered a formatted conversion result line.
5. **Watchlist Features**: Added an 'Add' button (with guards against duplicate entries), implemented `renderWatchlist()` completely driven by state, and attached a delegated click listener to remove rows using their `data-c` attribute.
6. **Local Storage Persistence**: Implemented `save()` and `load()` functions utilizing `localStorage`, calling them from `init()` to ensure the selected currency and watchlist survive full page reloads.

## How to Run
This is a pure Vanilla JS/HTML/CSS application. Simply open `index.html` in any modern web browser to see it in action. No build steps are required.
