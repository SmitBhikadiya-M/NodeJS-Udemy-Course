const doWorkCallback = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //resolve("This is my result");
        reject("This is my error");
    },2000);
});

doWorkCallback.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

console.log("123");