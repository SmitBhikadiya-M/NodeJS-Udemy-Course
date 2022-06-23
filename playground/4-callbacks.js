// challenge function 

const add = (a, b, fc) => {
    setTimeout(()=>{
        fc(a+b);
    }, 2000)
}

add(1, 4, (sum)=>{
    console.log(sum);
});

// 