
// 4. Write a higher-order applyToAll(list, fn) that runs fn over every item and returns the results, then
// use it to add VAT to an array of prices.

function applyToAll(list, fn){
    const result = [];
    for(let i = 0; i < list.length; i++){
        result.push(fn(list[i]));
    }
    return result;
}

const vat = (amount) => amount * 1.15;

console.log(applyToAll([10, 20, 30], vat));






// function applyToAll(list, fn) {
//     return list.map(fn);
// }

// const prices = [10, 20, 30];
// const vatRate = 0.2;
// const addVAT = (price) => price * (1 + vatRate);
// const pricesWithVAT = applyToAll(prices, addVAT);
// console.log(pricesWithVAT); // [12, 24, 36]