const form = document.querySelector("#shopping-form");
const itemNameInput = document.querySelector("#item-name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#shopping-list");
const totalAmount = document.querySelector("#total-amount");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Fixed typo: was e.prevenDefault()
    
    const name = itemNameInput.value.trim();
    const priceValue = priceInput.value.trim();
    
    if (name === "" || priceValue === "") {
        alert("Please enter item name and price");
        return;                     
    }
    
    const price = Number(priceValue);
    addRow(name, price);
    updateTotal();
    form.reset();
});

// Create and append the new row
function addRow(name, price) {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-3 border-b border-gray-200 last:border-0 hover:bg-gray-100 cursor-pointer transition-colors group";
    
    // Store price in data attribute so we can easily calculate the total later
    li.dataset.price = price;
    
    // Create text span
    const span = document.createElement("span");
    span.className = "text-lg font-medium text-gray-800 transition-all";
    span.textContent = `${name} - ${price} ETB`;
    
    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100";
    
    // Append to list item
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    // Append list item to list
    list.appendChild(li);
}

// Calculate and update the total price
function updateTotal() {
    let sum = 0;
    const items = list.querySelectorAll("li");
    
    items.forEach(item => {
        sum += Number(item.dataset.price);
    });
    
    if (totalAmount) {
        totalAmount.textContent = sum;
    }
}

list.addEventListener("click", (e) => {
    // Delete item
    if (e.target.matches(".delete")) {
        e.target.closest("li").remove();
        updateTotal(); // Update total after deleting
    }
    // Toggle bought state if clicking the li or its span
    else {
        const li = e.target.closest("li");
        if (li) {
            li.classList.toggle("bought");
        }
    }
});