var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var attractionsSchema = new Schema({
  markerId: Number,
  age: String,
  content: String,
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var Attractions = mongoose.model("Attractions", attractionsSchema);
module.exports = Attractions;
