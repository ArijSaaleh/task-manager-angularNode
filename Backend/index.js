const express = require("express");

require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./database/connect");
const { authMiddleware } = require("./Middleware/authMiddleware");
const taskRoute = require("./Routes/taskRoute");
const userRoute = require("./Routes/userRoute");

//express app
var app = express();
//database connection methods
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
//handling other routes not included
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find this route: ${req.originalUrl}`);
  next(err.message);
});
// Global error handling middelware
app.use((err, req, res, next) => {
  res.status(400).json({ err });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
module.exports = app;
