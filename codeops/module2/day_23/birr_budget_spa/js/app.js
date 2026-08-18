// App State
const state = {
    transactions: [],
    categories: [],
    ui: {
        isModalOpen: false
    }
};

// DOM Elements
const remainingBalanceEl = document.getElementById("remainingBalance");
const savingsRateEl = document.getElementById("savingsRate");
const totalIncomeEl = document.getElementById("totalIncome");
const totalExpensesEl = document.getElementById("totalExpenses");

const expenseItemsContainer = document.getElementById("expenseItemsContainer");
const transactionListContainer = document.getElementById("transactionListContainer");

// Modal Elements
const openAddModalBtn = document.getElementById("openAddModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const addModalOverlay = document.getElementById("addModalOverlay");
const addModal = document.getElementById("addModal");
const addTransactionForm = document.getElementById("addTransactionForm");

// Initialization
async function init() {
    // Check localStorage first
    const savedTransactions = localStorage.getItem("birrTransactions");
    const savedCategories = localStorage.getItem("birrCategories");

    if (savedTransactions && savedCategories) {
        state.transactions = JSON.parse(savedTransactions);
        state.categories = JSON.parse(savedCategories);
    } else {
        // Fetch from JSON if nothing in localStorage
        try {
            const res = await fetch("data/data.json");
            const data = await res.json();
            state.transactions = data.transactions;
            state.categories = data.categories;
            saveState();
        } catch (error) {
            console.error("Failed to fetch mock data", error);
        }
    }

    attachEventListeners();
    render();
}

function saveState() {
    localStorage.setItem("birrTransactions", JSON.stringify(state.transactions));
    localStorage.setItem("birrCategories", JSON.stringify(state.categories));
}

// Event Listeners
function attachEventListeners() {
    openAddModalBtn.addEventListener("click", () => toggleModal(true));
    closeModalBtn.addEventListener("click", () => toggleModal(false));
    addModalOverlay.addEventListener("click", () => toggleModal(false));

    addTransactionForm.addEventListener("submit", handleAddTransaction);

    // Event Delegation for delete buttons
    transactionListContainer.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".btn-danger-sm");
        if (deleteBtn) {
            const id = parseInt(deleteBtn.dataset.id);
            deleteTransaction(id);
        }
    });
}

function toggleModal(isOpen) {
    state.ui.isModalOpen = isOpen;
    if (isOpen) {
        addModal.classList.add("active");
        addModalOverlay.classList.add("active");
    } else {
        addModal.classList.remove("active");
        addModalOverlay.classList.remove("active");
        addTransactionForm.reset();
    }
}

function handleAddTransaction(e) {
    e.preventDefault();
    
    const desc = document.getElementById("transDescription").value;
    const amount = parseFloat(document.getElementById("transAmount").value);
    const type = document.getElementById("transType").value;
    const category = document.getElementById("transCategory").value;
    const dateInput = document.getElementById("transDate").value;

    // Format date string beautifully like "May 16, 2025"
    const dateObj = new Date(dateInput);
    const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newTrans = {
        id: Date.now(),
        date: date,
        description: desc,
        type: type,
        category: category,
        amount: amount
    };

    state.transactions.unshift(newTrans); // Add to beginning
    saveState();
    toggleModal(false);
    render();
}

function deleteTransaction(id) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveState();
    render();
}

// Render Functions
function render() {
    renderStats();
    renderExpensesList();
    renderTransactions();
}

function renderStats() {
    let income = 0;
    let expenses = 0;

    state.transactions.forEach(t => {
        if (t.type === 'income') income += t.amount;
        if (t.type === 'expense') expenses += t.amount;
    });

    const balance = income - expenses;
    const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

    totalIncomeEl.textContent = income.toLocaleString();
    totalExpensesEl.textContent = expenses.toLocaleString();
    remainingBalanceEl.textContent = balance.toLocaleString();
    savingsRateEl.textContent = `${savingsRate > 0 ? savingsRate : 0}%`;
}

function renderExpensesList() {
    let totalExpenses = 0;
    const expenseTotalsByCategory = {};

    state.transactions.forEach(t => {
        if (t.type === 'expense') {
            totalExpenses += t.amount;
            if (!expenseTotalsByCategory[t.category]) expenseTotalsByCategory[t.category] = 0;
            expenseTotalsByCategory[t.category] += t.amount;
        }
    });

    if (totalExpenses === 0) {
        expenseItemsContainer.innerHTML = '<p class="text-muted">No expenses recorded yet.</p>';
        return;
    }

    const html = Object.keys(expenseTotalsByCategory).map(catName => {
        const catInfo = state.categories.find(c => c.name === catName) || { color: 'purple', icon: 'fa-ellipsis' };
        const amount = expenseTotalsByCategory[catName];
        const percent = Math.round((amount / totalExpenses) * 100);

        return `
            <div class="expense-item">
                <div class="ex-icon ${catInfo.color}"><i class="fa-solid ${catInfo.icon}"></i></div>
                <div class="ex-details">
                    <div class="ex-header">
                        <span class="ex-name">${catName}</span>
                        <div class="ex-values">
                            <span class="ex-amount">${amount.toLocaleString()} ETB</span>
                            <span class="ex-percent ${catInfo.color}">${percent}%</span>
                        </div>
                    </div>
                    <div class="progress-bar"><div class="fill ${catInfo.color}" style="width: ${percent}%;"></div></div>
                </div>
            </div>
        `;
    }).join("");

    expenseItemsContainer.innerHTML = html;
}

function renderTransactions() {
    if (state.transactions.length === 0) {
        transactionListContainer.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No transactions found.</td></tr>';
        return;
    }

    const html = state.transactions.map(t => {
        const isIncome = t.type === 'income';
        const sign = isIncome ? '+' : '-';
        return `
            <tr>
                <td>${t.date}</td>
                <td>${t.description}</td>
                <td><span class="badge ${t.type}">${t.type === 'income' ? 'Income' : 'Expense'}</span></td>
                <td>${t.category}</td>
                <td class="amount ${isIncome ? 'positive' : 'negative'}">${sign}${t.amount.toLocaleString()} ETB</td>
                <td>
                    <button class="btn-danger-sm" data-id="${t.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join("");

    transactionListContainer.innerHTML = html;
}

// Boot up
document.addEventListener("DOMContentLoaded", init);
