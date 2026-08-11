# TeleBirr Transaction Report Mini-Project

This mini-project is a small report generator over a list of TeleBirr transactions for an Addis shop. It processes an array of transaction objects using `map`, `filter`, `reduce`, destructuring, and the spread operator, with the logic split across ES6 modules.

## Modules

- **`transaction.js`**: Responsible for storing and exporting the raw data (an array of transaction objects).
- **`report.js`**: Responsible for the data processing logic. It exports summary functions that utilize modern array methods (filter, reduce, map, and the spread operator) to calculate totals, generate receipts, and immutably update transactions.
- **`app.js`**: The main entry point of the application. It imports the data from `transaction.js` and the summary functions from `report.js`, executes them, and prints the final formatted report to the console.

## Execution
Run `node app.js` in the terminal to view the generated report.
