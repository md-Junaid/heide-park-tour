var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

var markersSchema = new Schema({
  type: String,
  id: Number,
  tags: {
    name: String,
    tourism: String,
    wheelchair: String,
    attraction: String,
    information: String,
    amenity: String,
    cuisine: String,
    website: String,
    leisure: String,
    shop: String,
    barrier: String,
    fee: String,
    capacity: String,
    operator: String
  },
  geometry: GeoSchema
});

var Markers = mongoose.model("Markers", markersSchema);
module.exports = Markers;
