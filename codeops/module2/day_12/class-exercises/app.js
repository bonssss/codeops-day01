const state = {
    base: "ETB",
    rates: {},
    watchlist: [],
    amount: 1,
    currency: "USD",
    }
const API = "https://open.er-api.com/v6/latest/ETB";
const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const result = document.querySelector("#result");
const watchlist = document.querySelector("#watchlist");
const form = document.querySelector("#convert-form");
const convertBtn = document.querySelector("#convert-btn");
const amountInput = document.querySelector("#amount");
const watchBtn = document.querySelector("#watch-btn");

async function loadRates() {
    status.textContent = "Loading rates...";
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        state.rates = data.rates; // into state
        status.textContent = "";
        render();
    } catch (err) {
        status.textContent = "Could not load rates.";
    }
}  

function render() {
// fill the dropdown from the live rates
const codes = Object.keys(state.rates);
select.innerHTML = codes
.map(c => `<option>${c}</option>`)
.join("");
select.value = state.currency;
renderWatchlist(); // covered next
}

function calculate() {
state.currency = select.value;
const rate = state.rates[state.currency] || 1.0;
state.amount = Number(amountInput.value || 0);
const converted = state.amount * rate;
result.textContent = `${state.amount} ETB = ${converted.toFixed(2)} ${state.currency}`;
}

// wire up the form
form.addEventListener("submit", ev => {
ev.preventDefault();
calculate();
});

// optional: "watch" a currency
function addToWatchlist() {
const c = select.value;
if (!state.watchlist.includes(c)) {
state.watchlist.push(c);
renderWatchlist();
}
}

function renderWatchlist() {
watchlist.innerHTML = state.watchlist
.map(c => {
const val = (state.amount * (state.rates[c] || 1.0)).toFixed(2);
return `<li>${state.amount} ETB → ${val} ${c}</li>`;
})
.join("");
}

loadRates();

if (watchBtn) {
    watchBtn.addEventListener("click", addToWatchlist);
}

