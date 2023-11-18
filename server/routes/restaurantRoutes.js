const express = require("express")
const { addRestaurant, findAllRestaurants, findOneRestaurant, deleteRestaurant, uploadImageByLink, } = require("../controllers/restaurantController")
const router = express.Router()

router.post("/api/restaurant", addRestaurant)
router.get("/api/restaurant", findAllRestaurants)
router.get("/api/restaurant/:id", findOneRestaurant)
router.delete("/api/restaurant/:id", deleteRestaurant)
// router.post("/upload", uploadMiddleware.single("restaurantImage"), uploadImages)
router.post("/api/upload-by-link", uploadImageByLink)
module.exports = router