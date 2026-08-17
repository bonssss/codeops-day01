# Birr Watch Mini-Project

**Birr Watch** is a single-page web application that loads live Ethiopian Birr (ETB) exchange rates from a public API, allows you to convert ETB amounts into other global currencies, and lets you save your favorite currency conversions to a persisted watchlist.

## Features
- **Live Rates**: Automatically loads real-time ETB exchange rates on startup.
- **Conversion Engine**: Converts any valid ETB amount into over 150 supported currencies.
- **Watchlist**: Save specific currencies to a "Live Watchlist" that automatically updates when you change the base amount.
- **State Persistence**: Your watchlist and last selected currency are saved to your browser's local storage and restored automatically when you return or reload the page.
- **State-Driven UI**: Built using a strict, modern `state -> render -> events` architecture loop.

## API Usage
This application fetches live exchange rate data from the free and open Exchange Rates API:
`https://open.er-api.com/v6/latest/ETB`

## How to Run
This app is built with pure HTML, CSS, and JavaScript with no build steps or dependencies. 

**One step to open it:**
Simply open the `index.html` file in any modern web browser. (Double click `index.html` or drag it into a browser tab).
