const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
//get user info
const getUserController =async (req, res) => {
    // res.status(200).send("UserData");
    // console.log(req.body.id);

    try {
        //Finde user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message: "User not found"
            })
        }
        //hidden password
        user.password = undefined
        //resp
        res.status(200).send({
            success:true,
            message:"User get SuccessFully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get User API',
            error
        })
        
    }
    
};


//UPdate User
const updateUserControlloer =async (req, res) => {
    try {
        //finduser
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        //UPDATE
        const {username,address,phone} = req.body
        if(username) user.username = username
        if(address) user.address = address
        if(phone) user.phone = phone
        //Save User
        await user.save();
        res.status(200).send({
            success:true,
            message:"User updated Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error inUpdate API"
        });
        
    }
};



//Update password
const updatePasswordController = async( req, res) => {
    try {
      //Finde user
      const user = await userModel.findById({ _id: req.body.id });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
      //Get data from user
      const { oldPassword, newPassword } = req.body;
      if(!oldPassword || !newPassword) {
        return res.status(500).send({
          success: false,
          message: "Please provide old or new password",
        });
      }
      // //check user password | Compare Passwor
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid old password",
        });
      }
      //hashed password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt)
      user.password = hashedPassword
      await user.save();
      res.status(200).send({
        success:true,
        message:"Password Updated"
      })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Password Update API",
            error
        })
        
    }
};

//RESET PASSWORD
const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:" Please provide all fields"
            })
        }
        const user = await userModel.findOne({email,answer})
        //validation
        if(!user){
            return  res.status(500).send({
                success:false,
                message:"User not found or invalid answer"
            })
        }
        //hashed password
         var salt = bcrypt.genSaltSync(10);
         const hashedPassword = await bcrypt.hash(newPassword, salt)
         user.password = hashedPassword
         await user.save()
         res.status(200).send({
            success:true,
            message:'Password resest Successfully'
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            messagr:"error in password reset API",
            error
        })
        
    }
}

//DELETE ACCOUNT
const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Your Account has been Deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Delte profile API',
            error
        })
        
    }
}

module.exports = { getUserController,updateUserControlloer, updatePasswordController, resetPasswordController, deleteProfileController };