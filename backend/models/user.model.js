// File: models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please provide your full name.'] },
    email: { type: String, required: [true, 'Please provide your email.'], unique: true, lowercase: true },
    password: { type: String, required: [true, 'Please provide a password.'], minlength: 8, select: false },
    role: { type: String, enum: ['artist', 'buyer', 'admin'], required: true },
    specialization: { type: String, required: function() { return this.role === 'artist'; } },
    bio: { type: String },
    interestedIn: { type: [String] },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: function() { return this.role === 'artist' ? 'pending' : 'approved'; }
    },
    artworkCount: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    passwordChangedAt: Date
}, { timestamps: true });
// Badge logic helper
userSchema.methods.updateBadges = function() {
    const count = this.artworkCount || 0;
    const earned = [];
    if (count >= 3) earned.push('Novice Artist');
    if (count >= 5) earned.push('Rising Star');
    if (count >= 10) earned.push('Master Creator');
    // Add more badges as needed
    this.badges = earned;
    return this.badges;
};

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Add passwordChangedAt when password is modified
userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000; // Subtract 1s to ensure token is created after password change
    next();
});

// Instance method to compare passwords
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password was changed after token was issued
userSchema.methods.isPasswordChanged = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;