const request = require('supertest');
const { client, app } = require('../src/app');
const jwt = require('jsonwebtoken');

test('Should publish a Data', async () => {
    const dataOne = { data: "How Are You???" };
    const dataTwo = { data: [
        {
            message: "Hello, How Are You???"
        },
        {
            message: "Hello, How is it going???"
        }
    ] }
    await client.connect();
    const res = await request(app).post('/datapush').set('Authorization', `Bearer ${process.env.AUTHTOKEN}`).send(dataTwo).expect(200);
    const tokenData = jwt.verify(process.env.AUTHTOKEN, process.env.JWT_SECRET);
    expect(tokenData).toMatchObject({
        username: res.body.username
    });
    const user = JSON.parse(await client.hGet('users', `users_${tokenData.username}`));
    expect(user).not.toBe(null);
    expect(res.body).toMatchObject({
        username: user.username
    })
});