const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "user name is require"],
  },
  email: {
    type: String,
    require: [true, "user email is require"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "password is require"],
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    require: [true, "Phone no. is require"],
  },
  usertype: {
    type: String,
    require: [true, "user type is require"],
    default: "client",
    enum: ["client", "admin", "vendor", "driver"],
  },
  profile: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile-image&psig=AOvVaw34Rh58hLkngKgF46ToH-cz&ust=1729022360336000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjB__bTjokDFQAAAAAdAAAAABAE",
  },
  answer: {
    type:String,
    require:[true, "Answer is required"],
  }

},{timestamps:true})

//export
module.exports = mongoose.model('user',userSchema)