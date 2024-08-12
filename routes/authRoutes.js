const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Adjust this path if needed

// Define authentication routes
router.post('/register', authController.signup);
router.post('/login', authController.signin);

module.exports = router;
