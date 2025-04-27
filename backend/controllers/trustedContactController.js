const TrustedContact = require('../models/TrustedContact');
const VaultEntry = require('../models/vaultEntry');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. Set or Update Trusted Contact
exports.setTrustedContact = async (req, res) => {
  try {
    const { email, unlockAfterDays } = req.body;

    const existing = await TrustedContact.findOne({ userId: req.user.userId });

    if (existing) {
      existing.email = email;
      existing.unlockAfterDays = unlockAfterDays;
      await existing.save();
      return res.json({ message: 'Trusted contact updated successfully' });
    }

    const trustedContact = new TrustedContact({
      userId: req.user.userId,
      email,
      unlockAfterDays
    });

    await trustedContact.save();
    res.status(201).json({ message: 'Trusted contact set successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Trusted Contact Access Request (simulate request)
exports.trustedContactRequestAccess = async (req, res) => {
  try {
    const { userEmail } = req.body; // The user whose vault is being accessed

    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const trustedContact = await TrustedContact.findOne({ userId: user._id });
    if (!trustedContact) return res.status(404).json({ message: 'Trusted contact not set' });

    // Set request date
    trustedContact.requestedAt = new Date();
    await trustedContact.save();

    res.json({ message: 'Request to access vault recorded. Admin will verify inactivity.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Trusted Contact Tries to Unlock Vault
exports.trustedContactUnlock = async (req, res) => {
    try {
      const { userEmail } = req.body; // email of vault owner
      const user = await User.findOne({ email: userEmail });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const trustedContact = await TrustedContact.findOne({ userId: user._id });
      if (!trustedContact) return res.status(404).json({ message: 'Trusted contact not set' });
  
      const now = new Date();
      const lastLogin = new Date(user.lastLoginAt);
      const diffDays = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24)); // diff in days
  
      if (diffDays < trustedContact.unlockAfterDays) {
        return res.status(403).json({ message: `Cannot unlock yet. User was active ${diffDays} days ago.` });
      }
  
      // Otherwise, unlock vault entries
      const entries = await VaultEntry.find({ userId: user._id });
  
      res.json({
        message: `Unlocked ${entries.length} vault entries.`,
        entries // You might want to send decrypted data here, if you encrypted earlier
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
