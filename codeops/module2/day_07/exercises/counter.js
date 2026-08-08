// 2. Write a makeCounter closure that returns a function incrementing a private count. Call it several
// times and, in a comment, explain why count stays private.

function counter(){
  let count = 0;
  return function(){
    count++;
    return count;
  }
}

const count = counter();
console.log(count());
console.log(count());
console.log(count());