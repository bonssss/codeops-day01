// Build a signup form with labelled name and phone inputs, a submit button, and an error area. 
// On submit: show the errors (or success) and save valid data to localStorage using a helper. 


// 4. On submit, preventDefault, read the trimmed values, and validate: name at least two 
// characters, phone against the Ethiopian regex. 

// 5. Show a clear, specific message for the first problem found, using textContent. 
// 6. On success, save the entry to localStorage as JSON, clear the form, and on load show how 
// many people have signed up

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

const phoneNumberPattern = /^(?:\+251|0)(?:9|7)\d{8}$/;
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
        error.textContent = 'Success!';

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