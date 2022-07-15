const  amqp = require('amqplib');

async function connect(){
    try{

        // TCP Connection
        const connection = await amqp.connect("amqp://localhost:5672");

        // Created Channel
        const channel = await connection.createChannel();

        // Created Jobs Queue
        const result = await channel.assertQueue("jobs");

        // Send Data To Jobs Queue
        const msg = { number: process.argv[2] };
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));

        console.log(`Job sent Successfully: ${msg.number}`);

    }catch(err){
        console.log(err);
    }
}

connect();