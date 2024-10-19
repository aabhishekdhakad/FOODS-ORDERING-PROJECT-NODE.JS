const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodContoller, getAllFoodController, getSingleFoodController, getByFoodRestaurentController, updateFoodController, deleteFoodController, foodOrderPlacedController, orderStatusController } = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");


const router = express.Router();

//routes
//create Food
router.post('/create',authMiddleware,createFoodContoller)

//GET ALL FOOD
router.get('/getall',getAllFoodController)

//GET FOOD BY ID
router.get('/get/:id',getSingleFoodController)

//GET FOOD BY RESTAURENT
router.get('/getbyrestaurent/:id',getByFoodRestaurentController)

//UPDATE FOOD ||PUT
router.put('/update/:id',authMiddleware,updateFoodController)

//UPDATE FOOD ||PUT
router.delete('/delete/:id',authMiddleware, deleteFoodController)


//PLACE ORDER
router.post('/placeorder',authMiddleware,foodOrderPlacedController)


//ORDER STATUS
router.post('/orderstatus/:id',authMiddleware,adminMiddleware,orderStatusController)
module.exports = router;
