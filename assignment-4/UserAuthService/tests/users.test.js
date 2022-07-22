const request = require('supertest');
const { app } = require('../src/app');
const bcrypt = require('bcrypt');
const { v4:uuid }  = require('uuid');
const jwt = require('jsonwebtoken');
const { connect, getUser, setUser, delUser } = require('../src/redis/user');
const { storeToken } = require('./helper/storeData');

const hashPassword = async ()=>{
    return await bcrypt.hash('Yash@123', 8);
}
const connectRedis = async ()=>{
    await connect();
}
connectRedis();

const userOne = {
    username: "SmitBhikadiya",
    password: "Smit@123"
}

beforeEach( async ()=>{
    await delUser(userOne.username);
});

test('Should User SignUp', async ()=>{
    const res = await request(app).post('/user/signup').send(userOne).expect(200);
    const user = JSON.parse(await getUser(res.body.username));
    expect(user).toMatchObject({
        username: userOne.username
    });
});

test('Should User Signin', async ()=>{
    const password = await hashPassword();
    const userId  = uuid();
    const userTwo = {
        username: "YashKalathiya",
        password,
        userId
    }
    await setUser(userTwo)
    const res = await request(app).post('/user/signin').send( { username: userTwo.username, password: 'Yash@123' } ).expect(200);
    const resData = res.body;
    const tokenData = jwt.verify(resData.token, process.env.JWT_SECRET);
    expect(tokenData).toMatchObject({
        username: userTwo.username,
        userId
    });
    expect(storeToken(resData.token)).toBe(true);
});