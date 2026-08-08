// 1. Write a vat(amount, rate = 0.15) function using a default parameter, then write the same logic
// as an arrow function with an implicit return.

// 3. Write a discountBy(rate) factory and create memberPrice (10%) and salePrice (30%) from it.
// Apply both to a price of 1000 ETB.
// 4. Write a higher-order applyToAll(list, fn) that runs fn over every item and returns the results, then
// use it to add VAT to an array of prices.
// 5. Use forEach (a callback) to print each Ethiopian city in an array with its index, e.g. "1. Addis
// Ababa".


function vat(amount, rate = 0.15) {
  return amount + amount * rate;
}

const vatArrow = (amount, rate = 0.15) => amount + amount * rate;
console.log(vat(100, 0.2));
console.log(vatArrow(100, 0.1));