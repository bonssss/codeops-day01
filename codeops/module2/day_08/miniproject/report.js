// Filter and reduce to get total by type
export const getTotalByType = (transactions, type) => {
    return transactions
        .filter(t => t.type === type)
        .reduce((total, t) => total + t.amount, 0);
};

// Map with destructuring to create receipt strings
export const generateReceipts = (transactions) => {
    return transactions.map(({ customer, amount }) => `Receipt: ${customer} paid ${amount} ETB`);
};

// Spread syntax to update a transaction without mutating the original
export const updateTransactionAmount = (transaction, newAmount) => {
    return { ...transaction, amount: newAmount };
};
