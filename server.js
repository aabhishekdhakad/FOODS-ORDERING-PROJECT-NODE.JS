const express = require("express");
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require("./config/db");



//dotev configurtion
dotenv.config();

///DB connection 
connectDB()

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
// url => http://localhost:8080/
app.use('/api/v1/test',require("./routes/testRoutes"))
app.use('/api/v1/auth', require("./routes/authRoutes"))
app.use('/api/v1/user', require("./routes/userRoutes"))
app.use('/api/v1/restorent', require("./routes/restoRoutes"))
app.use('/api/v1/category',require('./routes/categoryRoutes'))
app.use('/api/v1/food', require('./routes/foodRoutes'))




app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food server app api base project </h1>");
});

///PORT
const PORT  = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.white.bgRed);
});
