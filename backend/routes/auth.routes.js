const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {isAuthenticatedUser} =  require("../middleware/auth");
// Defines the POST endpoint for registration
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/my-badges', isAuthenticatedUser, authController.getMyBadges);

// You would also have your login route here
// router.post('/login', authController.login);

module.exports = router;