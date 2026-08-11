// 1. Given an array of ETB prices, use map to add 15% VAT, filter to keep those under 1000, and reduce to a grand total. 


const prices = [25,200,500,1200,2000]
const vatPrices = prices.map(price => price * 1.15)
console.log(vatPrices);

const under1000 = vatPrices.filter(price => price < 1000)
console.log(under1000);

const total = under1000.reduce((sum, price) => sum + price, 0)
console.log(total);