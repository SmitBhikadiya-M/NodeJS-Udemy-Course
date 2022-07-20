const express = require('express');
const { isUserDataValid } = require('./utils/userValidator');
const { v4:uuid }  = require('uuid');
const redisDB = require('./redis/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/user/signup', async (req, res)=>{
    const data = req.body;

    if(!isUserDataValid(data.username, data.password)){
        return res.status(400).send({error: 'username or password is invalid!!'});
    }
    const redisUser = await redisDB.getUser(data.username);
    if(redisUser!=null){
        return res.status(400).send({error: 'User is already exits!!'});
    }
    const userId = uuid();
    const password = await bcrypt.hash(data.password, 8);
    const user = { username: data.username, password, userId}
    await redisDB.setUser(user)
    res.send(user);
});

app.post('/user/signin', async (req, res) => {
    const data = req.body;

    if(!isUserDataValid(data.username, data.password)){
        return res.status(400).send({error: 'username or password is incorrect!!'});
    }
    const redisUser = await redisDB.getUser(data.username);
    if(redisUser==null){
        return res.status(404).send({error: 'User is not found. do signup first!!'});
    }
    const user = JSON.parse(redisUser);
    const isMatch = await bcrypt.compare(data.password, user.password);
    if(!isMatch){
        return res.status(400).send({error: 'username or password is incorrect!!'});
    }
    user.token = jwt.sign({ userId: user.userId, username: user.username }, process.env.JWT_SECRET);
    res.send(user);
});

app.listen(port, async ()=>{
    await redisDB.connect();
    console.log(`Listening on port ${port}`);
});
