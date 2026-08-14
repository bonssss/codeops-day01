
const city = "Addis Ababa";
localStorage.setItem("city", city);

const getCity = localStorage.getItem("city");
console.log(getCity);

// To remove an item from local storage:
localStorage.removeItem("city");

// To clear all items from local storage:
localStorage.clear();

let user = {
    name: "Bons",
    age: 20,
    email: "[EMAIL_ADDRESS]"
}

localStorage.setItem("user", JSON.stringify(user));
console.log(localStorage.getItem("user"));
const getUser = JSON.parse(localStorage.getItem("user"));
console.log(getUser);