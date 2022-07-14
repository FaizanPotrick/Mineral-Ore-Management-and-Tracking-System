require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const url = process.env.DATABASE_URL;
try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}
app.use(express.json());
app.use(cors());
app.use(require("./routes/miner/credentials.js"));
app.use(require("./routes/miner/ores.js"));
app.listen(process.env.PORT || 8000);
