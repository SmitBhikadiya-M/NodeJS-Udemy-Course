
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/users');
const { setupDB, userOne, userOneId, userTwo, userTwoId } = require('./requirements/db');

beforeEach(setupDB);

test('Should User Signup!!', async ()=>{
    const user = {
        name: "Dummy Name",
        email: "dummy@7648.com",
        password: "Dummy@123"
    }
    const res = await request(app).post('/users').send(user).expect(201);

    const userRes = await User.findOne({_id:res.body.user._id});
    expect(userRes).toMatchObject({
        name: user.name,
        email: user.email
    });
});

test('Should User not signup!!!', async ()=>{
    
});

test('Should User Login!!', async ()=>{
    const res = await request(app)
        .post('/users/login')
        .send({
                email: userOne.email,
                password: userOne.password
            })
        .expect(200);
});

test('Should User Update!!', ()=>{
    
});

test('Should User Logout!!', ()=>{
    
});

test('Should User AllLogout!!', ()=>{
    
});