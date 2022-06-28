// CRUD create, read, update & delete
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const id = new ObjectID();
console.log(id, id.id, id.id.length, id.id.toHaxString().length ,id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=>{
   if(error){ return console.log(error) };
   
   const db = client.db(databaseName);

    //    db.collection('users').insertOne({
    //     _id:id,
    //     name: 'Smit',
    //     age: 21
    //    }, (error, result)=>{
    //     if(error) return console.log("Unable to inset user!!");
    //         console.log(result.ops); //array of document
    //     });
        
    //     console.log(123);

    // const users = [
    //     {
    //         name: "Smit",
    //         age: 21
    //     },{
    //         name: "Ankit",
    //         age: 20
    //     }
    // ]

    // db.collection('users').insertMany(users, (error, result)=>{
    //     if(error) return console.log(error);

    //     console.log(result, result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: "Followed The sharing document's steps",
    //         completed: true
    //     },{
    //         description: "Will go to buy new clothes",
    //         completed: false
    //     },{
    //         description: "This is just for testing purpose",
    //         completed: true
    //     }
    // ], (error, result)=>{
    //     if(error) return console.log(error);
    //     console.log(result.ops);
    // });
 
});