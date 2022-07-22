const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userMessage: [{
        message: {
            type: String,
            required: true,
            trim: true
        }
    }],
    userId: {
        type: String,
        required: true,
    },
    requestId: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        validate(val){
            if(!['direct', 'retried', 'failed'].includes(val)){
                throw new Error('Invalid Category Type!!');
            }
        }
    }
}, {
    timestamps: true
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;