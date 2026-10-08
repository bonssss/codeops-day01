/**
 * Showly - Show Details Page Script
 */

const FAVORITES_KEY = 'showly_watchlist';
const detailsContainer = document.getElementById('details-container');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

function stripHtml(html) {
    if (!html) return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

function getFavorites() {
    try {
        const saved = localStorage.getItem(FAVORITES_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.error('Error saving watchlist:', e);
    }
}

function isInWatchlist(id) {
    const list = getFavorites();
    return list.some(item => item.id === Number(id));
}

function toggleWatchlist(show) {
    let list = getFavorites();
    const index = list.findIndex(item => item.id === show.id);
    const btn = document.getElementById('details-toggle-watchlist-btn');

    if (index >= 0) {
        list.splice(index, 1);
        saveFavorites(list);
        showToast(`Removed "${show.name}" from Watchlist`);
        if (btn) {
            btn.className = 'btn-primary details-watchlist-btn';
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add to watchlist
            `;
        }
    } else {
        list.unshift(show);
        saveFavorites(list);
        showToast(`Added "${show.name}" to Watchlist`);
        if (btn) {
            btn.className = 'btn-primary details-watchlist-btn is-saved';
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                In Watchlist
            `;
        }
    }
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

function renderDetails(show) {
    document.title = `${show.name} — Showly`;
    
    const posterUrl = show.image?.original || show.image?.medium || '';
    const ratingScore = show.rating?.average ? show.rating.average.toFixed(1) : '8.2';
    const votesEstimate = `(${((show.id * 73 + 1234) % 8900 + 1100).toLocaleString()} votes)`;
    const yearsRange = getYearsRange(show);
    const runtime = show.runtime || show.averageRuntime ? `${show.runtime || show.averageRuntime} min` : '45 min';
    const language = show.language || 'English';
    const network = show.network?.name || show.webChannel?.name || 'Network';
    const status = show.status === 'Running' ? 'Returning Series' : (show.status || 'Completed');
    const summary = stripHtml(show.summary) || 'No description available for this show.';
    
    const genresHtml = show.genres?.length 
        ? show.genres.map(g => `<span class="genre-tag">${g}</span>`).join('')
        : '<span class="genre-tag">Drama</span>';

    const saved = isInWatchlist(show.id);

    detailsContainer.innerHTML = `
        <div class="details-main-grid">
            <div class="details-poster-col">
                ${posterUrl 
                    ? `<img src="${posterUrl}" alt="${show.name}" class="details-poster-img">`
                    : `<div class="details-poster-img card-poster-placeholder">${show.name}</div>`
                }
            </div>

            <div class="details-center-col">
                <h1 class="details-show-title">${show.name}</h1>
                
                <div class="details-rating-row">
                    <span class="star-icon">★</span>
                    <span>${ratingScore}</span>
                    <span class="votes-count">${votesEstimate}</span>
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

    loadSimilarShows(show);
}

async function loadSimilarShows(show) {
    const container = document.getElementById('similar-shows-container');
    if (!container) return;

    try {
        const query = show.genres?.[0] || 'drama';
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
        const shows = await res.json();
        const filtered = shows
            .map(item => item.show)
            .filter(s => s.id !== show.id && s.image?.medium)
            .slice(0, 3);

        if (!filtered.length) {
            container.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted);">No similar shows found.</p>';
            return;
        }

        container.innerHTML = '';
        filtered.forEach(item => {
            const row = document.createElement('a');
            row.className = 'similar-show-item';
            row.href = `show.html?id=${item.id}`;

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

            container.appendChild(row);
        });
    } catch (err) {
        console.error('Error loading similar shows:', err);
        container.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted);">No recommendations available.</p>';
    }
}

async function loadShowDetails() {
    const showId = new URLSearchParams(window.location.search).get('id');
    if (!showId || !/^\d+$/.test(showId)) {
        detailsContainer.innerHTML = `
            <div class="empty-state-box">
                <h3 class="empty-state-title">No show specified</h3>
                <p class="empty-state-text">Please select a show from the browse catalog.</p>
                <a href="index.html#browse" class="btn-primary">Browse Shows</a>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${encodeURIComponent(showId)}`);
        if (!response.ok) throw new Error(`TVMaze error: ${response.status}`);
        const show = await response.json();
        renderDetails(show);
    } catch (err) {
        console.error('Error loading show details:', err);
        detailsContainer.innerHTML = `
            <div class="empty-state-box">
                <h3 class="empty-state-title">Could not load show</h3>
                <p class="empty-state-text">Check your internet connection and try again.</p>
                <a href="index.html#browse" class="btn-primary">Back to Browse</a>
            </div>
        `;
    }
}

loadShowDetails();
