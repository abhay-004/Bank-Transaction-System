const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const accountRouter = require("./routes/account.route");

const app = express();

//middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//api endpoints
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
module.exports = app;
