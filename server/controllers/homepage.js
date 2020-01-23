const Markers = require('../models/markers');

// @desc Send GeoJson Markers on homepage Map
// @route GET
// @access Public
exports.getHomepage = (req, res, next) => {
  try {
    // Headline.find({}, 'headline', function (error, headline) {
    //   if (error) { console.error(error); }
    //   res.send({
    //     headline: headline
    //   });
    // }).sort({_id:-1});
    Markers.find({}, function (error, markers) {
      if (error) { 
        console.log(error);
        res.status(404).json({ error: true, message: "GeoJson markers not found!"});
      } else {
        res.send({
          markers: markers
        });
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
