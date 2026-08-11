
//  const vowels=['a','e','i','o','u']

// console.log(vowels);
// console.log(vowels[2]);
// console.log(vowels.length);
// console.log(vowels[vowels.length-1]);
// console.log(vowels[2-1]);
// console.log(vowels.toReversed());

const bankAccountX={
    name:'Bonsa',
    balance:1000,
    interestRate:0.05,
    deposit:function(amount){
        this.balance+=amount;
    },
    withdraw:function(amount){
        if(this.balance>=amount){
            this.balance-=amount;
        }
        else{
            console.log("Insufficient funds");
        }
    }
}
console.log(bankAccountX.name);

bankAccountX.deposit(100);
console.log(bankAccountX.balance);
bankAccountX.withdraw(5000);
console.log(bankAccountX.balance);

const arr=[
    {id:2,"name":"Bonsa",items:[2,4,5]},
    {id:3,"name":"Abebe"},
    {id:4,"name":"Kebede"}
]

console.log(arr[0].name);
console.log(arr[0].items);
console.log(arr[0].items[1]);

console.log(arr[2]);





