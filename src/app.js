const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();

//middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//api endpoints
app.use("/api/auth", authRouter);
module.exports = app;
