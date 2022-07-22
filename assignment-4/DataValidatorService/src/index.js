const amqp = require('amqplib');
const { validateData, sendDataToDataTracker } = require('./helper/validatorHelper');

const connect = async () => {
    const conn = await amqp.connect(process.env.AMQP_CONN);
    const channel = await conn.createChannel();
    await channel.assertQueue(process.env.RABBIT_ASSERT_QUEUE_NAME);
    await channel.consume(process.env.RABBIT_ASSERT_QUEUE_NAME, async (message) => {
        let data = JSON.parse(message.content.toString());
        data = await validateData(data);
        try{
            const res = await sendDataToDataTracker(data);
            console.log("Send Data To Data Tracker Service!!");
        }catch(e){
            console.error(e.message);
        }
    });
}

connect();