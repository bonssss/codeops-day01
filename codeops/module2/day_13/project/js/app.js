// --- 1. State: Variables to keep track of our money ---
// Get values from localStorage on page load, default to 0 if not found
let totalIncome = parseFloat(localStorage.getItem('income')) || 0;
let totalExpense = parseFloat(localStorage.getItem('expense')) || 0;
let balance = parseFloat(localStorage.getItem('balance')) || 0;
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// --- 2. Select HTML Elements ---
const transactionForm = document.getElementById('transactionForm');
const typeInput = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const transactionList = document.getElementById('transactionList');

// New: Select the display elements we just added IDs to!
const incomeDisplay = document.getElementById('incomeDisplay');
const expenseDisplay = document.getElementById('expenseDisplay');
const balanceDisplay = document.getElementById('balanceDisplay');

// --- 3. Handle Form Submission ---
transactionForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page refresh

    const type = typeInput.value;
    const amount = parseFloat(amountInput.value); 
    const date= dateInput.value;
    const descriptionText = descriptionInput.value;

    // --- 4. The Logic (Math!) ---
    if (type === 'income') {
        totalIncome = totalIncome + amount; // Add to income
    } else if (type === 'expense') {
        totalExpense = totalExpense + amount; // Add to expense
    }

    // Calculate new balance
    balance = totalIncome - totalExpense;

    // Add transaction to state
    const transaction = { type, description: descriptionText, amount, date };
    transactions.push(transaction);

    // save to local storage
    localStorage.setItem('income', totalIncome);
    localStorage.setItem('expense', totalExpense);
    localStorage.setItem('balance', balance);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // --- 5. Update the HTML on the screen ---
    updateUI();
    renderTransactions();

    // --- 6. Clear inputs ---
    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
});

// --- Function to update the HTML on the screen ---
function updateUI() {
    // The .toFixed(2) forces the number to always show 2 decimal places (e.g., 50.00)
    incomeDisplay.textContent = "$" + totalIncome.toFixed(2);
    expenseDisplay.textContent = "$" + totalExpense.toFixed(2);
    balanceDisplay.textContent = "$" + balance.toFixed(2);
}

function renderTransactions() {
    transactionList.innerHTML = ''; // Clear existing list
    transactions.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.type}</td>
            <td>${t.description}</td>
            <td class="${t.type === 'income' ? 'income-amount' : 'expense-amount'}">$${t.amount.toFixed(2)}</td>
            <td>${t.date}</td>
        `;
        transactionList.appendChild(tr);
    });
}

// Call updateUI and renderTransactions once when the script loads to display saved values
updateUI();
renderTransactions();
