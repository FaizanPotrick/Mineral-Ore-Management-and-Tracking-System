require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const url = process.env.DATABASE_URL;

try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}
app.use(express.json());
app.use(cors());
// app.use(require(path.join(__dirname, "routes/filename.js")));
app.listen(process.env.PORT || 8000, () => {
  console.log("Server is Listening on the Port...");
});
