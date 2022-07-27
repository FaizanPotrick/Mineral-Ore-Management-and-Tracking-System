require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
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
app.use(fileupload());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(require("./routes/registration/Miner.js"));
app.use(require("./routes/registration/Officer.js"));
app.use(require("./routes/registration/Organization.js"));
app.use(require("./routes/registration/Region.js"));
app.use(require("./routes/Login.js"));
app.use(require("./routes/miner/ores"));
app.listen(process.env.PORT || 8000);
