// 1. Write an async function that fetches the USD→ETB rate from a public exchange-rate API, 
// checks res.ok, and returns the rate.
async function fetchETBRate() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    
    const data = await res.json();
    return data.rates.ETB;
}


// 2. Rewrite a three-step .then chain (fetch → json → render) as an async function 
// using await and try/catch
const list = document.querySelector("#exchange-list");

async function fetchAndRenderRate() {
    try {
        list.innerHTML = "Loading...";
        
        // 1. fetch
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) {
            throw new Error("Data not found");
        }
        
        // 2. json
        const data = await res.json();
        
        // 3. render
        list.innerHTML = "";
        const li = document.createElement("li");
        li.textContent = `1 USD = ${data.rates.ETB} ETB`;
        list.append(li);
        
    } catch (error) {
        list.innerHTML = "<li>Could not load rate.</li>";
        console.error(error);
    }
}

fetchAndRenderRate();


// 3. Fetch a deliberately wrong URL and confirm your catch block runs; then fetch a real URL that 
// returns 404 and show why you also need res.ok. 
const wrongUrlList = document.querySelector("#exchange-list-wrong-url");
async function fetchWrongUrl() {
    try {
        wrongUrlList.innerHTML = "Loading...";
        const res = await fetch("https://this-is-a-completely-fake-domain.local");
        
        if (!res.ok) {
            throw new Error(`Data not found (${res.status})`);
        }
        
        const data = await res.json();
        wrongUrlList.innerHTML = `<li>1 USD = ${data.rates.ETB} ETB</li>`;
    } catch (error) {
        wrongUrlList.innerHTML = `<li>Network Error caught: ${error.message}</li>`;
        console.error("Wrong URL Error:", error);
    }
}
fetchWrongUrl();

const notFoundList = document.querySelector("#exchange-list-404");
async function fetch404Url() {
    try {
        notFoundList.innerHTML = "Loading...";
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/99999999");
        
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }
        
        const data = await res.json();
        notFoundList.innerHTML = `<li>1 USD = ${data.rates.ETB} ETB</li>`;
    } catch (error) {
        notFoundList.innerHTML = `<li>res.ok caught error: ${error.message}</li>`;
        console.error("404 URL Error:", error);
    }
}
fetch404Url();
