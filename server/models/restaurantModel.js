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
    // required: true,
  },
  contacts: {
    type: [String],
  },
  tags:{
    type: [String],
  }
});

module.exports = mongoose.model("restaurant", restaurantSchema);
