var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  headline: String,
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var Headline = mongoose.model("Headline", HeadlineSchema);
module.exports = Headline;
