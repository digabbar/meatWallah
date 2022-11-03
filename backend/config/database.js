const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((con) => {
    console.log("mongoDB connected");
  });
};

module.exports = connectDatabase;
