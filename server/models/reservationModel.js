const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "table",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reservation", reservationSchema);
