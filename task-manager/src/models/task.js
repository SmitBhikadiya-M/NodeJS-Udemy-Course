const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

taskSchema.pre('findByIdAndUpdate', function( next ){
    const task = this;

    console.log("Task Middleware working..");

    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;