# Module 2 Day 4 Mini-Project — Rebuilding Ethiopian Airlines Flight Booking Interface

## Interface Chosen
**Ethiopian Airlines Online Booking & Flight Results Dashboard** (`index.html`)

This project reconstructs the real-world web interface of Ethiopian Airlines' flight search results and promotional booking portal using modern CSS layout techniques: **CSS Grid for the skeleton** and **Flexbox for the inner components**.

---

## Layout Breakdown

### 1. CSS Grid Usage

| Component / Area | CSS Grid Feature | Purpose |
| :--- | :--- | :--- |
| **Page Skeleton (`.app`)** | `grid-template-areas: "header header" "sidebar main" "footer footer"` | Defines the high-level responsive page frame with 2 columns (`300px 1fr`) and 3 rows (`auto 1fr auto`). |
| **Trending Deals Cards (`.cards-auto-fit-grid`)** | `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))` | Automatically reflows promotional destination cards across varying screen sizes without extra media queries. |
| **Departure Time Chips (`.time-chips-flex`)** | `grid-template-columns: repeat(3, 1fr)` | Distributes morning, afternoon, and night filter buttons equally in the sidebar. |
| **Footer Columns (`.footer-top-grid`)** | `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` | Responsively organizes multi-column sitemap and brand links. |

---

### 2. Flexbox Usage

| Component | Flexbox Properties | Purpose |
| :--- | :--- | :--- |
| **Top Navigation Bar (`.navbar-flex`)** | `display: flex; justify-content: space-between; align-items: center;` | Spaces brand logo to the left, primary navigation links in center, and currency/ShebaMiles CTA to the right. |
| **Filter Sidebar Header (`.sidebar-header-flex`)** | `display: flex; justify-content: space-between; align-items: center;` | Aligns "Filter Flights" title with the "Reset All" action. |
| **Airport Node Strip (`.route-airports-flex`)** | `display: flex; justify-content: space-between; align-items: center;` | Displays Origin (`ADD`) and Destination (`DXB`) codes separated by flight arrow. |
| **Search Banner & Sort Toolbar (`.search-banner-flex`)** | `display: flex; justify-content: space-between; align-items: center;` | Horizontally positions flight search title against the sort dropdown menu. |
| **Flight Card Internal Layout (`.flight-card-body-flex`)** | `display: flex; justify-content: space-between; align-items: center;` | Organizes carrier info, route timeline diagram, and price CTA cleanly across the card. |
| **Flight Timeline Diagram (`.schedule-timeline-flex`)** | `display: flex; align-items: center; gap: 1.5rem;` | Centers departure time, flight duration line with aircraft icon, and arrival time. |
| **Price & CTA Block (`.price-action-flex`)** | `display: flex; align-items: center; gap: 1.5rem;` | Pairs the ETB pricing column directly next to the "Select Flight" button. |
| **Destination Card Footer (`.deal-foot-flex`)** | `display: flex; justify-content: space-between; align-items: center;` | Distributes starting fare and "Book Now" link across the card bottom. |
| **Footer Bottom Bar (`.footer-bottom-flex`)** | `display: flex; justify-content: space-between; align-items: center;` | Distributes copyright text and policy links across opposite ends. |

---

## Key Requirements Verification

- [x] **Grid Page Skeleton**: Built with `grid-template-areas` (`header`, `sidebar`, `main`, `footer`).
- [x] **Single Media Query (< 700px)**: Collapses `.app` into a single column (`grid-template-areas: "header" "sidebar" "main" "footer"` and `grid-template-columns: 1fr`).
- [x] **Sticky Element**: `.app-header` features `position: sticky; top: 0; z-index: 100;`, remaining visible as the flight results list scrolls.
- [x] **Auto-fit Card Grid**: `.cards-auto-fit-grid` uses `repeat(auto-fit, minmax(240px, 1fr))` to dynamically adapt columns upon resizing.
- [x] **Relative + Absolute Positioning**: `.flight-card` is styled with `position: relative`, and `.et-badge` is anchored to its top-right corner with `position: absolute; top: -10px; right: 24px;`.

---

## File Structure

```
module2/day_04/miniproject/
├── index.html      # Ethiopian Airlines Flight Booking markup
├── styles.css      # CSS Grid & Flexbox stylesheet
└── README.md       # Project architecture and component breakdown
```
