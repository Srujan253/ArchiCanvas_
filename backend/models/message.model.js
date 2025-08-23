const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    community: {
        type: mongoose.Schema.ObjectId,
        ref: 'Community',
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;