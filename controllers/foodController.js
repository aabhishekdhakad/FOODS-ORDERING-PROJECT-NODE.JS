const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//CREATE FOOD
const createFoodContoller = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurent,
      rating,
    } = req.body;
    // validatiion
    if (!title || !description || !price || !restaurent) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurent,
      rating,
    });
    await newFood.save();
    res.status(200).send({
      success: true,
      message: "New food item created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error on food create API",
      error,
    });
  }
};

//GET ALL
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: true,
        message: "No food item was Found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Get All Foods API",
      error,
    });
  }
};

//GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide ID",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found with this ID",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in getv Single Food API",
      error,
    });
  }
};

//GET FOOD BY RESTAURENT

const getByFoodRestaurentController = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "Please provide ID",
      });
    }
    const food = await foodModel.find({ restaurent: restaurentId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found with this ID",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in getv Single Food API",
      error,
    });
  }
};

//UPDATED FOOD
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id was found",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurent,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailabe,
        restaurent,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item is updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in FOOD UPDATE API",
      error,
    });
  }
};

//FOOD DELETE
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Provide Fodd Id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food Not Found",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item is Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Food Delete API",
      error,
    });
  }
};

//ORDER PLACE
const foodOrderPlacedController = async (req, res) => {
  try {
    const { cart } = req.body;
    //validation
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please add cart or payment method",
      });
    }
    let total = 0;
    //Calculate
    cart.map((i) => {
      total += i.price;
    });
    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(200).send({
      success: true,
      message: "Order place SuccessFully ",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order API",
      error,
    });
  }
};

//CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Order",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order Status Change API",
    });
  }
};

module.exports = {
  createFoodContoller,
  getAllFoodController,
  getSingleFoodController,
  getByFoodRestaurentController,
  updateFoodController,
  deleteFoodController,
  foodOrderPlacedController,
  orderStatusController,
};
