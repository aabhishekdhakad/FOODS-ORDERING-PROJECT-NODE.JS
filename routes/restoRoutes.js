const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createRestorentController, getAllRestaurentController, getRestaurentByIdController, deleteRestaurentController } = require("../controllers/restoController");

const router = express.Router();

//routes
// CRETAE RESTUARENT || POST
router.post("/create", authMiddleware, createRestorentController)

//GET ALL RESTORENT ||GET
router.get('/getall',getAllRestaurentController)

//Get RASTAURENT BY ID ||GET
router.get('/get/:id',getRestaurentByIdController)

//Delte Restorent || DELETE
router.delete('/deleted/:id',authMiddleware,deleteRestaurentController)

module.exports = router;
