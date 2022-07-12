const mongoose = require("mongoose");

require("dotenv").config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.swuan.mongodb.net/test?retryWrites=true&w=majority`;

const connexion = mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

module.exports = connexion;
