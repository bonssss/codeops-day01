const state = {
    recipes: [],
    favorites: [],
    searchQuery: '',
    cuisine: '',
    sortBy: 'popular',
};

const recipeGrid = document.getElementById('recipe-grid');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const messageEl = document.getElementById('search-results');
const cuisineFilter = document.getElementById('cuisineFilter');
const sortSelect = document.getElementById('sortSelect');
const favoritesButton = document.querySelector('.fav');
const detailsDialog = document.getElementById('recipe-dialog');
const detailsContent = document.getElementById('recipe-dialog-content');
const API_URL = 'https://dummyjson.com/recipes?limit=50';

function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character]);
}

function render() {
    const term = state.searchQuery.toLowerCase().trim();
    let filteredRecipes = state.recipes.filter((recipe) => {
        const searchableText = [
            recipe.name,
            recipe.cuisine,
            ...(recipe.tags || []),
            ...(recipe.mealType || []),
            ...(recipe.ingredients || []),
        ].join(' ').toLowerCase();
        return searchableText.includes(term)
            && (!state.cuisine || recipe.cuisine === state.cuisine);
    });

    filteredRecipes = [...filteredRecipes].sort((first, second) => {
        if (state.sortBy === 'rating') return second.rating - first.rating;
        if (state.sortBy === 'name') return first.name.localeCompare(second.name);
        if (state.sortBy === 'quickest') {
            return first.prepTimeMinutes + first.cookTimeMinutes
                - second.prepTimeMinutes - second.cookTimeMinutes;
        }
        return second.rating * Math.log1p(second.reviewCount)
            - first.rating * Math.log1p(first.reviewCount);
    });

    recipeGrid.innerHTML = filteredRecipes.length
        ? filteredRecipes.map((recipe) => createCard(recipe)).join('')
        : '<div class="empty-state"><span class="empty-state-icon">⌕</span><h3>No recipes found</h3><p>Try a different search or adjust your filters.</p></div>';

    favoritesList.innerHTML = state.favorites.length
        ? state.favorites.map((recipe) => createFavorite(recipe)).join('')
        : '<li class="favorites-empty">Your saved recipes will show up here.</li>';

    document.getElementById('recipe-count').textContent =
        `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recipe' : 'recipes'}`;
}

function createCard(recipe) {
    const favorited = state.favorites.some((favorite) => favorite.id === recipe.id);
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    const tags = (recipe.tags || []).slice(0, 2)
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');

    return `<article class="recipe-card">
        <button class="card-image-button" type="button" data-action="details" data-id="${recipe.id}" aria-label="View ${escapeHtml(recipe.name)} details">
            <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}" loading="lazy">
            <span class="image-time">${totalTime} min</span>
        </button>
        <div class="recipe-details">
            <div class="card-tags">${tags}</div>
            <h3><button class="recipe-title" type="button" data-action="details" data-id="${recipe.id}">${escapeHtml(recipe.name)}</button></h3>
            <p class="card-description">${escapeHtml(recipe.cuisine)} cuisine <span aria-hidden="true">·</span> ${escapeHtml(recipe.difficulty)} <span aria-hidden="true">·</span> ${recipe.servings} servings</p>
            <div class="card-footer">
                <span class="rating" aria-label="Rated ${recipe.rating} out of 5">★ <strong>${recipe.rating}</strong> <span>(${recipe.reviewCount})</span></span>
                <button class="favorite-button${favorited ? ' is-favorite' : ''}" type="button" data-action="favorite" data-id="${recipe.id}" aria-label="${favorited ? 'Remove' : 'Save'} ${escapeHtml(recipe.name)} ${favorited ? 'from' : 'to'} favorites" aria-pressed="${favorited}">
                    ${favorited ? '♥ Saved' : '♡ Save'}
                </button>
            </div>
        </div>
    </article>`;
}

function createFavorite(recipe) {
    return `<li class="favorite-item">
        <img src="${escapeHtml(recipe.image)}" alt="" loading="lazy">
        <div class="favorite-item-copy">
            <button type="button" class="favorite-title" data-action="details" data-id="${recipe.id}">${escapeHtml(recipe.name)}</button>
            <span>★ ${recipe.rating} · ${escapeHtml(recipe.cuisine)}</span>
        </div>
        <button type="button" class="remove-favorite" data-action="favorite" data-id="${recipe.id}" aria-label="Remove ${escapeHtml(recipe.name)} from favorites">×</button>
    </li>`;
}

function showRecipeDetails(recipe) {
    const ingredients = (recipe.ingredients || [])
        .map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`).join('');
    const instructions = (recipe.instructions || [])
        .map((instruction) => `<li>${escapeHtml(instruction)}</li>`).join('');
    const tags = (recipe.tags || [])
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');

    detailsContent.innerHTML = `<div class="detail-hero">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
        <div class="detail-hero-shade"></div>
        <button class="dialog-close" type="button" data-action="close-details" aria-label="Close recipe details">×</button>
        <div class="detail-heading">
            <div class="card-tags">${tags}</div>
            <h2 id="dialog-title">${escapeHtml(recipe.name)}</h2>
            <p>★ ${recipe.rating} <span>(${recipe.reviewCount} reviews)</span> · ${escapeHtml(recipe.cuisine)} cuisine</p>
        </div>
    </div>
    <div class="detail-body">
        <div class="detail-stats">
            <div><span>PREP TIME</span><strong>${recipe.prepTimeMinutes} min</strong></div>
            <div><span>COOK TIME</span><strong>${recipe.cookTimeMinutes} min</strong></div>
            <div><span>SERVINGS</span><strong>${recipe.servings}</strong></div>
            <div><span>CALORIES</span><strong>${recipe.caloriesPerServing} kcal</strong></div>
            <div><span>DIFFICULTY</span><strong>${escapeHtml(recipe.difficulty)}</strong></div>
        </div>
        <div class="detail-columns">
            <section><h3>Ingredients <span>${ingredients ? recipe.ingredients.length : 0}</span></h3><ul class="ingredient-list">${ingredients}</ul></section>
            <section><h3>Instructions</h3><ol class="instruction-list">${instructions}</ol></section>
        </div>
        <button class="detail-save favorite-button${state.favorites.some((item) => item.id === recipe.id) ? ' is-favorite' : ''}" type="button" data-action="favorite" data-id="${recipe.id}">
            ${state.favorites.some((item) => item.id === recipe.id) ? '♥ Saved to favorites' : '♡ Save to favorites'}
        </button>
    </div>`;

    detailsDialog.showModal();
}

function populateCuisines() {
    const cuisines = [...new Set(state.recipes.map((recipe) => recipe.cuisine))]
        .filter(Boolean).sort((first, second) => first.localeCompare(second));
    cuisineFilter.innerHTML = '<option value="">All cuisines</option>'
        + cuisines.map((cuisine) => `<option value="${escapeHtml(cuisine)}">${escapeHtml(cuisine)}</option>`).join('');
}

async function loadRecipes() {
    messageEl.textContent = 'Finding something delicious...';
    recipeGrid.innerHTML = '<div class="loading-state"><span class="loader"></span><p>Loading recipes...</p></div>';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Recipe request failed (${response.status})`);
        const data = await response.json();
        if (!Array.isArray(data.recipes)) throw new Error('The recipe response had an unexpected format.');
        state.recipes = data.recipes;
        populateCuisines();
        messageEl.textContent = '';
        render();
    } catch (error) {
        console.error('Error loading recipes:', error);
        messageEl.textContent = 'We couldn’t load recipes. Check your connection and try again.';
        recipeGrid.innerHTML = '<div class="empty-state"><h3>Recipes are taking a break</h3><p>Please check your internet connection and refresh to try again.</p></div>';
    }
}

function addOrRemove(recipeId) {
    const exists = state.favorites.some((favorite) => favorite.id === recipeId);
    if (exists) {
        state.favorites = state.favorites.filter((favorite) => favorite.id !== recipeId);
    } else {
        const recipe = state.recipes.find((item) => item.id === recipeId);
        if (recipe) state.favorites.push(recipe);
    }
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    render();
    const detailSaveButton = detailsContent.querySelector('[data-action="favorite"]');
    if (detailSaveButton && Number(detailSaveButton.dataset.id) === recipeId) {
        const isFavorite = state.favorites.some((favorite) => favorite.id === recipeId);
        detailSaveButton.classList.toggle('is-favorite', isFavorite);
        detailSaveButton.textContent = isFavorite ? '♥ Saved to favorites' : '♡ Save to favorites';
    }
}

function loadFavorites() {
    try {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        state.favorites = Array.isArray(savedFavorites) ? savedFavorites : [];
    } catch (error) {
        console.error('Error loading saved favorites:', error);
        state.favorites = [];
    }
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    state.searchQuery = searchInput.value;
    render();
});

searchInput.addEventListener('input', () => {
    state.searchQuery = searchInput.value;
    render();
});

cuisineFilter.addEventListener('change', () => {
    state.cuisine = cuisineFilter.value;
    render();
});

sortSelect.addEventListener('change', () => {
    state.sortBy = sortSelect.value;
    render();
});

document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const recipeId = Number(button.dataset.id);
    if (button.dataset.action === 'favorite') addOrRemove(recipeId);
    if (button.dataset.action === 'details') {
        const recipe = state.recipes.find((item) => item.id === recipeId)
            || state.favorites.find((item) => item.id === recipeId);
        if (recipe) showRecipeDetails(recipe);
    }
    if (button.dataset.action === 'close-details') detailsDialog.close();
});

detailsDialog.addEventListener('click', (event) => {
    if (event.target === detailsDialog) detailsDialog.close();
});

favoritesButton.addEventListener('click', () => {
    document.getElementById('favorites-section').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('home-link').addEventListener('click', () => {
    searchInput.value = '';
    cuisineFilter.value = '';
    state.searchQuery = '';
    state.cuisine = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
});

loadFavorites();
render();
await loadRecipes();
