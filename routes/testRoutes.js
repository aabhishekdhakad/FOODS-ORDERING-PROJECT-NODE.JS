const express = require('express')
const { testUSerController } = require('../controllers/testController')

//router object
const router = express.Router()

//routes GET | POST | UPDATE |DELTE
router.get('/test-user', testUSerController )

//export
module.exports = router