const mongoose = require("mongoose");

//Schema
const ordersSchema = new mongoose.Schema(
  {
    foods: [
      {type: mongoose.Schema.Types.ObjectId,
      ref: 'Foods',}
    ],
    payment:{},
    buyer:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status:{
        type: String,
        enum:['preparing', 'prepare', 'on the way','delivere'],
        default : 'preparing'
    }
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", ordersSchema);
