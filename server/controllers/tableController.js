const mongoose = require("mongoose");
const Table = require("../models/tableModel");

// add a table
const addTable = (req, res) => {
  const { restaurant_id, number, capacity } = req.body;
  Table.create({ restaurant_id, number, capacity })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: `Error occured while adding tables to database ${err}`,
        });
    });
};

// get all tables in specific restaurant
const getTablesByRestaurantId = (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No table was found" });
  }
  let query = { restaurant_id: id };
  Table.find(query)
    .then((tables) => {
      if (!tables) {
        return res.status(404).json("no tables were found");
      }
      res.status(200).json(tables);
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: `Error occured while retrieving tables from database ${err}`,
        });
    });
};

module.exports = {
  addTable,
  getTablesByRestaurantId,
};
