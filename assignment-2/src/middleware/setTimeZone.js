const setTimeZone = (req, res, next) => {
    const dataKeys = Object.keys(req.body);
    dataKeys.forEach((key)=>{
        if(key==='expiryTime' || key==='manufacturingTime'){
            req.body[key] = new Date(req.body[key]);
        }
    });
    next();
}

module.exports = setTimeZone;