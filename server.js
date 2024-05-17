const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { authRouter } = require("./routes/auth");
const { reminderRoute } = require("./routes/reminder");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(reminderRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server Started", port);
});

try {
  mongoose.connect(process.env.URL);
  console.log("Connted to the database");
} catch (err) {
  console.log(err);
}
