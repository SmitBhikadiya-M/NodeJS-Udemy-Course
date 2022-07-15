const  amqp = require('amqplib');

async function connect(){
    try{

        // TCP Connection with Server
        const connection = await amqp.connect("amqp://localhost:5672");

        // Created Channel
        const channel = await connection.createChannel();

        // Created Jobs Queue
        const result = await channel.assertQueue("jobs");

        await channel.consume("jobs", message => {

            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`);

            if(input.number == 10){
                channel.ack(message);
            }
        })
        
        console.log("Waiting For Message...");



    }catch(err){
        console.log(err);
    }
}

connect();