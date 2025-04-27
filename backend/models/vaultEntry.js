const mongoose = require('mongoose');

const VaultEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Finance', 'Health', 'Personal', 'Notes'], required: true },
  encryptedContent: { type: String, required: true },
  autoDeleteAt: { type: Date }, // optional auto-delete date
  visibility: { type: String, enum: ['Private', 'SharedIfInactive', 'UnlockAfter'], default: 'Private' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VaultEntry', VaultEntrySchema);
