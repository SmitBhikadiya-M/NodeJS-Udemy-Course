// CRUD create, read, update & delete
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=>{
   if(error){ return console.log(error) };
   
   const db = client.db(databaseName);

   // update records: update || updateMany && updateOne 
   
   // db.collection('users').updateOne({
   //    _id: new ObjectID('62baa3be3b06e78e45c34efc')
   // } , {
   //    $set: {
   //       name: "Shailesh"
   //    },
   //    $inc: {
   //       age: 1
   //    }
   // }).then((res)=>{
   //    console.log(res);
   // }).catch((err)=>{
   //    console.log(err);
   // });

   db.collection('users').updateMany({ age: 27 }, {
      $set: {
         name: "Shahrukh"
      },
      $inc: {
         age: 10
      }
   }).then((res)=>{
      console.log(res);
   }).catch((err)=>{
      console.log(err);
   });


});