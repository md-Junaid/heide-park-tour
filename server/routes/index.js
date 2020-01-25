const express = require('express');
const router = express.Router();
const { getHomepage } = require('../controllers/homepage');
const { adminLogin, verifyToken } = require('../controllers/users');
const { getAllAttractionsPost, addAttractionsPost, editAttractionPost } = require('../controllers/attractions');

router.route('/')
  .get(getHomepage);

// Admin Login
router.route('/admin')
  .post(adminLogin);

// Attractions post routes
router.route('/attractions')
  .get(getAllAttractionsPost)
  .post(verifyToken, addAttractionsPost);

router.route('/attractions/:id')
  .put(verifyToken, editAttractionPost);

module.exports = router;
