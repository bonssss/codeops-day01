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
export const transactions =[
    {id:1, customerName:"Abel",amount:100, type:"debit"},
    {id:2, customerName:"Bini",amount:100, type:"credit"},
    {id:3, customerName:"Bekele",amount:200, type:"credit"},
    {id:4, customerName:"Girma",amount:300, type:"debit"},
    {id:5, customerName:"Abebe",amount:400, type:"debit"},
    {id:6, customerName:"Dereje",amount:500, type:"credit"},
    {id:7, customerName:"Tsegaye",amount:600, type:"debit"},
    {id:8, customerName:"Mulu",amount:300, type:"debit"},
    {id:9, customerName:"Lidetu",amount:1200, type:"credit"},
    {id:10, customerName:"Niguse",amount:1300, type:"debit"},

] 

const debitTransactions  = transactions.filter(t=>t.type === "debit");
const creditTransactions  = transactions.filter(t=>t.type === "credit");

const totalDebit = debitTransactions.reduce((total, transaction)=>total + transaction.amount, 0);
const totalCredit = creditTransactions.reduce((total, transaction)=>total + transaction.amount, 0);

console.log(`total credit: ${totalCredit}`);
console.log(`total debit: ${totalDebit}`);


console.log("debitTransactions", debitTransactions); 
console.log("creditTransactions", creditTransactions);

const destruct = transactions.map(({customerName, amount})=>({customerName, amount})); 
console.log("destruct", destruct);


const spread = {...transactions[0], amount:12345};
console.log("spread", spread);