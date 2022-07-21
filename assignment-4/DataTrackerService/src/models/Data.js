const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userMessage: {
        type: String,
        required: true,
        trim: true
    },
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    requestId: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        validate(val){
            if(!['Direct', 'Retried', 'Failed'].includes(val)){
                throw new Error('Invalid Category Type!!');
            }
        }
    }
}, {
    timestamps: true
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;