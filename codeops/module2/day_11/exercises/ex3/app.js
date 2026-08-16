// Build a signup form with labelled name and phone inputs, a submit button, and an error area. 
// On submit: show the errors (or success) and save valid data to localStorage using a helper. 

const form = document.querySelector('form');
const error = document.querySelector('#error');
const name = document.querySelector('#name');
const phone = document.querySelector('#phone');

const phoneNumberPattern = /^(?:\+251|0)(?:9|7)\d{8}$/;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameValue = name.value;
    const phoneValue = phone.value;
    
    if (nameValue === '' || phoneValue === '') {
        error.textContent = 'Please fill in all the fields.';
    } else if (!phoneNumberPattern.test(phoneValue)) {
        error.textContent = 'Please enter a valid phone number.';
    } else {
        error.textContent = 'Success!';
        save('name', nameValue);
        save('phone', phoneValue);
    }
})