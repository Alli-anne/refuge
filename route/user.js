// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');

// POST /join-waitlist
router.post('/join-waitlist', addUser);

module.exports = router;
