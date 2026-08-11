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