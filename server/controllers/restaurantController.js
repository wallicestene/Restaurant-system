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
  const {
    owner,
    name,
    address,
    description,
    images,
    whereToSleep,
    guests,
    price,
    amenities,
    tags,
  } = req.body;
  Restaurant.create({
    owner,
    name,
    address,
    description,
    images,
    whereToSleep,
    guests,
    price,
    amenities,
    tags,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};
// get all restaurants by the owner
const getRestaurantByOwner = (req, res) => {
  const { owner } = req.params;
  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(400).json("No user with that Id");
  }
  Restaurant.find({ owner })
    .then((restaurants) => {
      if (!restaurants) {
        return res.status(404).send("no restaurants found");
      }
      res.status(200).json(restaurants);
    })
    .catch((error) => {
      res.status(500).json({ error: "failed to fetch the restaurants" });
    });
};
// custom filename and destination
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
// uploading images
const uploadImages = (req, res) => {
  const uploadedImages = [];
  for (let i = 0; i < req.files.length; i++) {
    const { filename } = req.files[i];
    uploadedImages.push(filename);
  }
  res.json(uploadedImages);
};
// uploading menu item image
const uploadMenuImage = (req, res) => {
  const { filename } = req.file;
  return res.json(filename);
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
    .sort({
      updatedAt: -1,
    })
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((error) => {
      res.status(500).json({ error: `Failed to fetch all restaurant` });
    });
};
// update restaurant details
const updateRestaurant = (req, res) => {
  const {
    name,
    address,
    description,
    images,
    whereToSleep,
    guests,
    price,
    amenities,
    tags,
  } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("No restaurant with that id");
  }
  Restaurant.findByIdAndUpdate(id, {
    name,
    address,
    description,
    images,
    whereToSleep,
    guests,
    price,
    amenities,
    tags,
  })
    .then((restaurant) => {
      if (!restaurant) {
        res.json(`no restaurant found with that ${id}`);
      }
      res.status(200).json(restaurant);
    })
    .catch((err) => {
      res.status(500).json({ error: "failed to fetch the restaurant" });
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
// find/search a restaurant by name or address
const searchRestaurant = (req, res) => {
  const { query } = req.query;
  const searchRegex = new RegExp(query, "i");
  Restaurant.find({
    $or: [
      {
        name: searchRegex,
      },
      {
        address: searchRegex,
      },
    ],
  })
    .then((restaurants) => {
      if (!restaurants) {
        res.status(404).json({ error: "No matching restaurants found!" });
      }
      res.status(200).json(restaurants);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "error in while searching for restaurant" });
    });
};
// delete a restaurant
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
  uploadMenuImage,
  getRestaurantByOwner,
  updateRestaurant,
  searchRestaurant,
};
