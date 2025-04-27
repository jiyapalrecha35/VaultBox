const VaultEntry = require('../models/vaultEntry');
const CryptoJS = require('crypto-js');

// Helper to encrypt content
const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, process.env.JWT_SECRET).toString();
};

// Helper to decrypt content
const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, process.env.JWT_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

exports.createEntry = async (req, res) => {
  try {
    const { title, category, content, autoDeleteAt, visibility } = req.body;

    const encryptedContent = encrypt(content);

    const entry = new VaultEntry({
      userId: req.user.userId,
      title,
      category,
      encryptedContent,
      autoDeleteAt,
      visibility
    });

    await entry.save();
    res.status(201).json({ message: 'Vault entry created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const entries = await VaultEntry.find({ userId: req.user.userId });

    const decryptedEntries = entries.map(entry => ({
      ...entry._doc,
      content: decrypt(entry.encryptedContent)
    }));

    res.json(decryptedEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { title, category, content, autoDeleteAt, visibility } = req.body;

    const updatedFields = {
      title,
      category,
      encryptedContent: encrypt(content),
      autoDeleteAt,
      visibility
    };

    const entry = await VaultEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updatedFields,
      { new: true }
    );

    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    res.json({ message: 'Vault entry updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entry = await VaultEntry.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    res.json({ message: 'Vault entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
