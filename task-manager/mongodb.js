// CRUD create, read, update & delete
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=>{
   if(error){ return console.log(error) };
   
   const db = client.db(databaseName);

    // read data: findOne, find

    // findOne only fetched first match value
    // db.collection('users').findOne({ _id: new ObjectID('62baa4172beed58ec06cd299') }, (error, user)=>{
    //     if(error) return console.log(error);
    //     console.log(user);
    // })

    // find method returns cursor then we need to use to toArray and  count for getting actual data
    // const cursor = db.collection('users').find({ age: 27 });
    // cursor.toArray((error, users)=>{
    //     if(error) return console.log(error);
    //     console.log(users);
    // }); 
    // cursor.count((error, count)=>{
    //     if(error) return console.log(error);
    //     console.log(count);
    // });

    // task2: 
    
});