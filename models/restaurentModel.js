const mongoose = require("mongoose");

//Schema
const restoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, " Resturent title is Required"],
  },
  imageUrl: {
    type: String,
  },
  foods: [
    {
      type: { type: Array },
    },
  ],
  time: {
    type: String,
  },
  pickUp: {
    type: Boolean,
    default: true,
  },
  delivery: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  logoUrl: {
    type: String,
  },

  rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
  ratingCount: { type: String },
  code: {
    type: String,
  },
  coords: {
    id: { type: String },
    latitude: { type: Number },
    latitudeDelta: { type: Number },
    longitude: { type: Number },
    longitudeDelta: { type: Number },
    address: { type: String },
    title: { type: String },
  }
},{timestamps:true});

//export
module.exports = mongoose.model("restorent", restoSchema);
