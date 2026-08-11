// 1. Define a named export `VAT` (0.15) and a default export `formatCurrency()` 
// that formats a number as currency, then import both in a second file and log the results.
import formatCurrency, { addVAT, VAT } from "./money.js";

console.log(formatCurrency(100));
console.log(addVAT(100));
console.log(VAT);
