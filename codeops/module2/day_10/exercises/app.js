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