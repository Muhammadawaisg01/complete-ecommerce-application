
const express = require('express');
const errorMiddleware = require("./middleware/error")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const orders = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", orders);


app.use(errorMiddleware);

module.exports = app;