const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");
// Setting up config file
dotenv.config({ path: "backend/config/config.env" });
// handle unCaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exceptions");
  process.exit();
});
// connecting to database
connectDatabase();
// setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//handle unhandled Promice rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promice Rejection");
  process.exit();
});
