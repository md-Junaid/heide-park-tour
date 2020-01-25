const Attractions = require('../models/attractions');

exports.getAllAttractionsPost = async (req, res, next) => {
  try {
    Attractions.find({}, function (error, allPosts) {
      if (error) { console.error(error); }
      res.send({
        allPosts: allPosts
      });
    }).sort({ _id: -1 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addAttractionsPost = (req, res, next) => {
  try {
    var markerId = req.body.markerId;
    var level = req.body.level;
    var content = req.body.content;
    var thumbnail = req.body.thumbnail;

    console.log("received: ", req.body);

    var newPost = new Attractions({
      markerId: markerId,
      level: level,
      content: content,
      thumbnail: thumbnail
    });

    newPost.save(function (error) {
      if (error) {
        console.log(error);
        return res.status(400).json({ "error": true, "message": 'Failed to added the post' })
      } else {
        return res.status(201).json({ "message": 'Attraction post added successfully.' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}
