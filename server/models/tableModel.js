const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
  },
  number: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  occupied:{
    type : Boolean ,
    default : false,
    required: true
  },
  occupiedDates:{
    type:[Date],
    default : []
  }
});

module.exports = mongoose.model("table", tableSchema);
