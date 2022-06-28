const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", { 
    useNewUrlParser: true,
    useCreateIndex: true
});

//create modal for set-up validation for users collection
const User = mongoose.model('User', {
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0, 
        validate(value) {
            if(value < 0){
                throw new Error("Age must be positive number");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error("Email is invalid!!!!");
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            //if(value <= 6) throw new Error("Length must be grather than 6");
            if(value.toLowerCase().includes('password')) throw new Error("Password can't contain string 'password'");
        }
    }
});

const user = new User({
    name: "    SheilhEMP   ",
    email: "Sheilh.EMP@gmail.com",
    password: " hello pass@word"
});

user.save().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

// // create modal for set-up validation for users collection
// const Task = mongoose.model('Task', {
//     description: { type: String, required: true },
//     completed: { type: Boolean, required:true }
// });

// const task = new Task({
//     description: "This is mongoose.js example",
//     completed: true
// });

// task.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });


