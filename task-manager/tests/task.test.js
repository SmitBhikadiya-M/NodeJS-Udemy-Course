const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { 
    User, 
    userOneId,
    userTwoId, 
    userOne, 
    userTwo,
    taskOne,
    taskTwo,
    taskThird,
    setupDatabase,  } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user',async () => {
    const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Hello Task From Test'
        })
        .expect(201)
});

test('Should Fetch User tasks', async () => {
    const res = await request(app)
                    .get('/tasks')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send()
                    .expect(200)
    expect(res.body.length).toEqual(2)
});

test('Should not delete other users tasks', async ()=>{
    const res = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})