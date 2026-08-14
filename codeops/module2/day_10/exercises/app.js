async function exchangeDollar() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");

    if (!res.ok) {
        throw new Error("Data not found");
    }
    const data = await res.json();
    return data.rates.ETB;
}

exchangeDollar().then(rate => console.log("USD to ETB rate:", rate));
