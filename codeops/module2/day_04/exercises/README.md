# Module 2 Day 4 Exercises: Flexbox & CSS Grid

This directory contains the solutions for the **Module 2 Day 4** CSS layout exercises from the IBT Software Course.

## Overview

The exercises drill five fundamental layout skills in modern CSS:
1. Flexbox alignment and spacing (`justify-content: space-between`, `align-items: center`).
2. Equal-width flex children with responsive reflow (`flex: 1`, `flex-wrap: wrap`, `gap`).
3. Auto-fitting responsive grid photo gallery (`repeat(auto-fit, minmax(200px, 1fr))`).
4. Full page layout using `grid-template-areas` with a `< 700px` media query collapse.
5. Relative and absolute positioning with a circular "ETB Sale" corner badge.

---

## Detailed Exercise Breakdown

### 1. Flexbox Navigation Bar
- **HTML Element**: `<nav class="ex1-navbar">`
- **Flexbox Properties**:
  - `display: flex;`
  - `justify-content: space-between;` (distributes logo to far left and menu items to far right)
  - `align-items: center;` (vertically centers logo, links, and CTA button)
- **Features**:
  - Logo on left with icon and typography.
  - Three navigation links (`Home`, `Courses`, `Community`) + an action button (`Get Started`) aligned together on the right.

### 2. Equal-Width Flex Cards with Auto-Reflow
- **HTML Elements**: `.ex2-card-row` containing 4 `.ex2-card` elements.
- **Flexbox Properties**:
  - `.ex2-card-row { display: flex; flex-wrap: wrap; gap: 1.25rem; }`
  - `.ex2-card { flex: 1; min-width: 200px; }`
- **Behavior**:
  - On wide displays, all 4 cards share equal 25% row space.
  - As the viewport narrows, cards smoothly wrap/reflow to 2x2 or single-column layouts while retaining equal sizing.

### 3. Grid Photo Gallery (`repeat(auto-fit, minmax(200px, 1fr))`)
- **HTML Element**: `<div class="ex3-gallery">` with 6 gallery figure cards.
- **Grid Properties**:
  - `display: grid;`
  - `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`
  - `gap: 1.25rem;`
- **Behavior**:
  - Automatically calculates optimal column count based on available container width without any media queries needed.
  - Supports hover zoom transitions and overlay titles.

### 4. Full Page Layout with `grid-template-areas`
- **HTML Structure**: Includes `header`, `sidebar`, `main`, and `footer`.
- **CSS Grid Areas**:
  ```css
  .ex4-page-grid {
    display: grid;
    grid-template-areas:
      "header  header"
      "sidebar main"
      "footer  footer";
    grid-template-columns: 220px 1fr;
    grid-template-rows: auto 1fr auto;
  }
  ```
- **Responsive Media Query (< 700px)**:
  ```css
  @media (max-width: 700px) {
    .ex4-page-grid {
      grid-template-areas:
        "header"
        "sidebar"
        "main"
        "footer";
      grid-template-columns: 1fr;
    }
  }
  ```
- **Files**:
  - Embedded in `index.html` as an interactive component.
  - Also available as a standalone full-screen demo in `page-layout.html`.

### 5. Product Card with Circular "ETB Sale" Badge
- **HTML Elements**: `.ex5-product-card` with `.etb-sale-badge`.
- **Positioning Properties**:
  - `.ex5-product-card { position: relative; }`
  - `.etb-sale-badge { position: absolute; top: -12px; right: -12px; width: 68px; height: 68px; border-radius: 50%; }`
- **Design Details**:
  - Ethiopian Birr ("ETB SALE") promotion badge pinned firmly to the top-right corner.
  - Circular geometry with smooth scale/rotate pulse micro-animation, vibrant red and amber gradient fills, and shadow effects.

---

## File Structure

```
module2/day_04/exercises/
├── index.html          # Interactive showcase for all 5 exercises
├── styles.css          # Core CSS stylesheet implementing all requirements
├── page-layout.html    # Standalone full-viewport demo for Exercise 4
└── README.md           # Documentation
```

## How to Run & Verify

1. Open `index.html` in any browser or run a local web server:
   ```bash
   # Using VS Code Live Server or Python http.server
   python -m http.server 8000
   ```
2. Resize the browser window:
   - Observe the card row (Ex 2) wrapping cleanly.
   - Observe the photo gallery columns (Ex 3) dynamically reflowing with `auto-fit`.
   - Observe the page layout (Ex 4) collapsing to a single column under `700px`.
