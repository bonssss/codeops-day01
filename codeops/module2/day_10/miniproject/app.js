const countryInput = document.getElementById("country-input");
const searchBtn = document.getElementById("search-btn");
const loadingIndicator = document.getElementById("loading");
const countryContainer = document.getElementById("country-container");

// Fetch Country Data from RestCountries API (via proxy to bypass CORS)
async function fetchCountry(countryName) {
    // Show Loading
    loadingIndicator.classList.remove("hidden");
    countryContainer.innerHTML = ""; // clear previous results

    try {
        const formattedName = countryName.trim();
        
        // Using the proxy API endpoint provided to bypass CORS
        const response = await fetch(`https://api.restcountries.com/countries/v5?q=${formattedName}`, {
            headers: { 'Authorization': `Bearer ${typeof API_KEY !== 'undefined' ? API_KEY : ''}` }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Country not found! Please check your spelling.");
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        }

        const data = await response.json();
                if (!data.data || !data.data.objects || data.data.objects.length === 0) {
            throw new Error("Country not found! Please check your spelling.");
        }
        
        renderCountry(data.data.objects[0]);

    } catch (error) {
        console.error("Fetch error:", error);
        
        if (error.message === "Failed to fetch") {
            countryContainer.innerHTML = `<p class="error">Network Error: Could not reach the server.</p>`;
        } else {
            countryContainer.innerHTML = `<p class="error">${error.message}</p>`;
        }

    } finally {
        loadingIndicator.classList.add("hidden");
    }
}

function renderCountry(country) {
    countryContainer.innerHTML = ""; 

    const flag = document.createElement("img");
    flag.src = (country.flag && (country.flag.url_svg || country.flag.url_png)) || "";
    flag.alt = `Flag of ${country.names.common}`;
    flag.style.width = "200px";
    flag.style.border = "1px solid #ccc";

    const nameEl = document.createElement("h2");
    nameEl.textContent = country.names.common;

    const list = document.createElement("ul");
    list.classList.add("details-list");

    const capitalItem = document.createElement("li");
    const capital = country.capitals && country.capitals.length > 0 ? country.capitals.map(c => c.name).join(", ") : "N/A";
    capitalItem.innerHTML = `<strong>Capital:</strong> ${capital}`;

    // Population (formatted with commas)
    const populationItem = document.createElement("li");
    const populationFormatted = country.population ? country.population.toLocaleString() : "N/A";
    populationItem.innerHTML = `<strong>Population:</strong> ${populationFormatted}`;

    // Region
    const regionItem = document.createElement("li");
    regionItem.innerHTML = `<strong>Region:</strong> ${country.region}`;

    // Currencies
    const currencyItem = document.createElement("li");
    let currencyList = "N/A";
    if (country.currencies && country.currencies.length > 0) {
        currencyList = country.currencies
            .map(c => `${c.name} (${c.symbol})`)
            .join(", ");
    }
    currencyItem.innerHTML = `<strong>Currencies:</strong> ${currencyList}`;

    // Assemble List
    list.appendChild(capitalItem);
    list.appendChild(populationItem);
    list.appendChild(regionItem);
    list.appendChild(currencyItem);

    // Append everything to the container
    if (flag.src) countryContainer.appendChild(flag);
    countryContainer.appendChild(nameEl);
    countryContainer.appendChild(list);
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    const query = countryInput.value.trim();
    if (query !== "") {
        fetchCountry(query);
    }
});

countryInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = countryInput.value.trim();
        if (query !== "") {
            fetchCountry(query);
        }
    }
});

// Default Load (Ethiopia)
fetchCountry("Ethiopia");