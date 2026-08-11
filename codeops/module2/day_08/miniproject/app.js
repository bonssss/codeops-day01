import { transactions } from "./transaction.js";
import { getTotalByType, generateReceipts, updateTransactionAmount } from "./report.js";

console.log("--- Total By Type ---");
console.log("Total Debit:", getTotalByType(transactions, "debit"));
console.log("Total Credit:", getTotalByType(transactions, "credit"));

console.log("\n--- Formatted Receipts ---");
console.log(generateReceipts(transactions).join('\n'));

console.log("\n--- Updated Transaction (Immutable) ---");
const updatedTx = updateTransactionAmount(transactions[0], 12345);
console.log("Original:", transactions[0]);
console.log("Updated:", updatedTx);
