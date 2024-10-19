const express = require('express')
const { registercontroller, loginControler } = require('../controllers/authControllers')

const router = express.Router()

//routes
//Register // POST
router.post('/register',registercontroller)

//Loitn || POST
router.post("/login", loginControler);

module.exports = router
