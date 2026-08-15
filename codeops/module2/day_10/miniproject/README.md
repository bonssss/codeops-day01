# Country Finder

## Description
This is a single-page application that allows you to search for any country and view facts about it. It displays the country's flag, capital, population (formatted with commas), region, and official currencies.

By default, the page loads facts about Ethiopia.

## Setup & How to Run
Since this project relies on an API key that is not committed to version control for security, you must set up a local configuration file before running it:

1. Clone or download this repository.
2. Open the project folder.
3. Rename the `config.example.js` file to `config.js`.
4. Open `config.js` and replace `"YOUR_API_KEY_HERE"` with your actual API key.
5. Open `index.html` in your web browser (or via Live Server). 
6. Type a country name into the search box and press "Search" or hit Enter.

## API Used
This project fetches real-time data from the custom [RestCountries API Proxy](https://restcountries.com/).
Specifically, it uses the `v5` endpoint (`api.restcountries.com/countries/v5`) using Bearer Token authentication. 

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla, Async/Await, Fetch API)
