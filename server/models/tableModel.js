const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  restaurant_id: {
    type: mongoose.Types.ObjectId,
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
  occuppied:{
    type : Boolean ,
    default : false,
    required: true
  }
});

module.exports = mongoose.model("table", tableSchema);
