const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");

const router = express.Router();

//routes
//cretate Category
router.post('/create',authMiddleware,createCategoryController)

//GET ALL CATEGORY
router.get('/getall',getAllController)

//UPDATE CATEGORY || PUT
router.put('/update/:id',authMiddleware,updateCategoryController)

//DELETE CATEGORY
router.delete('/delete/:id',authMiddleware, deleteCategoryController)

module.exports = router;
