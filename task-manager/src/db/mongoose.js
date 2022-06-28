const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", { 
    useNewUrlParser: true,
    useCreateIndex: true
});

// create modal for set-up validation for users collection
const Users = mongoose.model('users', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const smit = new Users({
    name: "Smit",
    age: 100
}); 

smit.save().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(1,err);
});



