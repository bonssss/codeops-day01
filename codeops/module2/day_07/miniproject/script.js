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
    let balance = 0;

    // Pure calculation functions (kept separate)
    function calculateEarn(amount, rule) {
        switch (rule) {
            case "holiday":
                return amount * 2;
            case "normal":
            default:
                return amount;
        }
    }

    function calculateRedeem(balance, amount) {
        return balance >= amount ? balance - amount : balance;
    }

    return {
        earn: function (amount, rule = "normal") {
            balance += calculateEarn(amount, rule);
        },
        redeem: function (amount) {
            balance = calculateRedeem(balance, amount);
        },
        balance: function () {
            return balance;
        },
    };
}
 
const loyaltyPoints = createLoyaltyPointsModule();
loyaltyPoints.earn(100);
loyaltyPoints.earn(50, "holiday");
console.log(loyaltyPoints.balance()); 
loyaltyPoints.redeem(50);
console.log(loyaltyPoints.balance()); 

