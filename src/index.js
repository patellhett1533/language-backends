const express = require("express");
const connectToMongo = require("./db");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 5000;

// connected to database
connectToMongo();

// body parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const resultRoutes = require("./routes/result");

// desfine endpoint
app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", resultRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("server is listening on port", port);
});
