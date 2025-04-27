const mongoose = require('mongoose');

const TrustedContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  unlockAfterDays: { type: Number, required: true }, // Inactivity days after which unlock is allowed
  requestedAt: { type: Date }, // When the trusted contact requested access
});

module.exports = mongoose.model('TrustedContact', TrustedContactSchema);
