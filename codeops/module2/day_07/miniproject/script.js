// What you will build
// A loyalty-points module for a TeleBirr shop that tracks a customer’s points balance privately and lets
// you earn and redeem points. The balance must not be directly reachable from outside — only
// through the functions you expose.
// Requirements
// • Use a closure to keep the points balance private — no outside code can read or change it
// directly.
// • Expose three operations: earn(amount), redeem(amount), and balance() (a getter that returns
// the current points).
// • earn should add points (e.g. 1 point per 10 ETB spent); redeem should subtract, but refuse to
// go below zero.
// • Use a higher-order function to apply an "earn rule" passed in — so a holiday rule (double
// points) can be swapped in without changing the module.
// • Keep the calculation functions pure; confine any console output to the edges.
// A worked start
// Begin with the closure that hides the balance, then add the operations:


// function createLoyaltyPointsModule() {
//     let balance = 0;
    
//     return {
//         earn: function(amount) {
//             balance += amount;
//         },
//         redeem: function(amount) {
//             if (balance >= amount) {
//                 balance -= amount;
//             }
//         },
//         balance: function() {
//             return balance;
//         }
//     };
// }

// const loyaltyPoints = createLoyaltyPointsModule();
// console.log(loyaltyPoints.balance());
// loyaltyPoints.earn(100);
// console.log(loyaltyPoints.balance());
// loyaltyPoints.redeem(50);
// console.log(loyaltyPoints.balance());

function createLoyaltyPointsModule() {
    // 1. The balance is kept entirely private using this closure.
    let balance = 0;

    // Pure calculation function for redemption (kept separate)
    function calculateRedeem(currentBalance, amount) {
        return currentBalance >= amount ? currentBalance - amount : currentBalance;
    }

    return {
        // 2. Higher-order function implementation: 
        
        earn: function (amount, earnRuleFn = (amt) => amt / 10) { // Default: 1 point per 10 ETB
            balance += earnRuleFn(amount);
        },
        redeem: function (amount) {
            balance = calculateRedeem(balance, amount);
        },
        balance: function () {
            return balance;
        },
    };
}
 


// Define our pure earn rules outside the module
const normalRule = (amount) => amount / 10;
const holidayRule = (amount) => (amount / 10) * 2;

// 1. Create two independent cards from the factory
const card1 = createLoyaltyPointsModule();
const card2 = createLoyaltyPointsModule();

console.log("=== Card 1 ===");
// Earning with the default rule
card1.earn(100); 
console.log("Balance after 100 ETB (normal):", card1.balance()); 

// Earning with the swapped-in holiday rule (Higher-order function)
card1.earn(100, holidayRule); 
console.log("Balance after 100 ETB (holiday):", card1.balance()); 

// Redeeming
card1.redeem(25);
console.log("Balance after redeeming 25:", card1.balance()); // 5

// Attempting to redeem below zero
card1.redeem(10);
console.log("Attempted to redeem 10 (refused):", card1.balance()); // 5


console.log("\n=== Card 2 ===");
// Proving independence
console.log("Card 2 initial balance:", card2.balance()); // 0
card2.earn(500, holidayRule);
console.log("Card 2 balance after 500 ETB (holiday):", card2.balance()); // 100
