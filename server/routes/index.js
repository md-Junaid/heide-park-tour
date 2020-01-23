const express = require('express');
const router = express.Router();
const { getHomepage, updateWelcomeHeadline } = require('../controllers/homepage');
const { adminLogin, verifyToken } = require('../controllers/users');
const { getAllAttractionsPost, addAttractionsPost } = require('../controllers/attractions');

router.route('/').get(getHomepage);

// Admin Login
router.route('/admin')
  .post(adminLogin);

// Homepage routes
router.route('/headline/:id')
  .put(verifyToken, updateWelcomeHeadline);

// Attractions post routes
router.route('/attractions')
  .get(getAllAttractionsPost)
  .post(verifyToken, addAttractionsPost);

module.exports = router;
