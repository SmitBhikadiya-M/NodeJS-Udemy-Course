// CRUD create, read, update & delete
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=>{
   if(error){ return console.log(error) };
   
   const db = client.db(databaseName);

   // deleting data from database: deleteOne, deleteMany

   // db.collection("users").deleteOne({
   //    age: 37
   // }).then((res)=>{
   //    console.log(res);
   // }).catch((err)=>{
   //    console.log(err);
   // });

   db.collection("users").deleteMany({
      age: 37
   }).then((res)=>{
      console.log(res);
   }).catch((err)=>{
      console.log(err);
   });


});