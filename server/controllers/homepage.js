const Headline = require('../models/headline');

// @desc Get everything on homepage
// @route GET
// @access Public
exports.getHomepage = (req, res, next) => {
  try {
    Headline.find({}, 'headline', function (error, headline) {
      if (error) { console.error(error); }
      res.send({
        headline: headline
      });
    }).sort({_id:-1});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc Update welcome headline on the homepage
// @route PUT
// @access Admin
exports.updateWelcomeHeadline = async (req, res, next) => {
  try {
    Headline.findById(req.body.id, 'headline', function (error, headline) {
      if (error) { console.error(error); }

      headline.headline = req.body.headline;
      headline.save(function (error) {
        if (error) {
          console.log(error);
          res.send({
            success: false
          });
        }
        res.send({
          success: true
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
