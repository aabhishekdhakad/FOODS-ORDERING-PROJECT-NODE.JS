const mongoose = require("mongoose");

//Schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Food title is require"],
    },
    description: {
      type: String,
      required: [true, " Food description is require"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Ffood-logo&psig=AOvVaw1qDoM_q3fmcFxgBwS-oF8a&ust=1729162618395000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOColbfekokDFQAAAAAdAAAAABAE",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailabe: {
      type: Boolean,
      default: true,
    },
    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restorent",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", foodSchema);
