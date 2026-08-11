// 2. Build a customer object with name, city and balance, then log every key and value using Object.entries in a for...of loop
const customers =
    { name: "Bonsa", city: "addis ababa", balance: 5000 }


for (const [key, value] of Object.entries(customers)) {
    console.log(`key: ${key}, value: ${value}`);
}


// 3. Destructure name and city from a customer in one line, then write a function greet({ name }) that uses parameter destructuring. 
const {name,city}= customers;

console.log(name);
// console.log(customers[1].name);
// console.log(others);

function greet({name}){
    console.log(`Hello ${name}`);
}

greet(customers);