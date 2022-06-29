const add = (a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(a < 0 || b < 0){
                reject("Accept only positive numbers");
            }else{
                resolve(a+b);
            }
        },2000);
    });
}

const dowork = async () => {
    console.log(1);
    const sum = await add(1, 99);
    console.log(2);
    const sum1 = await add(sum, -1);
    console.log(3);
    const sum2 = await add(sum1, 1);
    return sum2;
}

dowork().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});