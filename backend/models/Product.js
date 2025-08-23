// File: models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    photo: String,
    price: Number,
    isBiddable: { type: Boolean, default: false },
    biddingEndTime: Date,
    tags: [String],
    currentBid: { type: Number, default: 0 },
    bids: [{ user: String, amount: Number, time: Date }],
    
    // --- ADD THIS FIELD ---
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // This links to your User model
        required: true
    }
});

module.exports = mongoose.model("Product", ProductSchema);