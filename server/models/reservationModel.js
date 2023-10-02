const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true
    },
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "table",
      required: true
    },
    date:{
      type : Date ,
      default: Date.now(),
      required: true
    }
  },
);

module.exports = mongoose.model("reservation", reservationSchema);
