const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// initialisizing the app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express(JSON));
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
