var mongoose = require("mongoose");
var config = require("./mongodb.json");

const connectDB = async () => {
  // mongodb connection string
  const con = await mongoose.connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected`);
};
module.exports = connectDB;
