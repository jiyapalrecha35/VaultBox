const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  trustedContact: {
    email: { type: String },
    unlockAfterDays: { type: Number }
  },
  lastLogin: { type: Date, default: Date.now },
  lastLoginAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', UserSchema);
