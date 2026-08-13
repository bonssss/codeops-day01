
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


// 4. Build a list of items each with a delete button, and remove any item using a single delegated
// listener on the parent.

const list = document.getElementById('myList2');

const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
})

list.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.target.parentElement.remove();
    }
})

// 5. Add a form with one text input; on submit, preventDefault, read input.value, append it to a list,
// and clear the field.

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
  const name = document.getElementById('name');
  const listItem = document.createElement('li');
  listItem.textContent = name.value;
  document.getElementById('myList').appendChild(listItem);
  name.value = '';
  name.focus();
})
