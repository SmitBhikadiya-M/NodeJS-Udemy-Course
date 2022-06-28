const doWorkCallback = (callback) => {
    setTimeout(()=>{
        callback( undefined, 'This is my result');
    },2000);
}

doWorkCallback((err, res) => {
    if(err) return console.log(err);
    console.log(res);
});