const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  menu: {
    type: [
      {
        itemName: {
          type: String,
          required: true,
        },
        itemImage: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  contacts: {
    type: [Number],
  },
});

module.exports = mongoose.model("restaurant", restaurantSchema);
