const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address:{
    type :String ,
    required :true
  },
  image:{
    type: String,
    required: true,
  },
  menu:{
    type:[Object]
  },
  contacts: {
    type: Number
  }
});

module.exports = mongoose.model("restaurant", restaurantSchema)