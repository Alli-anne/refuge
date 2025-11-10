// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { addUser } = require('../controller/userController');

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new user to the waitlist
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - consent
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               source:
 *                 type: string
 *               reason:
 *                 type: string
 *               consent:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

// POST /join-waitlist
router.post('/join-waitlist', addUser);
router.get("/join-waitlist", addUser);

module.exports = router;
