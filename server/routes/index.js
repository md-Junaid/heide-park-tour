const express = require('express');
const router = express.Router();
const { getHomepage } = require('../controllers/homepage');
const { adminLogin, verifyToken } = require('../controllers/users');
const { getAllAttractionsPost, addAttractionsPost } = require('../controllers/attractions');

router.route('/')
  .get(getHomepage);

// Admin Login
router.route('/admin')
  .post(adminLogin);

// Attractions post routes
router.route('/attractions')
  .get(getAllAttractionsPost)
  .post(verifyToken, addAttractionsPost);

module.exports = router;
