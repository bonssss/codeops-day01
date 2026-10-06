const detailsStatus = document.getElementById('details-status');
const detailsContainer = document.getElementById('show-details');
const detailsFacts = document.getElementById('detail-facts');
const detailsPoster = document.getElementById('detail-poster-container');

function addFact(label, value) {
    const item = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value || 'Not available';
    item.append(term, description);
    detailsFacts.append(item);
}

function getSummaryText(summary) {
    return new DOMParser().parseFromString(summary || '', 'text/html').body.textContent.trim();
}

function renderDetails(show) {
    document.title = `${show.name} | TV Shows`;
    document.getElementById('detail-title').textContent = show.name;
    document.getElementById('detail-tagline').textContent = [
        show.premiered ? `Premiered ${show.premiered.slice(0, 4)}` : '',
        show.status || '',
    ].filter(Boolean).join(' · ');
    document.getElementById('detail-summary').textContent =
        getSummaryText(show.summary) || 'No description available.';

    const poster = show.image?.original || show.image?.medium;
    if (poster) {
        const image = document.createElement('img');
        image.className = 'detail-poster';
        image.src = poster;
        image.alt = `Poster for ${show.name}`;
        detailsPoster.append(image);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'detail-poster-placeholder';
        placeholder.textContent = 'No poster available';
        detailsPoster.append(placeholder);
    }

    addFact('Rating', show.rating?.average ? `${show.rating.average} / 10` : 'Not rated');
    addFact('Genres', show.genres?.join(', '));
    addFact('Network', show.network?.name || show.webChannel?.name);
    addFact('Runtime', show.runtime ? `${show.runtime} minutes` : '');
    addFact('Schedule', show.schedule?.days?.length
        ? `${show.schedule.days.join(', ')}${show.schedule.time ? ` at ${show.schedule.time}` : ''}`
        : '');

    const siteLink = document.getElementById('detail-site');
    if (show.officialSite) {
        siteLink.href = show.officialSite;
        siteLink.hidden = false;
    }

    detailsStatus.hidden = true;
    detailsContainer.hidden = false;
}

async function loadDetails() {
    const showId = new URLSearchParams(window.location.search).get('id');
    if (!showId || !/^\d+$/.test(showId)) {
        detailsStatus.textContent = 'A valid show was not specified.';
        return;
    }

    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${encodeURIComponent(showId)}`);
        if (!response.ok) {
            throw new Error(`TVMaze returned ${response.status}`);
        }
        const show = await response.json();
        renderDetails(show);
    } catch (error) {
        console.error('Error loading show details:', error);
        detailsStatus.textContent = 'Could not load show details. Please try again later.';
    }
}

loadDetails();
