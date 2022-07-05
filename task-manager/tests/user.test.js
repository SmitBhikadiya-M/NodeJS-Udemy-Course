const { User, userOneId, userOne, setupDatabase } = require('./fixtures/db');
const request = require('supertest');
const app = require('../src/app');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {

    const userSignup = {
        name: 'Smit',
        email: 'sdbhikadiya7648@gmail.com',
        password: 'MyPass@123'
    }

    const response = await request(app).post('/users').send(userSignup).expect(201);


    // checking user inserted successfully in db
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // checking about the response
    expect(response.body).toMatchObject({
        user:{
            name: 'Smit',
            email: 'sdbhikadiya7648@gmail.com'
        },
        token: user.tokens[0].token
    });
});

test('Should login existing user', async ()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    
    const user = await User.findById(response.body.user._id);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login non existent user", async ()=>{
    await request(app)
        .post('/users/login')
        .send({
                email: 'sdbhikadiya@gmail.com',
                password: '12Sdjkf@12'
            })
        .expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('should not get profile for unauthorized user', async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete account for user', async ()=>{
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(response.body._id);
    expect(user).toBeNull();
})
   
test('Should not delete account for user', async ()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});

test('Should Upload avatar image',async ()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile.png')
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});


test('Should update Valid User Fields', async ()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Ankit Chauhan'
        })
        .expect(200)
    const user = await User.findById(userOneId);
    expect(user.name).toBe('Ankit Chauhan');
});

test('Should not update invalid User Fields', async ()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Amsterdam'
        })
        .expect(400)
});
