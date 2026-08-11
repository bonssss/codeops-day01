export const VAT = 0.15;
export const addVAT = (amount) => amount * (1 + VAT);

export default function formatCurrency(amount) {
    return amount.toFixed(2) + " Birr";
}

