require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");

//db call
connectDB();

app.listen(3000, () => {
  console.log("Server is running on PORT : 3000");
});
