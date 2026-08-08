// 3. Write a discountBy(rate) factory and create memberPrice (10%) and salePrice (30%) from it.
// Apply both to a price of 1000 ETB.


function discountBy(rate){
    return function(price){
        return price - price * rate;
    }
}

const memberPrice = discountBy(0.1);
const salePrice = discountBy(0.3);

console.log(memberPrice(1000));
console.log(salePrice(1000));