const express = require("express")
const { addRestaurant, findAllRestaurants, findOneRestaurant, deleteRestaurant, uploadImageByLink, uploadMiddleware, uploadImages, uploadMenuImage, } = require("../controllers/restaurantController")
const router = express.Router()

router.post("/api/restaurant", addRestaurant)
router.get("/api/restaurant", findAllRestaurants)
router.get("/api/restaurant/:id", findOneRestaurant)
router.delete("/api/restaurant/:id", deleteRestaurant)
router.post("/api/upload-images", uploadMiddleware.array("images", 100), uploadImages)
router.post("/api/upload-by-link", uploadImageByLink)
router.post("/api/upload-menu-image", uploadMiddleware.single("itemImage"), uploadMenuImage)
module.exports = router