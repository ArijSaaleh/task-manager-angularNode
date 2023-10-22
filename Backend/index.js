const express = require("express");
const { json } = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const {authMiddleware} = require("./Middleware/authMiddleware")
require('dotenv').config({ path: __dirname + '/.env' })

const connectDB = require("./database/connect")
const userRoute = require("./Routes/userRoute");
const taskRoute = require("./Routes/taskRoute");

connectDB();
var app = express();
//to be able to recognize ports between back & front
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:4200"],
    })
);
// exchanging cookies
app.use(cookieParser());
app.use(json());
app.use("/user", userRoute);
app.listen(8000);
module.exports=app;