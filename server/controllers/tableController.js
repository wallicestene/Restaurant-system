const mongoose = require("mongoose");
const Table = require("../models/tableModel");
const Reservation = require("../models/reservationModel");
// add a table
const addTable = (req, res) => {
  const { restaurantId, number, capacity, occupied } = req.body;
  Table.create({ restaurantId, number, capacity, occupied })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: `Error occurred while adding tables to database ${err}`,
      });
    });
};

// get all tables in specific restaurant
const getTablesByRestaurantId = (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No table was found" });
  }
  Table.find({ restaurantId: id })
    .then((tables) => {
      if (!tables) {
        return res.status(404).json("no tables were found");
      } else {
        res.status(200).json(tables);
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: `Error occurred while retrieving tables from database ${err}`,
      });
    });
};

module.exports = {
  addTable,
  getTablesByRestaurantId,
};
