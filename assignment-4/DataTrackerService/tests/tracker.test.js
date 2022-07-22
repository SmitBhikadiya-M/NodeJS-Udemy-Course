const { app } = require('../src/app');
const request = require('supertest');

test('Should Read Messages Without Filter', async ()=>{
    const res = await request(app).get('/messages').set('Authorization', `Bearer ${process.env.AUTHTOKEN}`).send().expect(200);
    console.log(res.body);
});


test('Should Read Messages With Category And Date Filter', async ()=>{
    const res = await request(app).get('/messages/?category=direct&date=07/22/2022').set('Authorization', `Bearer ${process.env.AUTHTOKEN}`).send().expect(200);
    console.log(res.body);
});

test('Should Read Messages With ', async ()=>{
    const res = await request(app).get('/messages/?text=Hello').set('Authorization', `Bearer ${process.env.AUTHTOKEN}`).send().expect(200);
    console.log(res.body);
});