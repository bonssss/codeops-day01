
const state = {
    shows: [],
    favorites: [],
    searchQuery: '',
}

// select elements from the DOM
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const showsContainer = document.getElementById('shows-container');
const favoritesContainer = document.getElementById('favorites-container');
const searchResults = document.getElementById('search-results');
const formEL = document.getElementById('search-form');
const APT_URL = 'https://api.tvmaze.com/search/shows';

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character]);
}

function summaryText(summary) {
    return new DOMParser().parseFromString(summary || '', 'text/html').body.textContent.trim();
}

function render() {
    const term = state.searchQuery.trim().toLowerCase();

    const filteredShows = state.shows.filter(show => {
        return show.name.toLowerCase().includes(term);
    });

    showsContainer.innerHTML = filteredShows.map(createCard).join('');
    favoritesContainer.innerHTML = state.favorites.map(createCard).join('');
}

function createCard(show) {
    const image = show.image?.medium;
    const saved = state.favorites.some(fav => fav.id === show.id);
    const name = escapeHtml(show.name);
    const summary = escapeHtml(summaryText(show.summary) || 'No description available.');
    const poster = image
        ? `<img src="${escapeHtml(image)}" alt="Poster for ${name}" loading="lazy">`
        : '<div class="card-image-placeholder" aria-label="No poster available">No poster</div>';

    return `
        <div class="card">
            ${poster}
            <h3>${name}</h3>
            <p class="card-description">${summary}</p>
            <p class="card-rating">Rating: ${show.rating?.average ?? 'N/A'}</p>
            <div class="card-actions">
                <a class="details-button" href="show.html?id=${encodeURIComponent(show.id)}">View Details</a>
                <button class="favorite-button" data-id="${show.id}" onclick="addOrRemoveFavorite(${show.id})">
                    ${saved ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    `;
}

async function loadShows(query) {
    searchResults.textContent = 'Loading shows...';

    try{
        const response = await fetch(`${APT_URL}?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch shows");
        }
        const shows = await response.json();
        state.shows = shows.map(result => result.show);
        searchResults.textContent='';
        render();
    }
    catch (error) {
        console.error('Error fetching shows:', error);
        searchResults.textContent = 'Error loading shows. Please try again later.';
    }

}

function addOrRemoveFavorite(showId) {
    const exists = state.favorites.some(fav => fav.id === showId);
    if (exists) {
        state.favorites = state.favorites.filter(fav => fav.id !== showId);
    } else {
        const show = state.shows.find(show => show.id === showId);
        if (show) {
            state.favorites.push(show);
        }
    }
    saveFavorites();
    render();
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
}

function loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
        state.favorites = JSON.parse(favorites);
    }
}

formEL.addEventListener('submit', (event) => {
    event.preventDefault();

   const query = state.searchQuery = searchInput.value;
    loadShows(query);
});

function init() {
    loadFavorites();
    loadShows('friends'); // Load initial shows with an empty query
    render();
}

init();