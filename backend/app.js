const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const errorMiddleware = require("./middlewares/error");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

// Import all Routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

// middleware to handle error
app.use(errorMiddleware);

module.exports = app;
