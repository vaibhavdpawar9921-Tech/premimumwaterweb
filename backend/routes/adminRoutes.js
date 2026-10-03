const express = require('express');
const router = express.Router();
const { adminLogin, getAdminProfile } = require('../controllers/adminController');

router.post('/login', adminLogin);
router.get('/me', getAdminProfile);

module.exports = router;
