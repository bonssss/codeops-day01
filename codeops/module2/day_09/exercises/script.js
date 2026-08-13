
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
