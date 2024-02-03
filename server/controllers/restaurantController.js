const mongoose = require("mongoose");
const Restaurant = require("../models/restaurantModel");
const multer = require("multer");
const imageDownloader = require("image-downloader");
const { request } = require("express");
const path = require("path");
const fs = require("fs");
const { extname } = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// const path = req
// add a restaurant
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: bucketRegion,
});
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
    const params = {
      Bucket: bucketName,
      Key: filename,
      Body: fs.readFileSync(req.files[i].path),
      ContentType: req.files[i].mimetype,
    };
    const command = new PutObjectCommand(params);
    s3.send(command, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
    uploadedImages.push(
      `https://bookify-app-bucket.s3.amazonaws.com/${filename}`
    );
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
  const filePath = `${__dirname}/uploads/${newName}`;

  imageDownloader
    .image({
      url: link,
      dest: filePath,
    })
    .then(() => {
      // Upload the image to S3
      const fileStream = fs.createReadStream(filePath);
      const params = {
        Bucket: bucketName,
        Key: newName,
        Body: fileStream,
        ContentType: "image/jpeg",
      };
      const command = new PutObjectCommand(params);

      s3.send(command, (err, data) => {
        if (err) {
          console.error("Error uploading image to S3:", err);
          res.status(500).json({ error: "Failed to upload image to S3" });
        } else {
          console.log("Image uploaded successfully.");
          //Deleting the local file after uploading to S3
          fs.unlinkSync(filePath);

          return res.json(
            `https://bookify-app-bucket.s3.amazonaws.com/${newName}`
          );
        }
      });
    })
    .catch((err) => {
      console.error("Error downloading image:", err);
      res.status(500).json({ error: "Failed to download image" });
    });
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
    .sort({
      updatedAt: -1,
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
