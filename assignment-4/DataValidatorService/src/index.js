const amqp = require('amqplib');

const connect = async () => {
    const conn = await amqp.connect(process.env.AMQP_CONN);
    const channel = await conn.createChannel();
    await channel.assertQueue(process.env.RABBIT_ASSERT_QUEUE_NAME);
    await channel.consume(process.env.RABBIT_ASSERT_QUEUE_NAME, (message) => {
        const data = JSON.parse(message.content.toString());
        validateData(data);
    });
}

const validateData = async (data) => {
    if( data.number % 10 == 0 ){
        data.category = 'Retried';
        data.number = Math.floor((Math.random()*60)+1);
        await awaitTimeOut(4000, () => {
            if(data.number % 10 == 0){
                data.category = 'Failed';
            }
        });
    }else{
        data.category = 'Direct';
    }
    console.log(data);
}

const awaitTimeOut = (deley, cb) => {
    return new Promise( resolve => setTimeout( ()=>{ cb(); resolve();} , deley) );
}

connect();