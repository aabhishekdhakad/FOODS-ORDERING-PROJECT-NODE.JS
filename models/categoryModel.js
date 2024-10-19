const mongoose = require("mongoose");

//Schema
const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Ffood-logo&psig=AOvVaw1qDoM_q3fmcFxgBwS-oF8a&ust=1729162618395000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOColbfekokDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("category", CategorySchema);
