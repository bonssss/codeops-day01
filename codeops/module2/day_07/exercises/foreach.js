
// 5. Use forEach (a callback) to print each Ethiopian city in an array with its index, e.g. "1. Addis
// Ababa".

const cities = ["Addis Ababa", "Mekele", "Dire Dawa"];

cities.forEach((city, index) => console.log(`${index + 1}. ${city}`));

// 6. Write a map() version of filter() that returns a new array with a boolean flag per item. Call
// it filterFlagged(data, predicate) and test it with numbers > 10.

function filterFlagged(data, predicate){
    const result = [];
    for(let i = 0; i < data.length; i++){
        result.push(predicate(data[i]));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];
const result = filterFlagged(numbers, (number) => number > 3);
console.log(result);  // [false, false, false, true, true]