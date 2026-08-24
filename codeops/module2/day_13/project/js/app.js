// --- 1. State: Variables to keep track of our money ---
// Get values from localStorage on page load, default to 0 if not found
let totalIncome = parseFloat(localStorage.getItem('income')) || 0;
let totalExpense = parseFloat(localStorage.getItem('expense')) || 0;
let balance = parseFloat(localStorage.getItem('balance')) || 0;
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// --- 2. Select HTML Elements ---
const transactionModal = document.getElementById('transactionModal');
const transactionForm = document.getElementById('transactionForm');
const typeInput = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const transactionList = document.getElementById('transactionList');
const formNotification = document.getElementById('formNotification');
const closeFormBtn = document.getElementById('closeFormBtn');

// Buttons to toggle/display the pop-up modal
const getStartedBtn = document.getElementById('getStartedBtn');
const heroGetStartedBtn = document.getElementById('heroGetStartedBtn');
const heroAddBtn = document.getElementById('heroAddBtn');

// Display elements
const incomeDisplay = document.getElementById('incomeDisplay');
const expenseDisplay = document.getElementById('expenseDisplay');
const balanceDisplay = document.getElementById('balanceDisplay');
const savingRateDisplay = document.getElementById('savingRateDisplay');

// --- 3. Functions to Show/Hide Modal Pop-up and Messages ---
function openTransactionForm() {
    if (transactionModal) {
        transactionModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        setTimeout(() => {
            if (typeInput) typeInput.focus();
        }, 150);
    }
}

function closeTransactionForm() {
    if (transactionModal) {
        transactionModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
    }
}

let notificationTimeout;
function showMessage(text, type = 'success') {
    if (!formNotification) return;
    formNotification.textContent = text;
    formNotification.className = `notification-box notification-${type}`;
    formNotification.style.display = 'block';

    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
        formNotification.style.display = 'none';
    }, 4000);
}

// Attach event listeners to open/close modal
if (getStartedBtn) getStartedBtn.addEventListener('click', openTransactionForm);
if (heroGetStartedBtn) heroGetStartedBtn.addEventListener('click', openTransactionForm);
if (heroAddBtn) heroAddBtn.addEventListener('click', openTransactionForm);
if (closeFormBtn) closeFormBtn.addEventListener('click', closeTransactionForm);

// Close modal when clicking outside on backdrop
if (transactionModal) {
    transactionModal.addEventListener('click', function(e) {
        if (e.target === transactionModal) {
            closeTransactionForm();
        }
    });
}

// Close modal on Escape key press
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && transactionModal && transactionModal.style.display === 'flex') {
        closeTransactionForm();
    }
});

// Set today's date as default in date input
if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
}

// --- 4. Handle Form Submission ---
if (transactionForm) {
    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop page refresh

        const type = typeInput.value;
        const amount = parseFloat(amountInput.value); 
        const date = dateInput.value;
        const descriptionText = descriptionInput.value.trim();

        if (isNaN(amount) || amount <= 0) {
            showMessage('Please enter a valid positive amount.', 'error');
            return;
        }

        // --- Math Logic ---
        if (type === 'income') {
            totalIncome = totalIncome + amount;
        } else if (type === 'expense') {
            totalExpense = totalExpense + amount;
        }

        // Calculate new balance
        balance = totalIncome - totalExpense;

        // Add transaction to state
        const transaction = { type, description: descriptionText, amount, date };
        transactions.unshift(transaction); // Add newest transaction at top

        // Save to local storage
        localStorage.setItem('income', totalIncome);
        localStorage.setItem('expense', totalExpense);
        localStorage.setItem('balance', balance);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // --- Update UI ---
        updateUI();
        renderTransactions();

        // --- Show Success Message ---
        const formattedAmount = '$' + amount.toFixed(2);
        showMessage(`Transaction added successfully! (${type.toUpperCase()}: ${formattedAmount} - ${descriptionText})`, 'success');

        // --- Clear inputs ---
        descriptionInput.value = '';
        amountInput.value = '';
        typeInput.value = '';
    });
}

// --- 5. Function to update overview displays ---
function updateUI() {
    if (incomeDisplay) incomeDisplay.textContent = "$" + totalIncome.toFixed(2);
    if (expenseDisplay) expenseDisplay.textContent = "$" + totalExpense.toFixed(2);
    if (balanceDisplay) balanceDisplay.textContent = "$" + balance.toFixed(2);

    if (savingRateDisplay) {
        if (totalIncome > 0) {
            const rate = ((balance / totalIncome) * 100).toFixed(0);
            savingRateDisplay.textContent = Math.max(0, rate) + "%";
        } else {
            savingRateDisplay.textContent = "0%";
        }
    }
}

// --- 6. Function to render transactions table ---
function renderTransactions() {
    if (!transactionList) return;
    transactionList.innerHTML = ''; // Clear existing list

    if (transactions.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="4" style="text-align: center; color: #888; padding: 2rem;">No transactions yet. Click "+ Add Transaction" to get started!</td>`;
        transactionList.appendChild(tr);
        return;
    }

    transactions.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="badge badge-${t.type}">${t.type}</span></td>
            <td>${t.description}</td>
            <td class="${t.type === 'income' ? 'income-amount' : 'expense-amount'}">${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}</td>
            <td>${t.date || '-'}</td>
        `;
        transactionList.appendChild(tr);
    });
}

// Call updateUI and renderTransactions once when the script loads
updateUI();
renderTransactions();
