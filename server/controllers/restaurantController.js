const mongoose = require("mongoose");
const Restaurant = require("../models/restaurantModel");

// add a restaurant

const addRestaurant = (req, res) => {
  const { name, address, image, menu, contacts } = req.body;
  Restaurant.create({
    name,
    address,
    image,
    menu,
    contacts,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};
// find all restaurants
const findAllRestaurants = (req, res) => {
  Restaurant.find()
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch all restaurant" });
    });
};
// find a single restaurant
const findOneRestaurant = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("No record with that id");
  }
  Restaurant.findById(id)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json(`no restaurant found with that ${id}`);
      }
      res.status(200).json(restaurant);
    })
    .catch((err) => {
      res.status(500).json({ error: "failed to fetch the restaurant" });
    });
};
// delete a reestaurant
const deleteRestaurant = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(`No restaurant with given id : ${id}`);
  }

  Restaurant.findByIdAndDelete({ _id: id }) // TODO make sure this work

    .then((result) => {
      if (!result) {
        return res.status(400).json({ error: "No such restaurant" });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "error in deleting the restaurant" });
    });
};
module.exports = {
  addRestaurant,
  findAllRestaurants,
  findOneRestaurant,
  deleteRestaurant
};
