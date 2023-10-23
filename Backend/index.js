const express = require("express");

require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./database/connect");
const { authMiddleware } = require("./Middleware/authMiddleware");
const taskRoute = require("./Routes/taskRoute");
const userRoute = require("./Routes/userRoute");

var app = express();
connectDB();

//to be able to recognize ports between back & front
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
// exchanging cookies
app.use(cookieParser());
//Parsing the encoded string of the body res to json format
app.use(express.json());

//Routes

app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/users", userRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
module.exports = app;
