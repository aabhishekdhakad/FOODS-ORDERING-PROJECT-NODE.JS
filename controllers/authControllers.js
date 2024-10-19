const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');

//Register
const registercontroller = async (req, res) => {
  try {
    const { username, email, password, phone, address,answer } = req.body;
    //validation
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all Fields",
      });
    }

    // hashing
    var salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    //Check User
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already register please login",
      });
    }
    //Create New User
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//LOGIN
const loginControler = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email or Password",
      });
    }
    //Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //check user password | Compare Passwor
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        return res.status(500).send({
            success:false,
            message:"Invalid Crdentials",
        });
    }
    //Token
    const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {
        expiresIn:"7d",
    });

    user.password = undefined; //password filed not show

    res.status(200).send({
      success: true,
      message: "Login SuccessFully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

module.exports = { registercontroller, loginControler };
