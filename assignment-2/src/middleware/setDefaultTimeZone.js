const setDefaultTimeZone = (req, res, next) => {
    const dataKeys = Object.keys(req.body);

    dataKeys.forEach((key)=>{
        if(key==='expiryTime' || key==='manufacturingTime'){
            if(new Date(req.body[key]) == 'Invalid Date' && isNaN(new Date(req.body[key]))){
                return res.status(400).send({error: "Invalid Date Format!!!"});
            }
            req.body[key] = new Date(req.body[key]);
        }
    });
    console.log(req.body);
    next();
}

module.exports = setDefaultTimeZone;