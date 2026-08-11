# Day 7 Mini-Project: Loyalty Points Module

This project implements a loyalty-points tracker for a TeleBirr shop using JavaScript closures and higher-order functions.

## How the Balance Stays Private
The points balance is kept entirely private by utilizing **JavaScript Closures**. 

When the `createLoyaltyPointsModule()` function is executed, it defines a local variable called `balance`. Because variable scoping in JavaScript restricts access to local variables from the outside, the `balance` cannot be directly read or mutated (e.g. you cannot do `card.balance = 5000`).

However, the inner functions (`earn`, `redeem`, and `balance`) that are returned from the factory maintain a reference to this `balance` variable in their lexical environment (a closure). This allows only those explicitly exposed functions to interact with the balance in a safe, controlled manner, preventing unauthorized manipulation or negative balances.

## Features
- **Data Privacy**: The balance cannot be read or set directly.
- **Data Integrity**: The `redeem` function refuses to push the balance below zero.
- **Higher-Order Functions**: The `earn` function accepts a custom "earn rule" (a function) as a parameter. This allows new rules (like double points on holidays) to be applied seamlessly without modifying the core module logic.
- **Independent State**: Multiple cards created from `createLoyaltyPointsModule()` maintain their own independent balances.
- **Pure Functions**: Business logic like calculating redemptions is handled by pure functions with side-effects kept only to the demo console logs.

## Demo
Run the demo using Node.js:
```bash
node script.js
```
