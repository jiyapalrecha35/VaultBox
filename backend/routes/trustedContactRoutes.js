const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { setTrustedContact, trustedContactRequestAccess } = require('../controllers/trustedContactController');
const { trustedContactUnlock } = require('../controllers/trustedContactController');

// Only the owner can set a trusted contact
router.post('/set', authMiddleware, setTrustedContact);

// Simulated endpoint for trusted contact to request unlock
router.post('/request-access', trustedContactRequestAccess);

// trusted contact tries to unlock vault after inactivity
router.post('/unlock', trustedContactUnlock);

module.exports = router;
