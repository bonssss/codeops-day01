/**
 * Showly - TV Shows Discovery & Watchlist Application
 */

const API_SEARCH_URL = 'https://api.tvmaze.com/search/shows';
const API_SHOW_URL = 'https://api.tvmaze.com/shows';
const FAVORITES_KEY = 'showly_watchlist';

// Global Application State
const state = {
    currentView: 'home-view',
    previousView: 'home-view',
    popularShows: [],
    browseShows: [],
    favorites: [],
    currentShow: null,
    searchQuery: '',
    selectedGenre: 'all',
    selectedSort: 'relevance',
    isLoading: false,
};

// DOM Elements cache
const DOM = {
    // Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    navSearchTrigger: document.getElementById('nav-search-trigger'),
    userAvatarBtn: document.getElementById('user-avatar-btn'),
    
    // Views
    views: {
        'home-view': document.getElementById('home-view'),
        'browse-view': document.getElementById('browse-view'),
        'show-details-view': document.getElementById('show-details-view'),
        'watchlist-view': document.getElementById('watchlist-view'),
    },
    
    // Home View Elements
    heroSearchForm: document.getElementById('hero-search-form'),
    heroSearchInput: document.getElementById('hero-search-input'),
    popularShowsGrid: document.getElementById('popular-shows-grid'),
    homeViewAllBtn: document.getElementById('home-view-all-btn'),
    
    // Browse View Elements
    browseSearchForm: document.getElementById('browse-search-form'),
    browseSearchInput: document.getElementById('browse-search-input'),
    browseClearSearch: document.getElementById('browse-clear-search'),
    browseResultsCount: document.getElementById('browse-results-count'),
    browseGenreFilter: document.getElementById('browse-genre-filter'),
    browseSortOrder: document.getElementById('browse-sort-order'),
    browseShowsContainer: document.getElementById('browse-shows-container'),
    
    // Details View Elements
    detailsBackBtn: document.getElementById('details-back-btn'),
    showDetailsContent: document.getElementById('show-details-content'),
    
    // Watchlist Elements
    watchlistContainer: document.getElementById('watchlist-container'),
    watchlistAddShowBtn: document.getElementById('watchlist-add-show-btn'),
    watchlistSidebarItems: document.querySelectorAll('.sidebar-nav-item[data-view]'),
    watchlistProfileLink: document.getElementById('watchlist-profile-link'),
    watchlistSettingsLink: document.getElementById('watchlist-settings-link'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message'),
};

/* ==========================================================================
   UTILITY FUNCTIONS
   ========================================================================== */

function stripHtml(html) {
    if (!html) return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

function getStatusClass(status) {
    if (!status) return 'status-ended';
    const s = status.toLowerCase();
    if (s.includes('run') || s.includes('ongoing')) return 'status-ongoing';
    if (s.includes('return')) return 'status-returning';
    if (s.includes('dev')) return 'status-development';
    return 'status-ended';
}

function showToast(message) {
    DOM.toastMessage.textContent = message;
    DOM.toast.classList.add('show');
    clearTimeout(DOM.toast._timer);
    DOM.toast._timer = setTimeout(() => {
        DOM.toast.classList.remove('show');
    }, 2800);
}

function getVotesEstimation(showId, rating) {
    if (!rating) return '';
    const seed = (showId * 73 + 1234) % 8900 + 1100;
    return `(${seed.toLocaleString()} votes)`;
}

function getYearsRange(show) {
    const start = show.premiered ? show.premiered.slice(0, 4) : '';
    if (!start) return 'TBA';
    if (show.status === 'Running' || show.status === 'Returning Series') {
        return `${start} – present`;
    }
    const end = show.ended ? show.ended.slice(0, 4) : '';
    return end && end !== start ? `${start} – ${end}` : start;
}

/* ==========================================================================
   LOCAL STORAGE & WATCHLIST MANAGEMENT
   ========================================================================== */

function loadWatchlist() {
    try {
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            state.favorites = Array.isArray(parsed) ? parsed : [];
        }
    } catch (err) {
        console.error('Error loading watchlist from storage:', err);
        state.favorites = [];
    }
}

function saveWatchlist() {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    } catch (err) {
        console.error('Error saving watchlist:', err);
    }
}

function isInWatchlist(showId) {
    return state.favorites.some(show => show.id === Number(showId));
}

function toggleWatchlist(show) {
    if (!show || !show.id) return;
    const index = state.favorites.findIndex(item => item.id === show.id);
    if (index >= 0) {
        state.favorites.splice(index, 1);
        showToast(`Removed "${show.name}" from Watchlist`);
    } else {
        state.favorites.unshift(show);
        showToast(`Added "${show.name}" to Watchlist`);
    }
    saveWatchlist();
    
    // Update Details page CTA button if on details
    if (state.currentView === 'show-details-view' && state.currentShow?.id === show.id) {
        updateDetailsWatchlistButton();
    }
    
    // Refresh Watchlist view if currently displayed
    if (state.currentView === 'watchlist-view') {
        renderWatchlistView();
    }
}

function removeShowFromWatchlist(showId) {
    const target = state.favorites.find(s => s.id === Number(showId));
    const title = target ? target.name : 'Show';
    state.favorites = state.favorites.filter(s => s.id !== Number(showId));
    saveWatchlist();
    showToast(`Removed "${title}" from Watchlist`);
    renderWatchlistView();
}

/* ==========================================================================
   ROUTING & VIEW MANAGEMENT
   ========================================================================== */

function navigateTo(viewId, updateHistory = true) {
    if (!DOM.views[viewId]) return;
    
    if (state.currentView !== viewId) {
        state.previousView = state.currentView;
        state.currentView = viewId;
    }
    
    // Update active class on sections
    Object.entries(DOM.views).forEach(([id, element]) => {
        if (id === viewId) {
            element.classList.add('active-view');
        } else {
            element.classList.remove('active-view');
        }
    });
    
    // Update Top Navigation active state
    DOM.navLinks.forEach(link => {
        if (link.dataset.view === viewId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update Watchlist Sidebar items
    DOM.watchlistSidebarItems.forEach(item => {
        if (item.dataset.view === viewId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Scroll top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Trigger view-specific renders if necessary
    if (viewId === 'watchlist-view') {
        renderWatchlistView();
    } else if (viewId === 'browse-view' && state.browseShows.length === 0 && !state.searchQuery) {
        loadBrowseShows('girls');
    }

    if (updateHistory) {
        let hash = viewId.replace('-view', '');
        if (viewId === 'show-details-view' && state.currentShow) {
            hash = `show?id=${state.currentShow.id}`;
        }
        window.location.hash = hash;
    }
}

function handleHashChange() {
    const rawHash = window.location.hash.slice(1) || 'home';
    
    if (rawHash.startsWith('show?id=')) {
        const id = rawHash.split('id=')[1];
        if (id) {
            loadAndDisplayShowDetails(id, false);
            return;
        }
    }
    
    if (rawHash === 'home') {
        navigateTo('home-view', false);
    } else if (rawHash.startsWith('browse')) {
        const params = new URLSearchParams(rawHash.split('?')[1] || '');
        const query = params.get('q');
        if (query && query !== state.searchQuery) {
            DOM.browseSearchInput.value = query;
            loadBrowseShows(query);
        }
        navigateTo('browse-view', false);
    } else if (rawHash === 'watchlist') {
        navigateTo('watchlist-view', false);
    } else {
        navigateTo('home-view', false);
    }
}

/* ==========================================================================
   API FETCHING
   ========================================================================== */

async function fetchSearch(query) {
    const res = await fetch(`${API_SEARCH_URL}?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`TVMaze API Error ${res.status}`);
    const data = await res.json();
    return data.map(item => item.show);
}

async function fetchShow(id) {
    const res = await fetch(`${API_SHOW_URL}/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error(`TVMaze API Error ${res.status}`);
    return await res.json();
}

/* ==========================================================================
   HOME VIEW LOGIC
   ========================================================================== */

async function loadPopularShows() {
    DOM.popularShowsGrid.innerHTML = `
        <div class="loading-spinner-wrap" style="grid-column: 1 / -1;">
            <div class="spinner"></div>
            <p>Loading popular shows...</p>
        </div>
    `;

    try {
        // Fetch top engaging query to populate popular row
        const shows = await fetchSearch('the');
        // Filter those with valid images and sort by weight/rating
        state.popularShows = shows
            .filter(s => s.image && s.image.medium)
            .sort((a, b) => (b.weight || 0) - (a.weight || 0))
            .slice(0, 5);

        renderPopularShows();
    } catch (err) {
        console.error('Error loading popular shows:', err);
        DOM.popularShowsGrid.innerHTML = `
            <div class="empty-state-box" style="grid-column: 1 / -1;">
                <p>Could not load popular shows. Please check your internet connection.</p>
            </div>
        `;
    }
}

function renderPopularShows() {
    DOM.popularShowsGrid.innerHTML = '';
    
    if (!state.popularShows.length) {
        DOM.popularShowsGrid.innerHTML = '<p class="empty-state-box">No popular shows found.</p>';
        return;
    }

    state.popularShows.forEach(show => {
        const card = document.createElement('article');
        card.className = 'show-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        const posterUrl = show.image?.medium || show.image?.original || '';
        const rating = show.rating?.average ? show.rating.average.toFixed(1) : '7.5';
        const genres = show.genres?.length ? show.genres.slice(0, 2).join(' • ') : 'Drama';
        const statusText = show.status === 'Running' ? 'Ongoing' : (show.status || 'Ongoing');
        const statusClass = getStatusClass(statusText);

        card.innerHTML = `
            <div class="card-poster-wrap">
                ${posterUrl 
                    ? `<img src="${posterUrl}" alt="${show.name} poster" class="card-poster-img" loading="lazy">` 
                    : `<div class="card-poster-placeholder">${show.name}</div>`
                }
            </div>
            <div class="card-body">
                <h3 class="card-title" title="${show.name}">${show.name}</h3>
                <div class="card-rating-row">
                    <span class="star-icon">★</span>
                    <span>${rating}</span>
                </div>
                <p class="card-genres-text">${genres}</p>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            loadAndDisplayShowDetails(show.id);
        });
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') loadAndDisplayShowDetails(show.id);
        });

        DOM.popularShowsGrid.appendChild(card);
    });
}

/* ==========================================================================
   BROWSE & SEARCH VIEW LOGIC
   ========================================================================== */

async function loadBrowseShows(query) {
    state.searchQuery = query.trim();
    DOM.browseSearchInput.value = state.searchQuery;
    DOM.browseClearSearch.style.display = state.searchQuery ? 'flex' : 'none';

    DOM.browseShowsContainer.innerHTML = `
        <div class="loading-spinner-wrap" style="grid-column: 1 / -1;">
            <div class="spinner"></div>
            <p>Searching for "${state.searchQuery}"...</p>
        </div>
    `;

    try {
        const shows = await fetchSearch(state.searchQuery || 'girls');
        state.browseShows = shows;
        updateGenreFilterDropdown();
        renderBrowseShows();
    } catch (err) {
        console.error('Error searching shows:', err);
        DOM.browseShowsContainer.innerHTML = `
            <div class="empty-state-box" style="grid-column: 1 / -1;">
                <p>Could not find shows for "${state.searchQuery}". Try a different keyword.</p>
            </div>
        `;
    }
}

function updateGenreFilterDropdown() {
    const genres = new Set();
    state.browseShows.forEach(show => {
        if (show.genres && Array.isArray(show.genres)) {
            show.genres.forEach(g => genres.add(g));
        }
    });

    const currentSelected = state.selectedGenre;
    DOM.browseGenreFilter.innerHTML = '<option value="all">All Genres</option>';
    
    Array.from(genres).sort().forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        if (genre === currentSelected) option.selected = true;
        DOM.browseGenreFilter.appendChild(option);
    });
}

function getFilteredAndSortedBrowseShows() {
    let list = [...state.browseShows];

    // Filter by genre
    if (state.selectedGenre !== 'all') {
        list = list.filter(show => show.genres?.includes(state.selectedGenre));
    }

    // Sort
    if (state.selectedSort === 'rating') {
        list.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
    } else if (state.selectedSort === 'title') {
        list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.selectedSort === 'newest') {
        list.sort((a, b) => {
            const yearA = parseInt(a.premiered?.slice(0, 4) || '0', 10);
            const yearB = parseInt(b.premiered?.slice(0, 4) || '0', 10);
            return yearB - yearA;
        });
    }

    return list;
}

function renderBrowseShows() {
    const list = getFilteredAndSortedBrowseShows();
    
    // Update count indicator matching top-right screen
    if (state.searchQuery) {
        DOM.browseResultsCount.innerHTML = `<strong>${list.length} results</strong> <span>for "${state.searchQuery}"</span>`;
    } else {
        DOM.browseResultsCount.innerHTML = `<strong>${list.length} shows</strong> <span>available</span>`;
    }

    DOM.browseShowsContainer.innerHTML = '';

    if (list.length === 0) {
        DOM.browseShowsContainer.innerHTML = `
            <div class="empty-state-box" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🔍</div>
                <h3 class="empty-state-title">No shows found</h3>
                <p class="empty-state-text">Try tweaking your search term or selecting a different genre filter.</p>
            </div>
        `;
        return;
    }

    list.forEach(show => {
        const card = document.createElement('div');
        card.className = 'browse-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        const posterUrl = show.image?.medium || show.image?.original || '';
        const rating = show.rating?.average ? show.rating.average.toFixed(1) : (show.rating?.average === null ? '7.2' : '7.0');
        const genres = show.genres?.length ? show.genres.slice(0, 2).join(' • ') : 'Drama';
        const statusText = show.status === 'Running' ? 'Ongoing' : (show.status || 'Ended');
        const statusClass = getStatusClass(statusText);

        card.innerHTML = `
            ${posterUrl 
                ? `<img src="${posterUrl}" alt="${show.name}" class="browse-card-poster" loading="lazy">` 
                : `<div class="browse-card-poster card-poster-placeholder">${show.name.slice(0, 2)}</div>`
            }
            <div class="browse-card-content">
                <h3 class="browse-card-title" title="${show.name}">${show.name}</h3>
                <div class="card-rating-row">
                    <span class="star-icon">★</span>
                    <span>${rating}</span>
                </div>
                <p class="card-genres-text">${genres}</p>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            loadAndDisplayShowDetails(show.id);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') loadAndDisplayShowDetails(show.id);
        });

        DOM.browseShowsContainer.appendChild(card);
    });
}

/* ==========================================================================
   SHOW DETAILS VIEW LOGIC
   ========================================================================== */

async function loadAndDisplayShowDetails(showId, updateHistory = true) {
    navigateTo('show-details-view', updateHistory);
    
    DOM.showDetailsContent.innerHTML = `
        <div class="loading-spinner-wrap">
            <div class="spinner"></div>
            <p>Loading show details...</p>
        </div>
    `;

    try {
        let show = null;
        // Check if already in memory
        if (state.currentShow?.id === Number(showId)) {
            show = state.currentShow;
        } else {
            show = await fetchShow(showId);
        }
        
        state.currentShow = show;
        document.title = `${show.name} — Showly`;
        renderShowDetails(show);
        
        // Also fetch similar shows asynchronously
        loadSimilarShows(show);
    } catch (err) {
        console.error('Error loading show details:', err);
        DOM.showDetailsContent.innerHTML = `
            <div class="empty-state-box">
                <h3 class="empty-state-title">Could not load show</h3>
                <p class="empty-state-text">We couldn't retrieve the details for this show. Please try again.</p>
                <button class="btn-primary" onclick="window.history.back()">Go Back</button>
            </div>
        `;
    }
}

function updateDetailsWatchlistButton() {
    const btn = document.getElementById('details-toggle-watchlist-btn');
    if (!btn || !state.currentShow) return;

    const saved = isInWatchlist(state.currentShow.id);
    if (saved) {
        btn.className = 'btn-primary details-watchlist-btn is-saved';
        btn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            In Watchlist
        `;
    } else {
        btn.className = 'btn-primary details-watchlist-btn';
        btn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add to watchlist
        `;
    }
}

function renderShowDetails(show) {
    const posterUrl = show.image?.original || show.image?.medium || '';
    const ratingScore = show.rating?.average ? show.rating.average.toFixed(1) : '8.2';
    const votesText = getVotesEstimation(show.id, ratingScore);
    const yearsRange = getYearsRange(show);
    const runtime = show.runtime || show.averageRuntime ? `${show.runtime || show.averageRuntime} min` : '45 min';
    const language = show.language || 'English';
    const network = show.network?.name || show.webChannel?.name || 'Network';
    const status = show.status === 'Running' ? 'Returning Series' : (show.status || 'Completed');
    const summary = stripHtml(show.summary) || 'No summary available for this show.';
    
    // Genres tags
    const genresHtml = show.genres?.length 
        ? show.genres.map(g => `<span class="genre-tag">${g}</span>`).join('')
        : '<span class="genre-tag">Drama</span>';

    const saved = isInWatchlist(show.id);

    DOM.showDetailsContent.innerHTML = `
        <div class="details-main-grid">
            <!-- Left Poster -->
            <div class="details-poster-col">
                ${posterUrl 
                    ? `<img src="${posterUrl}" alt="${show.name}" class="details-poster-img">`
                    : `<div class="details-poster-img card-poster-placeholder">${show.name}</div>`
                }
            </div>

            <!-- Middle Main Details -->
            <div class="details-center-col">
                <h1 class="details-show-title">${show.name}</h1>
                
                <div class="details-rating-row">
                    <span class="star-icon">★</span>
                    <span>${ratingScore}</span>
                    <span class="votes-count">${votesText}</span>
                </div>

                <div class="details-meta-row">
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${yearsRange}
                    </div>
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${runtime}
                    </div>
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                            <polyline points="17 2 12 7 7 2"></polyline>
                        </svg>
                        TV-14
                    </div>
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        ${language}
                    </div>
                </div>

                <div class="details-genres-wrap">
                    ${genresHtml}
                </div>

                <button id="details-toggle-watchlist-btn" class="btn-primary details-watchlist-btn ${saved ? 'is-saved' : ''}">
                    ${saved 
                        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> In Watchlist`
                        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add to watchlist`
                    }
                </button>

                <div class="details-about-section">
                    <h3>About</h3>
                    <p class="details-about-text">${summary}</p>
                </div>
            </div>

            <!-- Right Sidebar Boxes -->
            <div class="details-sidebar-col">
                <div class="sidebar-box">
                    <h4 class="sidebar-box-title">Details</h4>
                    <dl class="info-list">
                        <div class="info-item">
                            <dt>Status</dt>
                            <dd>${status}</dd>
                        </div>
                        <div class="info-item">
                            <dt>Runtime</dt>
                            <dd>${runtime}</dd>
                        </div>
                        <div class="info-item">
                            <dt>Language</dt>
                            <dd>${language}</dd>
                        </div>
                        <div class="info-item">
                            <dt>Genres</dt>
                            <dd>${show.genres?.join(', ') || 'Drama'}</dd>
                        </div>
                        <div class="info-item">
                            <dt>Network</dt>
                            <dd>${network}</dd>
                        </div>
                        ${show.officialSite ? `
                        <div class="info-item">
                            <dt>Official</dt>
                            <dd><a href="${show.officialSite}" target="_blank" rel="noopener noreferrer" style="color: var(--primary); font-weight:700;">Visit Site ↗</a></dd>
                        </div>` : ''}
                    </dl>
                </div>

                <div class="sidebar-box">
                    <h4 class="sidebar-box-title">Similar shows</h4>
                    <div class="similar-shows-list" id="similar-shows-container">
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Finding recommendations...</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('details-toggle-watchlist-btn').addEventListener('click', () => {
        toggleWatchlist(show);
    });
}

async function loadSimilarShows(currentShow) {
    const container = document.getElementById('similar-shows-container');
    if (!container) return;

    try {
        const query = currentShow.genres?.[0] || 'drama';
        const shows = await fetchSearch(query);
        const filtered = shows
            .filter(s => s.id !== currentShow.id && s.image?.medium)
            .slice(0, 3);

        if (!filtered.length) {
            container.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted);">No similar shows found.</p>';
            return;
        }

        container.innerHTML = '';
        filtered.forEach(item => {
            const row = document.createElement('div');
            row.className = 'similar-show-item';
            row.setAttribute('role', 'button');
            row.setAttribute('tabindex', '0');

            const thumb = item.image?.medium || '';
            const rating = item.rating?.average ? item.rating.average.toFixed(1) : '7.3';

            row.innerHTML = `
                <img src="${thumb}" alt="${item.name}" class="similar-show-thumb">
                <div class="similar-show-info">
                    <p class="similar-show-name">${item.name}</p>
                    <p class="similar-show-rating"><span class="star-icon">★</span> ${rating}</p>
                </div>
                <span class="similar-chevron">›</span>
            `;

            row.addEventListener('click', () => {
                loadAndDisplayShowDetails(item.id);
            });

            container.appendChild(row);
        });
    } catch (err) {
        console.error('Error loading similar shows:', err);
        container.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted);">No recommendations available.</p>';
    }
}

/* ==========================================================================
   WATCHLIST VIEW LOGIC
   ========================================================================== */

function renderWatchlistView() {
    DOM.watchlistContainer.innerHTML = '';

    if (state.favorites.length === 0) {
        DOM.watchlistContainer.innerHTML = `
            <div class="empty-state-box">
                <div class="empty-state-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <h3 class="empty-state-title">Your Watchlist is empty</h3>
                <p class="empty-state-text">Explore popular shows or search for your favorites to add them to your watchlist.</p>
                <button class="btn-primary" id="empty-browse-btn" style="margin-top: 0.5rem;">
                    Browse TV Shows
                </button>
            </div>
        `;
        document.getElementById('empty-browse-btn')?.addEventListener('click', () => {
            navigateTo('browse-view');
        });
        return;
    }

    state.favorites.forEach(show => {
        const itemCard = document.createElement('div');
        itemCard.className = 'watchlist-item-card';

        const posterUrl = show.image?.medium || show.image?.original || '';
        const rating = show.rating?.average ? show.rating.average.toFixed(1) : '7.8';
        const genres = show.genres?.length ? show.genres.slice(0, 2).join(' • ') : 'Drama • Mystery';
        const statusText = show.status === 'Running' ? 'Ongoing' : (show.status || 'Ongoing');
        const statusClass = getStatusClass(statusText);

        itemCard.innerHTML = `
            <div class="watchlist-item-left" tabindex="0" role="button">
                ${posterUrl 
                    ? `<img src="${posterUrl}" alt="${show.name}" class="watchlist-thumb" loading="lazy">` 
                    : `<div class="watchlist-thumb card-poster-placeholder">${show.name.slice(0, 2)}</div>`
                }
                <div class="watchlist-item-info">
                    <h3 class="watchlist-item-title">${show.name}</h3>
                    <div class="watchlist-item-meta">
                        <span class="watchlist-item-rating"><span class="star-icon">★</span> ${rating}</span>
                        <span class="watchlist-item-genres">${genres}</span>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                </div>
            </div>
            <button class="btn-remove-watchlist" title="Remove from watchlist" aria-label="Remove ${show.name}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Remove
            </button>
        `;

        // Click card left to view details
        itemCard.querySelector('.watchlist-item-left').addEventListener('click', () => {
            loadAndDisplayShowDetails(show.id);
        });

        // Remove button
        itemCard.querySelector('.btn-remove-watchlist').addEventListener('click', (e) => {
            e.stopPropagation();
            removeShowFromWatchlist(show.id);
        });

        DOM.watchlistContainer.appendChild(itemCard);
    });
}

/* ==========================================================================
   EVENT LISTENERS & INITIALIZATION
   ========================================================================== */

function setupEventListeners() {
    // Navigation Links
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.view);
        });
    });

    // Watchlist Sidebar buttons
    DOM.watchlistSidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.view);
        });
    });

    // Quick Search Trigger in Header
    DOM.navSearchTrigger.addEventListener('click', () => {
        navigateTo('browse-view');
        DOM.browseSearchInput.focus();
    });

    // Profile & Settings mockup triggers
    DOM.userAvatarBtn.addEventListener('click', () => {
        showToast('Profile: Logged in as Demo User');
    });
    DOM.watchlistProfileLink?.addEventListener('click', () => {
        showToast('Profile: Demo User');
    });
    DOM.watchlistSettingsLink?.addEventListener('click', () => {
        showToast('Settings: Showly v2.0 (Active)');
    });

    // Hero Search Form Submission
    DOM.heroSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = DOM.heroSearchInput.value.trim();
        if (query) {
            navigateTo('browse-view');
            loadBrowseShows(query);
        }
    });

    // Home "View all" link
    DOM.homeViewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('browse-view');
    });

    // Browse Search Form Submission
    DOM.browseSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = DOM.browseSearchInput.value.trim();
        if (query) {
            loadBrowseShows(query);
        }
    });

    // Browse Clear Button
    DOM.browseClearSearch.addEventListener('click', () => {
        DOM.browseSearchInput.value = '';
        DOM.browseClearSearch.style.display = 'none';
        loadBrowseShows('');
    });

    DOM.browseSearchInput.addEventListener('input', () => {
        DOM.browseClearSearch.style.display = DOM.browseSearchInput.value ? 'flex' : 'none';
    });

    // Browse Genre Filter Change
    DOM.browseGenreFilter.addEventListener('change', () => {
        state.selectedGenre = DOM.browseGenreFilter.value;
        renderBrowseShows();
    });

    // Browse Sort Order Change
    DOM.browseSortOrder.addEventListener('change', () => {
        state.selectedSort = DOM.browseSortOrder.value;
        renderBrowseShows();
    });

    // Details Back Button
    DOM.detailsBackBtn.addEventListener('click', () => {
        navigateTo(state.previousView || 'browse-view');
    });

    // Watchlist "Add show" button in header
    DOM.watchlistAddShowBtn.addEventListener('click', () => {
        navigateTo('browse-view');
        DOM.browseSearchInput.focus();
    });

    // Hash change event for browser history
    window.addEventListener('hashchange', handleHashChange);
}

// App Bootstrap
async function init() {
    loadWatchlist();
    setupEventListeners();
    
    // Check initial hash route or load defaults
    if (window.location.hash && window.location.hash !== '#home') {
        handleHashChange();
    } else {
        await loadPopularShows();
    }
}

// Start application
init();
