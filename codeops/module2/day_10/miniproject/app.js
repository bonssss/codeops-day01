const countryInput = document.querySelector("#country-input");// DOM Elements
const searchBtn = document.getElementById("search-btn");
const pokemonInput = document.getElementById("pokemon-input");
const loadingIndicator = document.getElementById("loading");
const pokemonContainer = document.getElementById("pokemon-container");

// Fetch Pokemon Data from PokeAPI
async function fetchPokemon(pokemonName) {
    // Show Loading
    loadingIndicator.classList.remove("hidden");
    pokemonContainer.innerHTML = ""; // clear previous results

    try {
        // PokeAPI requires lower case names
        const formattedName = pokemonName.toLowerCase().trim();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedName}`);

        // Handle network/HTTP errors
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Pokémon not found! Please check your spelling.");
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        }

        const data = await response.json();
        renderPokemon(data);

    } catch (error) {
        // Display Error
        console.error("Fetch error:", error);
        
        // Handle generic network error (e.g. offline)
        if (error.message === "Failed to fetch") {
            pokemonContainer.innerHTML = `<p class="error">Network Error: Could not reach the server.</p>`;
        } else {
            pokemonContainer.innerHTML = `<p class="error">${error.message}</p>`;
        }

    } finally {
        // Remove Loading Indicator
        loadingIndicator.classList.add("hidden");
    }
}

// Render Pokemon into the DOM
function renderPokemon(pokemon) {
    pokemonContainer.innerHTML = ""; // Clear just in case

    // 1. Create Sprite Image
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default || pokemon.sprites.other["official-artwork"].front_default;
    sprite.alt = `Sprite of ${pokemon.name}`;
    sprite.style.width = "150px";

    // 2. Create Name Title
    const nameEl = document.createElement("h2");
    // Capitalize first letter
    nameEl.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    // 3. Create Details List
    const list = document.createElement("ul");
    list.classList.add("details-list");

    // Height (in decimeters, convert to meters)
    const heightItem = document.createElement("li");
    heightItem.innerHTML = `<strong>Height:</strong> ${(pokemon.height / 10).toFixed(1)} m`;

    // Weight (in hectograms, convert to kg)
    const weightItem = document.createElement("li");
    weightItem.innerHTML = `<strong>Weight:</strong> ${(pokemon.weight / 10).toFixed(1)} kg`;

    // Types
    const typesItem = document.createElement("li");
    const typeNames = pokemon.types.map(t => t.type.name).join(", ");
    typesItem.innerHTML = `<strong>Types:</strong> ${typeNames}`;

    // Base Experience
    const expItem = document.createElement("li");
    expItem.innerHTML = `<strong>Base XP:</strong> ${pokemon.base_experience}`;

    // Assemble List
    list.appendChild(heightItem);
    list.appendChild(weightItem);
    list.appendChild(typesItem);
    list.appendChild(expItem);

    // Append everything to the container
    pokemonContainer.appendChild(sprite);
    pokemonContainer.appendChild(nameEl);
    pokemonContainer.appendChild(list);
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    const query = pokemonInput.value.trim();
    if (query !== "") {
        fetchPokemon(query);
    }
});

pokemonInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = pokemonInput.value.trim();
        if (query !== "") {
            fetchPokemon(query);
        }
    }
});

// Default Load (e.g. Pikachu)
fetchPokemon("pikachu");