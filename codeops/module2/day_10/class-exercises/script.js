
// console.log("Hello section one")

// setTimeout(() => {
//     console.log("hello section 3");
    
    
// }, 2000);

// console.log("Hello section 2");


// const pro = new Promise((resolve,reject)=>{
//     const x = true
//     if(x){
//         resolve(console.log("Hello solved"))
//     }
//     else{
//         reject(new Error("Failed"))
//     }
// })
// .then((res)=>{
//     console.log(res)
// })
// .catch((err)=>{
//     console.log(err)
// })


const order = new Promise((resolve, reject) => {
const ok = false;
if (ok) resolve({ id: 7, total: 240 });
else reject(new Error("kitchen closed"));
});

order.then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
})
.finally(()=>{
    console.log("Order is done")
})
