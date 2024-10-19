const express = require("express");
const { getUserController, updateUserControlloer, updatePasswordController, resetPasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//Register // GET
router.get("/getUser",authMiddleware, getUserController);

//UPDATE Profile
router.put('/updateuser',authMiddleware,updateUserControlloer)

//Update Password
router.post('/updatepassword',authMiddleware, updatePasswordController)

//Reset Password
router.post('/resetpassword', authMiddleware, resetPasswordController)

// DElete user
router.delete('/deleteuser/:id',authMiddleware,deleteProfileController)

module.exports = router;
