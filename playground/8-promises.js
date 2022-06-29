const add = (a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a+b);
        },2000);
    });
}

add(10,15).then((res)=>{
    add(res, 5).then((r)=>{
        console.log(r);
    }).catch((e)=>{
        console.log(e);
    });
}).catch((err)=>{
    console.log(err);
});

// Promise chaining: to avoid above complexity of coding

add(10,15).then((res)=>{
    return add(res,5);
}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});