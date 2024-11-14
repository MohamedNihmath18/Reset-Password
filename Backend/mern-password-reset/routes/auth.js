// routes/auth.js
const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword } = require('../controllers/authController');

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
