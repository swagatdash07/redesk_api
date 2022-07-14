const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

// DB Connection
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true})
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("Database is not connected");
  });

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Basic Testing Purposes
app.get("/", (req, res) => {
 return res.json({message:"Hello World!"});
});

// Import Routes
const authRoutes = require("./routes/auth");

// Use Routes
app.use("/api", authRoutes);

// PORT
const port = process.env.PORT || 8002;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
