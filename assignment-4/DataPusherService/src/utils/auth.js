const jwt = require('jsonwebtoken');
const redis = require('redis');

const client = redis.createClient();

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if(!data){
            return res.status(400).send({error: 'Invalid Request'});
        }
        const user = JSON.parse(await client.hGet('users', `users_${data.username}`));
        if(!user){
            return res.status(400).send({error: 'Invalid Request'});
        }
        req.user = user;
        req.token = token;
        await client.hSet('users', `users_${data.username}`, JSON.stringify({ ...user, requestCounter: user.requestCounter+1 }));
        next();
    }catch(e){
        res.status(500).send({error: 'Internal Server Error!!'+e});
    }
}

module.exports = { client, auth };