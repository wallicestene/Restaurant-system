const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// require routes
const userRoutes = require("./routes/UserRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const adminRoutes = require("./routes/adminRoute");
const reservationRoutes = require("./routes/reservationRoute");

// initialisizing the app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static("./controllers/uploads"));

// connecting to mongoDB Database
mongoose
  .connect(process.env.MONGO_URI, {
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

// All Routes
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(restaurantRoutes);
// app.use(tableRoutes);
app.use(reservationRoutes);
// fallback route for handling unknown routes

app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});
