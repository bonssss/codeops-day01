// 2. Build a customer object with name, city and balance, then log every key and value using Object.entries in a for...of loop
const customers =[
    { name:"Bonsa",city:"addis ababa",balance:5000},
    { name:"Abebe",city:"dire dawa",balance:2000},
    { name:"Kebede",city:"addis ababa",balance:3000},
    { name:"Mulugeta",city:"dire dawa",balance:10000},
    { name:"Taye",city:"adama",balance:1500},
]

for (const [key, value] of customers.entries()){
    console.log(`key: ${key}, value: ${JSON.stringify(value)}`);
    
} 


// 3. Destructure name and city from a customer in one line, then write a function greet({ name }) that uses parameter destructuring. 
const [name,city,...others] = customers;

console.log(customers[0].name);
console.log(customers[1].name);
console.log(others);

function greet({name}){
    console.log(`Hello ${name}`);
}

greet(customers[0]);