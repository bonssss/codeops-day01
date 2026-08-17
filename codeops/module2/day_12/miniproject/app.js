const state = {
    rates: {},
    watchlist: [],
    currency: "USD",
    amount: 1,
    loading: true,
    error: null
};

const API = "https://open.er-api.com/v6/latest/ETB";

const els = {
    status: document.querySelector("#status"),
    statusContainer: document.querySelector("#status-container"),
    mainContent: document.querySelector("#main-content"),
    select: document.querySelector("#currency"),
    result: document.querySelector("#result"),
    watchlist: document.querySelector("#watchlist"),
    form: document.querySelector("#convert-form"),
    convertBtn: document.querySelector("#convert-btn"),
    amountInput: document.querySelector("#amount"),
    watchBtn: document.querySelector("#watch-btn")
};

function init() {
    load();
    loadRates();
    setupListeners();
}

async function loadRates() {
    state.loading = true;
    state.error = null;
    renderStatus();

    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        
        state.rates = data.rates;
        state.loading = false;
        
        renderStatus();
        render();
    } catch (err) {
        state.error = "Could not load live rates.";
        state.loading = false;
        renderStatus();
    }
}

function renderStatus() {
    if (state.loading) {
        els.status.textContent = "Loading rates...";
        els.status.className = "status-message";
        els.statusContainer.style.display = "block";
        els.mainContent.style.display = "none";
    } else if (state.error) {
        els.status.textContent = state.error;
        els.status.className = "status-message error";
        els.statusContainer.style.display = "block";
        els.mainContent.style.display = "none";
    } else {
        els.statusContainer.style.display = "none";
        els.mainContent.style.display = "block";
    }
}

function render() {
    // Render dropdown options
    const codes = Object.keys(state.rates);
    
    // Only re-render options if they are empty to avoid resetting cursor state on every render
    if (els.select.options.length === 0) {
        els.select.innerHTML = codes
            .map(c => `<option value="${c}">${c}</option>`)
            .join("");
    }
    
    // Set active values
    els.select.value = state.currency;
    els.amountInput.value = state.amount;

    calculateResult();
    renderWatchlist();
}

function calculateResult() {
    if (isNaN(state.amount) || state.amount <= 0) {
        els.result.textContent = "Invalid amount";
        return;
    }

    const rate = state.rates[state.currency] || 1.0;
    const converted = state.amount * rate;
    
    els.result.textContent = `${state.amount} ETB = ${converted.toFixed(2)} ${state.currency}`;
}

function renderWatchlist() {
    if (state.watchlist.length === 0) {
        els.watchlist.innerHTML = `<li class="empty-watchlist">No currencies in your watchlist.</li>`;
        return;
    }

    els.watchlist.innerHTML = state.watchlist
        .map(c => {
            const rate = state.rates[c] || 1.0;
            const val = (state.amount * rate).toFixed(2);
            return `
                <li class="watchlist-item">
                    <div class="watchlist-item-left">
                        <span>${state.amount} ETB</span>
                        <span class="arrow">→</span>
                    </div>
                    <div class="watchlist-item-right">
                        <span class="watchlist-item-val">${val}</span>
                        <span class="watchlist-item-curr">${c}</span>
                        <button type="button" class="remove-btn" data-c="${c}" title="Remove">&times;</button>
                    </div>
                </li>
            `;
        })
        .join("");
}

function setupListeners() {
    els.form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const num = Number(els.amountInput.value);
        if (!isNaN(num) && num > 0) {
            state.amount = num;
            state.currency = els.select.value;
            save();
            render();
        } else {
            alert("Please enter a valid amount greater than 0");
        }
    });

    els.watchBtn.addEventListener("click", () => {
        const c = els.select.value;
        if (!state.watchlist.includes(c)) {
            state.watchlist.push(c);
            save();
            renderWatchlist();
        } else {
            alert(`${c} is already in your watchlist!`);
        }
    });

    els.watchlist.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const c = e.target.getAttribute("data-c");
            state.watchlist = state.watchlist.filter(item => item !== c);
            save();
            renderWatchlist();
        }
    });
}

function save() {
    const dataToSave = {
        currency: state.currency,
        watchlist: state.watchlist
    };
    localStorage.setItem("birrWatchState", JSON.stringify(dataToSave));
}

function load() {
    const savedStr = localStorage.getItem("birrWatchState");
    if (savedStr) {
        try {
            const savedData = JSON.parse(savedStr);
            if (savedData.currency) state.currency = savedData.currency;
            if (Array.isArray(savedData.watchlist)) state.watchlist = savedData.watchlist;
        } catch (e) {
            console.error("Failed to load state from localStorage");
        }
    }
}

// Start app
init();
