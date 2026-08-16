

// --- LocalStorage Helpers ---
function save(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

function get(key) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error("Error loading data:", error);
        return null;
    }
}

const form = document.querySelector('form');
const error = document.querySelector('#error');
const name = document.querySelector('#name');
const phone = document.querySelector('#phone');

const phoneNumberPattern = /^(?:\+251|0)9\d{8}$/;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameValue = name.value.trim();
    const phoneValue = phone.value.trim();
    
    if (nameValue === '' || phoneValue === '') {
        error.textContent = 'Please fill in all the fields.';
    } else if (nameValue.length < 2) {
        error.textContent = 'Name must be at least two characters.';
    } else if (!phoneNumberPattern.test(phoneValue)) {
        error.textContent = 'Please enter a valid phone number.';
    } else {
        error.textContent = ''; // Clear errors on success

        let people = get('people') || [];
        people.push({ name: nameValue, phone: phoneValue });
        save('people', people);
        form.reset();
        
        // Update the count immediately on screen
        const countElement = document.querySelector('#count');
        countElement.textContent = `${people.length} people have signed up.`;
    }
})
// 7. Load on startup and show total count (e.g., “5 people have signed up.”)

const people = get('people') || [];
const count = people.length;
const countElement = document.querySelector('#count');
countElement.textContent = `${count} people have signed up.`;