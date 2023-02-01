require("dotenv").config();
require("events").EventEmitter.prototype._maxListeners = 100;

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const session = require("express-session");

const app = express();

try {
  mongoose.connect(process.env.DATABASE_URL, {
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
app.use(
  session({
    secret: "don't tell anyone",
    resave: false,
    saveUninitialized: true,
    cookie: {
      //  secure: true,
    },
  })
);

app.get("/api/authentication", async (req, res) => {
  if (req.session.type_of_user === req.cookies.type_of_user) {
    if (req.session._id === req.cookies._id) {
      return res.send(true);
    }
    if (req.session.type_of_user === "government") {
      if (req.session.type_of_region === req.cookies.type_of_region) {
        return res.send(true);
      }
    }
  }
  res.send(false);
});
app.get("/api/logout", async (req, res) => {
  req.session.destroy();
  res
    .clearCookie("connect.sid")
    .clearCookie("type_of_user")
    .clearCookie("type_of_region")
    .clearCookie("_id")
    .status(200)
    .end();
});
app.use(require("./routes/User"));
app.use(require("./routes/Registration"));
app.use(require("./routes/Registration/Batch"));
app.use(require("./routes/Registration/Transaction"));
app.use(require("./routes/Dashboard"));
app.use(require("./routes/Dashboard/Government"));
app.use(require("./routes/List.js"));
app.use(require("./routes/Verify.js"));

app.listen(process.env.PORT || 8000);
