const mongoose = require("mongoose");
const Restaurant = require("../models/restaurantModel");
const multer = require("multer");
const imageDownloader = require("image-downloader");
const { request } = require("express");
const path = require("path");
const { extname } = require("path");
// const path = req
// add a restaurant

const addRestaurant = (req, res) => {
  const { name, address, description, images, menu, contacts, tags } = req.body;
  Restaurant.create({
    name,
    address,
    description,
    images,
    menu,
    contacts,
    tags
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "photo" + Date.now() + path.extname(file.originalname));
  },
});
const uploadMiddleware = multer({
  storage,
});

const uploadImages = (req, res) => {
  const uploadedImages = [];
  for (let i = 0; i < req.files.length; i++) {
    const { filename } = req.files[i];
    uploadedImages.push(filename);
  }
  res.json(uploadedImages);
};
// find all restaurants
const uploadImageByLink = (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  imageDownloader
    .image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    })
    .then((image) => {
      res.json(newName);
    })
    .catch((err) => console.log(err));
};
const findAllRestaurants = (req, res) => {
  Restaurant.find()
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((error) => {
      res.status(500).json({ error: `Failed to fetch all restaurant` });
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
      } else {
        res.status(200).json(restaurant);
      }
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

  Restaurant.findByIdAndDelete(id)

    .then((result) => {
      if (!result) {
        return res.status(400).json({ error: "No such restaurant" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error in deleting the restaurant" });
    });
};
module.exports = {
  addRestaurant,
  findAllRestaurants,
  findOneRestaurant,
  deleteRestaurant,
  uploadImages,
  uploadMiddleware,
  uploadImageByLink,
};
