// Mini-Project — TeleBirr Transaction Report
// Ships with this reading
// This mini-project is part of today’s assignment. It processes an array of transaction objects with
// map/filter/reduce, destructuring and spread, split across modules, and is due before the next session.
// What you will build
// A small report generator over a list of TeleBirr transactions for an Addis shop. Each transaction is an
// object; you summarise and format them using the array methods and modern syntax from today,
// with the logic split into reusable modules.
// Requirements
// • Model each transaction as an object: { id, customer, amount, type } where type is "credit" or
// "debit" and amount is in ETB.
// • Use filter to separate credits from debits, and reduce to total each.
// • Use map with destructuring in the callback ({ customer, amount }) to build a list of formatted
// receipt strings.
// • Use spread to produce an updated copy of one transaction (e.g. correcting an amount) without
// mutating the original.
// • Split the code into modules: a transactions.js exporting the data, a report.js exporting the
// summary functions, and an app.js that imports both and prints the report.
export const transactions = [
    {id: 1, customer: "Abel", amount: 100, type: "debit"},
    {id: 2, customer: "Bini", amount: 100, type: "credit"},
    {id: 3, customer: "Bekele", amount: 200, type: "credit"},
    {id: 4, customer: "Girma", amount: 300, type: "debit"},
    {id: 5, customer: "Abebe", amount: 400, type: "debit"},
    {id: 6, customer: "Dereje", amount: 500, type: "credit"},
    {id: 7, customer: "Tsegaye", amount: 600, type: "debit"},
    {id: 8, customer: "Mulu", amount: 300, type: "debit"},
    {id: 9, customer: "Lidetu", amount: 1200, type: "credit"},
    {id: 10, customer: "Niguse", amount: 1300, type: "debit"},
];
