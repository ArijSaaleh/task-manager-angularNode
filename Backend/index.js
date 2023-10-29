const express = require("express");

require("dotenv").config({ path: __dirname + "/.env" });

const cors = require("cors");
const cookieParser = require("cookie-parser");

const ApiError = require("./utils/apiError");
const globalError = require("./Middleware/errorMiddleware");

const connectDB = require("./database/connect");

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
  next(new ApiError("Can't find this route", 400));
});
// Global error handling middelware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
module.exports = app;

// Handling rejection outside express
//Events => wakt ysir rejection tsir emit lel event donc lezem listen => yraja3li callback function feha error (callback(err))
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Application shut down");
    process.exit(1);
  });
});
