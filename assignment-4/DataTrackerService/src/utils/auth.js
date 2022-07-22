const jwt = require('jsonwebtoken');

const auth = async ( req, res, next ) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if(!data || !data.username || !data.userId){
            throw new Error();
        }
        req.userId = data.userId;
        next();
    }catch(e){
        res.status(500).send(e);
    }
}

module.exports = auth;