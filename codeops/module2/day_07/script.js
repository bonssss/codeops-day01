// let num1 ,num2,result;
// function sum(num1, num2) {
//     return num1 + num2;
// }

// result = sum(4, 5);
// console.log(`The result is: ${result}`);
// document.getElementById('result').textContent = result;

function calculateSum() {
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let result = num1 + num2;
    console.log(`The result is ${result}`);
    
    document.getElementById('result').textContent = "The result is: " + result;
}

// hello accepts VAT as first parameter: hello(vat, ...values).

function hello(vat = 0.15, ...values) {
    // if (typeof vat === 'number' && vat > 1) {
    //     values = [vat, ...values];
    //     vat = 0.15;
    // }
    let sum = 0;
    for (const value of values) {
        sum += Number(value) || 0;
    }
    return sum * vat;
}

// Examples:
console.log(hello(0.2, 10, 10, 10)); 
console.log(hello(10, 10, 10)); 