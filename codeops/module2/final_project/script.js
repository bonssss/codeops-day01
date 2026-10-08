
const state={
    recipes: [],
    favorites: [],
    searchQuery: '',
}


const showRecipes= document.getElementById('recipe-grid');
const showFavorites= document.getElementById('favorites-list');
const searchInput= document.getElementById('searchInput');
const searchForm= document.getElementById('searchForm');
const messageEl= document.getElementById('search-results');
const formEl= searchForm;


const API_URL= 'https://dummyjson.com/recipes';

function render() {
    const term = state.searchQuery.toLowerCase().trim();

    const filteredRecipes = state.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(term)
    );

    if (filteredRecipes.length === 0) {
        showRecipes.innerHTML = `
            <div class="no-recipes">
                <h3>No recipes found</h3>
                <p>Try searching for another recipe.</p>
            </div>
        `;
    } else {
        showRecipes.innerHTML = filteredRecipes
            .map((recipe) => createCard(recipe))
            .join('');
    }

    showFavorites.innerHTML = state.favorites
        .map((recipe) => createCard(recipe))
        .join('');
}

function createCard(recipe) {
    const image= recipe.image;
    const favorited= state.favorites.some((favorite) => favorite.id === recipe.id);

    return `  <article class="recipe-card">
            <div class="recipe-image">
                <img 
                    src="${recipe.image}" 
                    alt="${recipe.name}"
                >
            </div>
        <div class="recipe-details">
            <h3>${recipe.name}</h3>
            <p>cuisine: ${recipe.cuisine}</p>
            <p>Rating: ${recipe.rating}</p>
            <button class="favorite-button" type="button" data-id="${recipe.id}" onclick="addOrRemove(${recipe.id})">
                ${favorited ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    </article>`;
}

async function loadRecipes(query='') {
    messageEl.textContent= 'Loading recipes...';
    try{
        // const response= await fetch(`${API_URL}/search?q=${query}`);
         const url = query
            ? `${API_URL}/search?q=${encodeURIComponent(query)}`
            : API_URL;
        const response= await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data= await response.json();
        messageEl.textContent='';
        state.recipes= data.recipes;
        state.searchQuery= query;
        render();
    } catch (error) {
        console.error('Error loading recipes:', error);
        messageEl.textContent= 'Error loading recipes.';
    }


}

function addOrRemove(recipeId) {
    const exists= state.favorites.some((favorite) => favorite.id === recipeId);
    if (exists) {
        state.favorites= state.favorites.filter((favorite) => favorite.id !== recipeId);
    } else {
        const recipe= state.recipes.find((recipe) => recipe.id === recipeId);
        if (recipe) {
            state.favorites.push(recipe);
        }
    }
    saveFavorites();
    render();
}
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
}

function loadFavorites() {
    const savedFavorites= localStorage.getItem('favorites');
    if (savedFavorites) {
        state.favorites= JSON.parse(savedFavorites);
    }
}

formEl.addEventListener("submit", function
    (event) {
        event.preventDefault();
         const query = searchInput.value.trim();

    loadRecipes(query);
    }
)


const favoritesButton = document.querySelector('.fav');

favoritesButton.addEventListener('click', function () {
    showFavorites.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

const homeLink = document.getElementById('home-link');
    homeLink.addEventListener('click', function () {
    searchInput.value = '';

   state.searchQuery = '';

    loadRecipes();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



function init() {
    loadFavorites();
    loadRecipes();
    render();
}
init();