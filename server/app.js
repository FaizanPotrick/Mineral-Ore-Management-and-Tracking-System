require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const session = require("express-session");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
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
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      //  secure: true,
    },
  })
);
app.use(require("./routes/Login.js"));
app.use(require("./routes/User.js"));
app.use(require("./routes/Dashboard/Officer.js"));
app.use(require("./routes/Dashboard/Organisation.js"));
app.use(require("./routes/Dashboard/Mine.js"));
app.use(require("./routes/GetData.js"));
app.use(require("./routes/List/Officers.js"));
app.use(require("./routes/List/Organisations.js"));
app.use(require("./routes/List/Mines.js"));
app.use(require("./routes/Registration/Officer.js"));
app.use(require("./routes/Registration/Region.js"));
app.use(require("./routes/Registration/Organisation.js"));
app.use(require("./routes/Registration/CEO.js"));
app.use(require("./routes/Registration/Mine.js"));
app.use(require("./routes/Registration/Manager.js"));
app.use(require("./routes/Registration/Transaction.js"));
app.use(require("./routes/MinedBatch.js"));
app.get("/api/authentication", async (req, res) => {
  if (req.session.type_of_user === req.cookies.type_of_user) {
    if (req.session._id === req.cookies._id) {
      return res.send(true);
    }
    if (req.session.type_of_user === "officer") {
      if (req.session.type_of_region === req.cookies.type_of_region) {
        return res.send(true);
      }
    }
  }
  res.send(false);
});
app.listen(process.env.PORT || 8000, () => {
  console.log("server is running on port 8000");
});
