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
  },
  menu:{
    type:[String]
  },
  contacts: {
    type: Number
  }
});

module.exports = mongoose.model("restaurant", restaurantSchema)