const cron = require('node-cron');
const VaultEntry = require('../models/vaultEntry');

// Runs every day at midnight
const autoDeleteVaults = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Checking for vault entries to auto-delete...');
    try {
      const now = new Date();
      const deleted = await VaultEntry.deleteMany({ autoDeleteAt: { $lte: now } });
      console.log(`Auto-deleted ${deleted.deletedCount} vault entries`);
    } catch (err) {
      console.error('Error auto-deleting vaults:', err);
    }
  });
};

module.exports = autoDeleteVaults;
