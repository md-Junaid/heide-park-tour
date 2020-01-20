const express = require('express');
const router = express.Router();
const { getHomepage, updateWelcomeHeadline } = require('../controllers/homepage');
const { adminLogin, verifyToken } = require('../controllers/users');

router.route('/').get(getHomepage);

// Admin Login
router.route('/admin')
  .post(adminLogin);

// Homepage routes
router.route('/headline/:id')
  .put(verifyToken, updateWelcomeHeadline);

module.exports = router;
