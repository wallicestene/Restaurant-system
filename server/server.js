const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// initialisizing the app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// connecting to mongoDB Database
mongoose
  .connect("mongodb://0.0.0.0:27017/restaurant-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      console.log("Connected to the database");
    });
  })
  .catch((err) => {
    console.error("Error while trying to connect", err.message);
  });

// fallback route for handling unknown routes

app.get("/all", (req,res) => {
  return res.send('Hello World');
})

app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});
