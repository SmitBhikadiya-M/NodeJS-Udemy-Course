const amqp = require('amqplib');

const publishData = async (data) => {
    try{
        const conn = await amqp.connect(process.env.AMQP_CONN);
        const channel = await conn.createChannel();
        await channel.assertQueue(process.env.RABBIT_ASSERT_QUEUE_NAME);
        channel.sendToQueue(process.env.RABBIT_ASSERT_QUEUE_NAME, Buffer.from(JSON.stringify(data)));
        console.log("Data Publish Successfully!!!");
    }catch(e){
        throw new Error(e);
    }
}

module.exports = publishData;