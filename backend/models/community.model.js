const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    // ... (name, description, creator fields remain the same)
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    memberCount: { type: Number, default: 1 },
    pendingMembers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending' // New communities will always start as pending
    }
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;