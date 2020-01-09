const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/login', authController.loginView);
router.post('/login', authController.performLogin);
router.post('/logout', authController.performLogout);
router.get('/signup', authController.signUpView);
router.post('/signup', authController.performSignUp);

module.exports = router;