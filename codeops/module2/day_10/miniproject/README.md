# Country Finder Miniproject

A simple, vanilla JavaScript single-page application that allows users to search for a country and view facts about it.
# Country Finder

## Description
This is a single-page application that allows you to search for any country and view facts about it. It displays the country's flag, capital, population (formatted with commas), region, and official currencies.

By default, the page loads facts about Ethiopia.

## How to Run
1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in your web browser. No local server or build tools are required.
4. Type a country name into the search box and press "Search" or hit Enter.

## API Used
This project fetches real-time data from the free [RestCountries API](https://restcountries.com/).
Specifically, it uses the `v3.1/name/{country}` endpoint. 

*Note: The API requests are routed through `corsproxy.io` to automatically bypass local development CORS restrictions that the RestCountries API sometimes enforces.*

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla, Async/Await, Fetch API)
