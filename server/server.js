const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// initialisizing the app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


app.use((req,res) => {
  res.status(404).json({message: "Route not found!"})
})