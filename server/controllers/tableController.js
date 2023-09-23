const mongoose = require("mongoose");
const Table = require("../models/tableModel");

// add a table
const addTable = (req, res) => {
  const { restaurant_id, number, capacity } = req.body;
  Table.create({ restaurant_id, number, capacity }).then((result) => {
    res.status(200).json(result);
  });
};

// get all tablesin specific restaurant
const getTablesByRestaurantId = (req, res) => {
  let {id} = req.params;
  let query = { restaurant_id: id };
  Table.find(query).then((tables) => {
    res.status(201).json(tables);
  });
};

module.exports = {
  addTable,
  getTablesByRestaurantId,
};
