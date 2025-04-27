const express = require('express');
const router = express.Router();
const { createEntry, getEntries, updateEntry, deleteEntry } = require('../controllers/vaultController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Protected routes
router.post('/', authMiddleware, createEntry);
router.get('/', authMiddleware, getEntries);
router.put('/:id', authMiddleware, updateEntry);
router.delete('/:id', authMiddleware, deleteEntry);

module.exports = router;
