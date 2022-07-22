
const { validateData, sendDataToDataTracker } = require('../src/helper/validatorHelper');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const amqp = require('amqplib');

const client = redis.createClient();

const connectRedis = async () => {
    await client.connect();
}
connectRedis();

test('Should Validate Data', async () => {
    const data = await validateData({
        number: 10
    });
    expect(['Retried', 'Failed'].includes(data.category)).toBe(true);
});

test('Should send data to data tracker service', async () => {
    const tokenData = jwt.verify(process.env.AUTHTOKEN, process.env.JWT_SECRET);
    const userData = JSON.parse(await client.hGet('users', `users_${tokenData.username}`));
    const trackData = {
        authToken: process.env.AUTHTOKEN,
        category: 'direct',
        userId: tokenData.userId,
        requestCounter: userData.requestCounter+1,
        messages: [
            {
                message: "Vatsal"
            },
            {
                message: "Dendpara"
            }
        ],
    }
    const res = await sendDataToDataTracker(trackData);
    expect(res.data).toMatchObject({
        userMessage: trackData.messages,
    });
});

test("Should consume a published Data", async () => {
    const publishedData = [];
    const conn = await amqp.connect(process.env.AMQP_CONN);
    const channel = await conn.createChannel();
    await channel.assertQueue(process.env.RABBIT_ASSERT_QUEUE_NAME);
    await channel.consume(process.env.RABBIT_ASSERT_QUEUE_NAME, async (message) => {
        publishedData.push(JSON.parse(message.content.toString()));
    });
});