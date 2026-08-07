let student_name = "bonsa"
// console.log(`my name is ${name}`);


// let car_name = "Toyota";
// let model = "Vitz 2002";

// console.log(`My car is ${car_name} and its model is ${model}`);

let subjects_marks = [50,80,90]

let total=0;
for ( const subject of subjects_marks){
    total+=subject;
} 

console.log(`the total is ${total}`);

let avg = total/subjects_marks.length;
console.log(`the average is ${avg}`);


let grade;
if (avg > 90) {
    grade = "A";
} else if (avg > 80) {
    grade = "B";
} else if (avg > 70) {
    grade = "C";
} else if (avg > 60) {
    grade = "D";
} else {
    grade = "F";
}

    

console.log(`Hello ${student_name} Your total mark is ${total} and Your average is ${avg} and Your grade is ${grade} `);
