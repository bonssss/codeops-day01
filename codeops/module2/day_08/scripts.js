
const vowels = ['a', 'e', 'i', 'o', 'u']

console.log(vowels);
console.log(vowels[2]);
console.log(vowels.length);
console.log(vowels[vowels.length - 1]);
console.log(vowels[2 - 1]);
console.log(vowels.toReversed());

const newvawels = vowels.map(vow => vow + " is a vowel")
console.log(newvawels);

const newvowels2 = vowels.filter(vow => vow != "a")
console.log(newvowels2);

const newvawels3 = vowels.find(vow => vow === "i")
console.log(newvawels3);


const numbers = [ 4, 5, 6, 45, 30, 87]

const sums = numbers.reduce((sum, num) => sum + num, 0)

console.log(sums);


const result = numbers.filter(num => num % 2 === 0).map(num => num ** 2).reduce((sum, num) => sum + num, 0)
console.log(result);



// const bankAccountX={
//     name:'Bonsa',
//     balance:1000,
//     interestRate:0.05,
//     deposit:function(amount){
//         this.balance+=amount;
//     },
//     withdraw:function(amount){
//         if(this.balance>=amount){
//             this.balance-=amount;
//         }
//         else{
//             console.log("Insufficient funds");
//         }
//     }
// }
// console.log(bankAccountX.name);

// bankAccountX.deposit(100);
// console.log(bankAccountX.balance);
// bankAccountX.withdraw(5000);
// console.log(bankAccountX.balance);

// const arr=[
//     {id:2,"name":"Bonsa",items:[2,4,5]},
//     {id:3,"name":"Abebe"},
//     {id:4,"name":"Kebede"}
// ]

// console.log(arr[0].name);
// console.log(arr[0].items);
// console.log(arr[0].items[1]);

// console.log(arr[2]);





// // 