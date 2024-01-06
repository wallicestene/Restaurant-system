const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description:{
    type :String ,
  },
  images: {
    type: [String],
    required: true,
  },
  whereToSleep: {
    type: [
      {
        bedroom: {
          type: Number,
          required: true,
        },
        sleepingPosition: {
          type: String,
          required: true,
        },
      },
    ],
  },
  price: {
    type: Number,
  },
  amenities:{
    type: [String],
  },
  tags:{
    type: [String],
  }
});

module.exports = mongoose.model("restaurant", restaurantSchema);
