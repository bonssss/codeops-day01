
// 1. Select an <h1> and change its text with textContent, then add a CSS class to it with
// classList.toggle.
const header = document.querySelector('h1');

header.textContent = 'Welcome to my website';


header.classList.toggle('red');



// 2. Given an array of three Ethiopian city names, create an <li> for each with createElement and
// append them to a <ul>.
let cities = ['AddisAbaba', 'Bahirdar', 'Mekele', 'DireDawa', 'Gonder']


cities.forEach((city) => {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    document.getElementById('myList').appendChild(listItem);
})

// 3. Add a click listener to a button that logs event.target, then wrap the button in a div with its own
// listener and observe bubbling.

const btn = document.getElementById('btn');

btn.addEventListener('click', (event) => {
    // Log the event.target as requested
    console.log('Button listener fired! Target:', event.target);
})

const div = document.createElement('div');
document.body.appendChild(div);
div.appendChild(btn); 

div.addEventListener('click', (event) => {
    console.log('Div listener fired! Target:', event.target);
})