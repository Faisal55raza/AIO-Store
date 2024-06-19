const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config({
    path:"backend/config/config.env"
})
app.use(cors({
    origin:'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true
}));




app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

 const product = require("./routes/productRoute");
 const user = require("./routes/userRoutes");
 const payment = require("./routes/paymentRoute");
 const orders = require("./routes/orderRoute")

 app.use(cookieParser());
 app.use("/api/v1",product);
 app.use("/api/v1",user);
 app.use("/api/v1",payment);
 app.use("/api/v1",orders);
 
 

 app.use(errorMiddleware);

module.exports = app;
