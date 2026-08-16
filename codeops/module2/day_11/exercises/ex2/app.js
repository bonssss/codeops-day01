 
// 2. Write save() and load() helpers that stringify an array to localStorage and parse it back, 
// guarding null and corrupt data with try / catch. 


function save(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`Data successfully saved under key: '${key}'`);
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

function load(key) {
    try {
        const stored = localStorage.getItem(key);
        // JSON.parse throws a SyntaxError if the string is invalid JSON (corrupt data)
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error(`Corrupt data found in localStorage for key '${key}':`, error);
        return null;
    }
}


// 1. Save an array
save('myArray', [1, 2, 3, 4, 5]);

// 2. Load the valid array
const newArr = load('myArray');
console.log("Loaded array:", newArr);

// 3. Test guarding against corrupt data
localStorage.setItem('corruptArray', '[1, 2, 3, ,,,'); // Invalid JSON
const corruptData = load('corruptArray');
console.log("Result of loading corrupt data:", corruptData); // Should output null